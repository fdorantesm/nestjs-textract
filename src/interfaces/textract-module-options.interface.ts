import { TextractClientConfig } from '@aws-sdk/client-textract';
import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { TextractOptionsFactory } from './textract-module-factory-options';

export interface TextractModuleOptions extends TextractClientConfig {}

export interface TextractModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<TextractOptionsFactory>;
  useClass?: Type<TextractOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<TextractModuleOptions> | TextractModuleOptions;
  inject?: any[];
}
