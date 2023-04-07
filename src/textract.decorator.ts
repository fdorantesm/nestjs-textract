import { Inject } from '@nestjs/common';
import { getTextractConnectionToken } from './textract.tokens';

export const InjectTextract = (connection?) => {
  return Inject(getTextractConnectionToken(connection));
};
