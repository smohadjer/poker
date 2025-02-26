import { MongoClient, ObjectId } from 'mongodb';
import { database_uri, database_name } from './_config.js';
import {
  fetchAllPlayers,
  editPlayerName,
  addNewPlayer,
  userOwnsEvent } from './_utils.js';

const client = new MongoClient(database_uri);

export default async (req, res) => {
  try {
    await client.connect();
    const database = client.db(database_name);
    const collection = database.collection('players');

    if (req.method === 'GET') {
      const event_id = req.query.event_id;
      const id = req.query?.id;
      const name = req.query?.name;
      if (id || name) {
        const query = id ? {
          event_id,
          _id: new ObjectId(id)
        } : {
          event_id,
          name: name
        };
        const doc = await collection.findOne(query);
        if (doc) {
          res.json(doc);
        } else {
          res.status(404).end();
        }
      } else {
        const docs = await fetchAllPlayers(collection, event_id);
        res.json(docs);
      }
    }

    if (req.method === 'POST') {
      const event_id = req.body.event_id;
      const events = database.collection('events');
      if (!await userOwnsEvent(event_id, req.cookies.jwt, events)) {
        throw new Error('Either event ID is not valid or Logged-in user is not owner of the event');
      }

      const name = req.body.name;
      const playerId = req.body.player_id;
      const doc = await collection.findOne({ event_id, name });

      if (doc) {
        throw new Error(`Name ${name} is already taken`);
      }

      if (playerId) {
        await editPlayerName(name, playerId, collection, event_id);
      } else {
        await addNewPlayer(name, collection, event_id);
      }

      // return all players so state in app can be updated from response
      const players = await fetchAllPlayers(collection, event_id);
      res.json({
        data: { players }
      });
    }

    if (req.method === 'DELETE') {
      const name = req.query.name;
      const id = req.query.id

      console.log(name, id);

      const result = await collection.deleteOne( { name: req.query.name });
      console.log(result);
      if (result.deletedCount > 0) {
        res.end();
      } else {
        res.json({'Error': 'Delete failed!'});
      }
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({error: e.message});
  } finally {
    await client.close();
  }
}
