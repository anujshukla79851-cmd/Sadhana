 import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { DailyRecordsController } from "./daily-records.controller";
import { DailyRecordsService } from "./daily-records.service";
import { DailyRecord, DailyRecordSchema } from "./daily-record.schema";
import { Task, TaskSchema } from "../tasks/task.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: DailyRecord.name,
        schema: DailyRecordSchema,
      },
      {
        name: Task.name,
        schema: TaskSchema,
      },
    ]),
  ],
  controllers: [DailyRecordsController],
  providers: [DailyRecordsService],
})
export class DailyRecordsModule {}