import { ContactUs, Dependency } from '../utils/types';
import conf from '../utils/config';
import { InsertOneWriteOpResult } from 'mongodb';

export const createRequiredCollections = (dependency: Dependency): Promise<void> => {
  return new Promise((resolve, reject) => {
    dependency.mongoClient
      .db(conf.mongodbDBName)
      .listCollections({
        name: conf.contactUsTableName,
      })
      .toArray()
      .then((list) => {
        if (list.length === 0) {
          dependency.mongoClient
            .db(conf.mongodbDBName)
            .createCollection(conf.contactUsTableName)
            .then(() => {
              console.log('Required collections created');
              resolve();
            })
            .catch((e) => {
              reject(e);
            });
        } else {
          resolve();
        }
      });
  });
};

export const insertContactUsEntries = (
  dependency: Dependency,
  contactUs: ContactUs,
): Promise<InsertOneWriteOpResult<any>> => {
  return dependency.mongoClient.db(conf.mongodbDBName).collection(conf.contactUsTableName).insertOne(contactUs);
};

export const getAllContactUsEntries = (dependency: Dependency): Promise<Array<any>> => {
  return dependency.mongoClient.db(conf.mongodbDBName).collection(conf.contactUsTableName).find({}).toArray();
};
