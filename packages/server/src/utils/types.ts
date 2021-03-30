import { MongoClient } from 'mongodb';

export type Dependency = {
  mongoClient: MongoClient;
};

export type ContactUs = {
  name: string;
  email: string;
  message: string;
  time: number;
};

export enum ResponseType {
  success = 'success',
  error = 'error',
}

export type ApiResponse = {
  status: ResponseType;
  data: Record<string, any>;
};

export enum ValidatorResponseType {
  valid = 'valid',
  invalid = 'invalid',
}

export type ValidatorResponse<T> = {
  type: ValidatorResponseType;
  value: T;
  errorMsg: string;
};
