import { Request, Response } from 'express';
import { Parser } from 'json2csv';
import { getAllContactUsEntries } from '../db/operations';
import { generateDateStr } from '../utils/date';
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
    list.forEach((item) => {
      item.date = generateDateStr(item.time);
    });
    const json2csv = new Parser({
      fields: [
        {
          label: 'Name',
          value: 'name',
        },
        {
          label: 'Email',
          value: 'email',
        },
        {
          label: 'Message',
          value: 'message',
        },
        {
          label: 'Date Time',
          value: 'date',
        },
      ],
    });
    const csv = json2csv.parse(list);
    res.header('Content-Type', 'text/csv');
    res.attachment('contactus.csv');
    res.send(csv);
    return;
  } catch (e) {
    logError(e);
  }
  res.send(JSON.stringify(resp));
};
