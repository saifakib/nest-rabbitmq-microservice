import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AppConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    }),
    ProductsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}