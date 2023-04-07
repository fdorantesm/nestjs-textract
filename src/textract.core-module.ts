import { Global, Module, DynamicModule, Provider } from '@nestjs/common';
import {
  TextractModuleAsyncOptions,
  TextractModuleOptions
} from './interfaces';
import {
  createTextractConnection,
  getTextractConnectionToken,
  getTextractOptionsToken
} from './textract.tokens';
import { TextractOptionsFactory } from './interfaces/textract-module-factory-options';

@Global()
@Module({})
export class TextractCoreModule {
  /* forRoot */
  static forRoot(
    options: TextractModuleOptions,
    connection?: string
  ): DynamicModule {
    const textractOptionsProvider: Provider = {
      provide: getTextractOptionsToken(connection),
      useValue: options
    };

    const textractConnectionProvider: Provider = {
      provide: getTextractConnectionToken(connection),
      useValue: createTextractConnection(options)
    };

    return {
      module: TextractCoreModule,
      providers: [textractOptionsProvider, textractConnectionProvider],
      exports: [textractOptionsProvider, textractConnectionProvider]
    };
  }

  /* forRootAsync */
  public static forRootAsync(
    options: TextractModuleAsyncOptions,
    connection: string
  ): DynamicModule {
    const textractConnectionProvider: Provider = {
      provide: getTextractConnectionToken(connection),
      useFactory(options: TextractModuleOptions) {
        return createTextractConnection(options);
      },
      inject: [getTextractOptionsToken(connection)]
    };

    return {
      module: TextractCoreModule,
      imports: options.imports,
      providers: [
        ...this.createAsyncProviders(options, connection),
        textractConnectionProvider
      ],
      exports: [textractConnectionProvider]
    };
  }

  public static createAsyncProviders(
    options: TextractModuleAsyncOptions,
    connection?: string
  ): Provider[] {
    if (!(options.useExisting || options.useFactory || options.useClass)) {
      throw new Error(
        'Invalid configuration. Must provide useFactory, useClass or useExisting'
      );
    }

    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options, connection)];
    }

    return [
      this.createAsyncOptionsProvider(options, connection),
      { provide: options.useClass, useClass: options.useClass }
    ];
  }

  public static createAsyncOptionsProvider(
    options: TextractModuleAsyncOptions,
    connection?: string
  ): Provider {
    if (!(options.useExisting || options.useFactory || options.useClass)) {
      throw new Error(
        'Invalid configuration. Must provide useFactory, useClass or useExisting'
      );
    }

    if (options.useFactory) {
      return {
        provide: getTextractOptionsToken(connection),
        useFactory: options.useFactory,
        inject: options.inject || []
      };
    }

    return {
      provide: getTextractOptionsToken(connection),
      useFactory: async (
        optionsFactory: TextractOptionsFactory
      ): Promise<TextractModuleOptions> => {
        return await optionsFactory.createTextractModuleOptions();
      },
      inject: [options.useClass || options.useExisting]
    };
  }
}
