import { TextractModuleOptions } from './textract-module-options.interface';

export interface TextractOptionsFactory {
  createTextractModuleOptions():
    | Promise<TextractModuleOptions>
    | TextractModuleOptions;
}
