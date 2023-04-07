import { TextractClient, TextractClientConfig } from '@aws-sdk/client-textract';
import {
  TEXTRACTMODULE_CONNECTION,
  TEXTRACTMODULE_CONNECTION_TOKEN,
  TEXTRACTMODULE_OPTIONS_TOKEN
} from './textract.constants';

export function createTextractConnection(
  config: TextractClientConfig
): TextractClient {
  return new TextractClient(config);
}

export function getTextractConnectionToken(connection?: string): string {
  return `${
    connection || TEXTRACTMODULE_CONNECTION
  }_${TEXTRACTMODULE_CONNECTION_TOKEN}`;
}

export function getTextractOptionsToken(connection?: string): string {
  return `${
    connection || TEXTRACTMODULE_CONNECTION
  }_${TEXTRACTMODULE_OPTIONS_TOKEN}`;
}
