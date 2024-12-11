import { MongoClient, ObjectId } from 'mongodb';
import { database_uri, database_name } from './_config.js';
import { fetchAllPlayers, editPlayerName, addNewPlayer } from './_utils.js';

const client = new MongoClient(database_uri);

export default async (req, res) => {
  try {
    await client.connect();
    const database = client.db(database_name);
    const collection = database.collection('players');

    if (req.method === 'GET') {
      const id = req.query?.id;
      const name = req.query?.name;
      if (id || name) {
        const query = id ? { _id: new ObjectId(id)} : { name: name };
        const doc = await collection.findOne(query);
        if (doc) {
          res.json(doc);
        } else {
          res.status(404).end();
        }
      } else {
        const docs = await fetchAllPlayers(collection);
        res.json(docs);
      }
    }

    if (req.method === 'POST') {
      const name = req.body.name;
      const playerId = req.body.player_id;
      const doc = await collection.findOne({ name: name });

      if (doc) {
        res.status(500).json({error: `Name ${name} is already taken`});
        return;
      }

      if (playerId) {
        await editPlayerName(name, playerId, collection);
      } else {
        await addNewPlayer(name, collection);
      }

      // return all players so state in app can be updated from response
      const players = await fetchAllPlayers(collection);
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
  } finally {
    await client.close();
  }
}
