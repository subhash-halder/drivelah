import { MongoClient } from 'mongodb';
import conf from '../utils/config';

export const getClient = (): Promise<MongoClient> => {
  const uri = `mongodb+srv://${conf.mondodbUserName}:${conf.mongodbPass}@${conf.mongodbURL}`;
  return new Promise((resolve, reject) => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect((err) => {
      if (err) {
        reject(err);
      } else {
        resolve(client);
      }
    });
  });
};
