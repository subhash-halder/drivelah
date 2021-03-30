import { isString } from './typeChecker';
import { ValidatorResponse, ValidatorResponseType } from './types';

export const validateEmail = (email: any): ValidatorResponse<string> => {
  const ret: ValidatorResponse<string> = {
    type: ValidatorResponseType.invalid,
    value: '',
    errorMsg: '',
  };
  if (isString(email) && email.length > 0) {
    if (
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
        email.toLowerCase(),
      )
    ) {
      ret.type = ValidatorResponseType.valid;
      ret.value = email.toLowerCase();
    } else {
      ret.errorMsg = 'Not a valid email';
    }
  } else {
    ret.errorMsg = 'Should be a string';
  }
  return ret;
};

export const validateName = (name: any): ValidatorResponse<string> => {
  const ret: ValidatorResponse<string> = {
    type: ValidatorResponseType.invalid,
    value: '',
    errorMsg: '',
  };
  if (isString(name) && name.length > 0) {
    if (/^[\w\s]{1,200}$/.test(name)) {
      ret.type = ValidatorResponseType.valid;
      ret.value = name;
    } else {
      ret.errorMsg = 'Name should not have special character and less than 200 char';
    }
  } else {
    ret.errorMsg = 'Should be a string';
  }

  return ret;
};

export const validateMessage = (message: any): ValidatorResponse<string> => {
  const ret: ValidatorResponse<string> = {
    type: ValidatorResponseType.invalid,
    value: '',
    errorMsg: '',
  };
  if (isString(message) && message.length > 0) {
    if (message.length < 10000) {
      ret.type = ValidatorResponseType.valid;
      ret.value = message;
    } else {
      ret.errorMsg = 'Message is very long should be less than 10000 char';
    }
  } else {
    ret.errorMsg = 'Should be a string';
  }

  return ret;
};
