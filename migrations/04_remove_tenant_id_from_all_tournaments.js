/*
Run this script in terminal from root of porject using command `node migrations/[script.js]`. Rename `api/_config.ts` to `api/_config.js` before running script and undo afterwards.
*/

import { MongoClient } from 'mongodb';
import { database_uri, database_name } from '../api/_config.js';
const client = new MongoClient(database_uri);

async function run() {
  try {
    await client.connect();
    const database = client.db(database_name);
    const collection = database.collection('tournaments');
    const result = await collection.updateMany({}, {
      $unset: {
        'tenant_id': 1
      }
    });
    console.log(`Updated ${result.modifiedCount} documents`);
  } finally {
    // Close the connection after the operation completes
    await client.close();
  }
}

// Run the program and print any thrown exceptions
run().catch(console.dir);
