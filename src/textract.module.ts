import { DynamicModule, Module } from '@nestjs/common';
import {
  TextractModuleAsyncOptions,
  TextractModuleOptions
} from './interfaces/textract-module-options.interface';
import { TextractCoreModule } from './textract.core-module';

@Module({})
export class TextractModule {
  static forRoot(
    options: TextractModuleOptions,
    connection?: string
  ): DynamicModule {
    return {
      global: true,
      module: TextractModule,
      imports: [TextractCoreModule.forRoot(options, connection)],
      exports: [TextractCoreModule]
    };
  }

  static async forRootAsync(
    options: TextractModuleAsyncOptions,
    connection?: string
  ): Promise<DynamicModule> {
    return {
      global: true,
      module: TextractModule,
      imports: [TextractCoreModule.forRootAsync(options, connection)],
      exports: [TextractCoreModule]
    };
  }
}
