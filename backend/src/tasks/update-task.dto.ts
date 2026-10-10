export class UpdateTaskDto {
  taskName?: string;
  desiredTime?: string;
  duration?: number;
  onTimeMarks?: number;
  lateMarks?: number;
  notDoneMarks?: number;
}