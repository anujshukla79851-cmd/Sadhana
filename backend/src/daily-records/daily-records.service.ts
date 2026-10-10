import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { DailyRecord } from "./daily-record.schema";
import { CreateDailyRecordDto } from "./create-daily-record.dto";
import { Task } from "../tasks/task.schema";

@Injectable()
export class DailyRecordsService {

  constructor(
    @InjectModel(DailyRecord.name)
    private dailyRecordModel: Model<DailyRecord>,

    @InjectModel(Task.name)
    private taskModel: Model<Task>,
  ) {}

  async createDailyRecord(recordData: CreateDailyRecordDto) {

    // Task ko database se find kar rahe hain
    const task = await this.taskModel.findById(recordData.taskId);

    console.log("Task found:", task);

    // Agar task nahi mila
    if (!task) {
      throw new Error("Task not found");
    }

    let marks: number;

    // Agar task Not Done hai
    if (recordData.notDone) {
      marks = task.notDoneMarks;
    }

    // Agar task complete kiya gaya hai
    else {

      // Desired time ko hours aur minutes me convert kar rahe hain
      const [desiredHour, desiredMinute] =
        task.desiredTime.split(":").map(Number);

      // Actual time ko hours aur minutes me convert kar rahe hain
      const [actualHour, actualMinute] =
        recordData.actualTime.split(":").map(Number);

      // Dono times ko total minutes me convert kar rahe hain
      const desiredTotalMinutes =
        desiredHour * 60 + desiredMinute;

      const actualTotalMinutes =
        actualHour * 60 + actualMinute;

      // Actual time desired time se pehle ya equal hai
      if (actualTotalMinutes <= desiredTotalMinutes) {
        marks = task.onTimeMarks;
      }

      // Actual time desired time ke baad hai
      else {
        marks = task.lateMarks;
      }
    }

    // Daily record me calculated marks add kar rahe hain
    const dailyRecord = {
      ...recordData,
      marks: marks,
    };

    // Database me save kar rahe hain
    return this.dailyRecordModel.create(dailyRecord);
  }

  getDailyRecords() {
    return this.dailyRecordModel.find();
  }
}