import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Building the DB.
const file = join(__dirname, 'db/db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);
await db.read();

