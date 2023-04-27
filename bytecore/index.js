import express from 'express';
import uuid from 'uuidv4';
import sha256 from 'crypto-js/sha256.js';
import aes from 'crypto-js/aes.js';
import Base64 from 'crypto-js/enc-base64.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const __dirname = dirname(fileURLToPath(import.meta.url));
const port = 8694;

// Loading the DB.
const defaultData = {
    items: {
        "792c6e88-3748-49cf-a114-3b553d6e7610": {
            itemName: "Test Item",
            quantity: 1,
            location: "Locker",
            status: "Available",
            actions: [
                "e62321ef-ecd7-46af-8c81-184ca87dff0f"
            ]
        }
    },

    users: {
        "testUser": {
            group: "sysadmins",
            lastLogin: "2021-01-01T00:00:00.000Z",
            lastAction: "33570d95-6db8-49ed-86fb-3ae4ed0ee163",
            amountCheckedOut: 0,
            password: "testPassword (This would be hashed)",
            cookie: "testCookie (This would be hashed)",
            UUID: "1cfc6654-b75b-4e18-bc92-a36f9215da2e"
        }
    },

    logs: {
        "33570d95-6db8-49ed-86fb-3ae4ed0ee163": {
            date: "2021-01-01T00:00:00.000Z",
            user: "1cfc6654-b75b-4e18-bc92-a36f9215da2e",
            activity: [
                "Checked back in",
                "792c6e88-3748-49cf-a114-3b553d6e7610",
                "to",
                "Locker"
            ]
        }
    },

    actions: {
        "e62321ef-ecd7-46af-8c81-184ca87dff0f": {
            name: "Charge Device",
            data: "Charge with USB-C",
            createdBy: "1cfc6654-b75b-4e18-bc92-a36f9215da2e",
            createdDate: "2021-01-01T00:00:00.000Z",
            lastModifiedBy: "1cfc6654-b75b-4e18-bc92-a36f9215da2e",
            lastModifiedDate: "2021-01-01T00:00:00.000Z",
            repeatEvery: 0,
            repeatTimes: 0
        }
    },
};
const file = join(__dirname, 'db/db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter, defaultData);
await db.read();


// Express Boilerplate.
const app = express();
app.use(cookieParser());
app.use(express.json());

// Routes.

// This happens when you try to manually go to the home page.
// We don't want this. All traffic should be through the API.
app.get('/', (req, res) => {
  res.status(403).send('FORBIDDEN');
});

app.post('/auth', (req, res) => {
    if(length(req.cookies) == 0){
        res.json({reqlogin: true});
    }
    else{
        for(const user in db.data.users){
            if(user.cookie == req.cookies){
                res.json({reqlogin: false});

                // Update the last login time.
                db.data.users[user].lastLogin = new Date().toISOString();

                // Add to the log.
                const logID = uuid();
                db.data.logs[logID] = {
                    date: new Date().toISOString(),
                    user: db.data.users[user].UUID,
                    activity: [
                        "Logged in",
                        "from",
                        req.ip,
                        "with",
                        req.headers['user-agent']
                    ]
                };

                db.write();

                break;
            }
        }
    }
});

app.listen(port, () => console.log(`Backend listening on port ${port}...`));