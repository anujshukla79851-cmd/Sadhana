 import { Module } from "@nestjs/common";

import { ConfigModule } from "@nestjs/config";

import { MongooseModule } from "@nestjs/mongoose";

import { AppController } from "./app.controller";

import { AppService } from "./app.service";

import { TasksModule } from "./tasks/tasks.module";

import { DailyRecordsModule } from "./daily-records/daily-records.module";

@Module({

  imports: [
    ConfigModule.forRoot(),

    MongooseModule.forRoot(process.env.MONGODB_URI!),

    TasksModule,

    DailyRecordsModule,
  ],

  controllers: [AppController],

  providers: [AppService],

})

export class AppModule {}