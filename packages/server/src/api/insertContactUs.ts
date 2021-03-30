import { Request, Response } from 'express';
import { insertContactUsEntries } from '../db/operations';
import { logError } from '../utils/log';
import { isObject } from '../utils/typeChecker';
import { ApiResponse, ContactUs, Dependency, ResponseType, ValidatorResponseType } from '../utils/types';
import { validateEmail, validateMessage, validateName } from '../utils/validator';

export default async (req: Request, res: Response, dependency: Dependency): Promise<void> => {
  const resp: ApiResponse = {
    status: ResponseType.error,
    data: {
      global: 'Something went wrong',
    },
  };
  if (isObject(req.body)) {
    const contactUs: ContactUs = {
      email: '',
      name: '',
      message: '',
      time: Date.now(),
    };
    let validationError = false;

    const validEmail = validateEmail(req.body.email);
    if (validEmail.type === ValidatorResponseType.invalid) {
      validationError = true;
      resp.data.email = validEmail.errorMsg;
    } else {
      contactUs.email = validEmail.value;
    }

    const validName = validateName(req.body.name);
    if (validName.type === ValidatorResponseType.invalid) {
      validationError = true;
      resp.data.name = validName.errorMsg;
    } else {
      contactUs.name = validName.value;
    }

    const validMessage = validateMessage(req.body.message);
    if (validMessage.type === ValidatorResponseType.invalid) {
      validationError = true;
      resp.data.message = validMessage.errorMsg;
    } else {
      contactUs.message = validMessage.value;
    }

    if (validationError) {
      resp.data.global = 'Validation Error';
    } else {
      try {
        await insertContactUsEntries(dependency, contactUs);
        resp.status = ResponseType.success;
        resp.data = {
          global: 'Success',
        };
      } catch (e) {
        logError(e);
        resp.status = ResponseType.error;
        resp.data = {
          global: 'DB Error',
        };
      }
    }
  }
  res.send(JSON.stringify(resp));
};
