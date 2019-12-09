import { teamTreesRPC } from './teamtrees';

import * as path from 'path';
import * as RPC from 'discord-rpc';

require('dotenv').config({ path: path.resolve(process.cwd(), '.env') });

const client = new RPC.Client({ transport: 'ipc' });
const clientId = process.env.CLIENTID;

if (!clientId)
  throw new Error('CLIENTID was not detected. Please include it in .env');

async function setRPC() {
  const rpc = await teamTreesRPC();

  client.setActivity(rpc);
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
  console.log(r);
});

process.on('uncaughtException', e => {
  console.error(e);
  process.exit(0);
});
