import { Request, Response } from 'express';
import { getAllContactUsEntries } from '../db/operations';
import { logError } from '../utils/log';
import { ApiResponse, Dependency, ResponseType } from '../utils/types';

export default async (req: Request, res: Response, dependency: Dependency): Promise<void> => {
  const resp: ApiResponse = {
    status: ResponseType.error,
    data: {
      global: 'Something went wrong',
    },
  };
  try {
    const list = await getAllContactUsEntries(dependency);
    resp.status = ResponseType.success;
    resp.data = {
      list,
    };
  } catch (e) {
    logError(e);
  }
  res.send(JSON.stringify(resp));
};
