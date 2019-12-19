import { teamTreesRPC } from './teamtrees';

import path from 'path';
import { Client } from 'discord-rpc';

require('dotenv').config({ path: path.resolve(process.cwd(), '.env') });

const client = new Client({ transport: 'ipc' });
const clientId = process.env.CLIENTID;

if (!clientId)
  throw new Error('CLIENTID was not detected. Please include it in .env');

async function setRPC() {
  const startTime = Date.now();
  const rpc = await teamTreesRPC();

  client.setActivity(rpc);

  if (process.env.VERBOSE === 'true') {
    console.log(`Updated Discord RPC in ${Date.now() - startTime}ms`);
  }
}

console.log(
  `discord-tt v${require(path.resolve(process.cwd(), 'package.json')).version}`
);

client.on('ready', () => {
  console.log('Connected to Discord.');

  setRPC();
  setInterval(setRPC, 1000 * 10);
});

client.login({ clientId });

process.on('unhandledRejection', r => {
  console.warn(r);
});

process.on('uncaughtException', async e => {
  console.warn(e);
});
