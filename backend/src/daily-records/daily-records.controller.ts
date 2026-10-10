import { Controller, Post, Get, Body } from "@nestjs/common";
import { DailyRecordsService } from "./daily-records.service";
import { CreateDailyRecordDto } from "./create-daily-record.dto";

@Controller("daily-records")
export class DailyRecordsController {

  constructor(
    private readonly dailyRecordsService: DailyRecordsService,
  ) {}

  @Post()
  createDailyRecord(@Body() recordData: CreateDailyRecordDto) {
    return this.dailyRecordsService.createDailyRecord(recordData);
  }

  @Get()
  getDailyRecords() {
    return this.dailyRecordsService.getDailyRecords();
  }
}