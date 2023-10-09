import client from './db.js';
import { sanitize } from './sanitize.js';
import { ObjectId } from 'mongodb';

const getTournaments = async (tournaments, req) => {
  const seasonId =  req.query.season_id;
  const id = req.query.tournament_id;
  const query = (seasonId) ? {'season_id': seasonId} : {};

  if (id) {
    return await tournaments.findOne({
      _id: new ObjectId(id)
    });
  } else {
    return await tournaments.find(query).toArray();
  }
};

const insertTournament = async (tournaments, req) => {
  const count = Number(req.body.count);
  const players = [];
  const prizes = [];
  let rebuys = 0;

  for (let i=0; i<count; i++) {
    console.log(req.body[`players_${i}_name`]);
    const player = {};
    const prize = Number(sanitize(req.body[`players_${i}_prize`]));
    player.name = sanitize(req.body[`players_${i}_name`]).toLowerCase();
    player.rebuys = Number(sanitize(req.body[`players_${i}_rebuys`]));
    player.ranking = i+1;
    players.push(player);

    if (player.rebuys > 0) {
      rebuys += player.rebuys;
    }

    if (prize > 0) {
      prizes.push(prize);
    }
  }

  await tournaments.insertOne({
    season_id: req.body.season_id,
    date: sanitize(req.body.date),
    round: sanitize(req.body.round),
    buyin: sanitize(req.body.buyin),
    rebuys: rebuys,
    prizes: prizes,
    players: players
  });
};

export default async (req, res) => {
  try {
    await client.connect();
    const database = client.db('pokerrangliste');
    const tournaments = database.collection('tournaments');
    const seasons = database.collection('seasons');

    if (req.method === 'GET') {
      const data = {
        seasons: await seasons.find().toArray(),
        tournaments: await getTournaments(tournaments, req)
      };
      res.json(data);
    }

    if (req.method === 'POST') {
      await insertTournament(tournaments, req);
      res.status(200).send({ message: "Tournament inserted" });
    }
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}