 import { Controller, Post, Get, Body, Param,Patch , Delete} from "@nestjs/common";
import { CreateTaskDto } from "./create-task.dto";
import { TasksService } from "./tasks.service";
import { UpdateTaskDto } from "./update-task.dto";

@Controller('tasks')
export class TaskController {

    constructor(private readonly tasksService: TasksService) { }

    @Post()
    createTask(@Body() taskData: CreateTaskDto) {
        return this.tasksService.createTask(taskData);
    }

    @Get()
    getTasks() {
        return this.tasksService.getTasks();
    }

    @Get(':id')
    getTaskById(@Param('id') id: string) {
        return this.tasksService.getTaskById(id);
    }
@Patch(':id')
updateTask(@Param('id') id: string, @Body() taskData: UpdateTaskDto) {
  return this.tasksService.updateTask(id, taskData);
}
@Delete(':id')
deleteTask(@Param('id') id: string) {
  return this.tasksService.deleteTask(id);
}
}