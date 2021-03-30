import dotenv from 'dotenv';

dotenv.config();

export default {
  mondodbUserName: process.env.MONGODB_USER_ID,
  mongodbPass: process.env.MONGODB_PASSWORD,
  mongodbURL: process.env.MONGODB_URL,
  mongodbDBName: process.env.MONGODB_DB_NAME,
  contactUsTableName: 'contactus',
  port: process.env.PORT,
};
