import express from 'express';
import cors from 'cors';
import downloadContactUs from './api/downloadContactUs';
import insertContactUs from './api/insertContactUs';
import { getClient } from './db/connection';
import { createRequiredCollections } from './db/operations';
import conf from './utils/config';
import { Dependency } from './utils/types';

const app = express();
app.use(cors());
app.use(express.json());
const port = conf.port || 8888;

if (!conf.mondodbUserName || !conf.mongodbPass) {
  console.error('Env file not set correctly');
  process.exit();
}

getClient()
  .then(async (client) => {
    const dependency: Dependency = {
      mongoClient: client,
    };

    await createRequiredCollections(dependency);

    app.get('/', (_, res) => {
      res.send('Welcome to drivelah API');
    });

    app.post('/contactus', (req, res) => {
      insertContactUs(req, res, dependency);
    });

    app.get('/download-contactus', (req, res) => {
      downloadContactUs(req, res, dependency);
    });

    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
