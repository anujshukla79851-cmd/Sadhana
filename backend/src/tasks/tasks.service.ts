import { Injectable } from "@nestjs/common";
import { CreateTaskDto } from "./create-task.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Task } from "./task.schema";
import { UpdateTaskDto } from "./update-task.dto";

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name)
    private taskModel: Model<Task>,
  ) { }

  createTask(taskData: CreateTaskDto) {
    return this.taskModel.create(taskData);
  }
  getTasks() {
    return this.taskModel.find();
  }
  getTaskById(id: string) {
    return this.taskModel.findById(id);
  }

  updateTask(id: string, taskData: UpdateTaskDto) {
    return this.taskModel.findByIdAndUpdate(id, taskData, { new: true });
  }

  deleteTask(id: string) {
  return this.taskModel.findByIdAndDelete(id);
}
}