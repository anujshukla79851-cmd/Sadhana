 import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Task {

  @Prop()
  taskName: string;

  @Prop()
  desiredTime: string;

  @Prop()
  duration: number;

  @Prop()
  onTimeMarks: number;

  @Prop()
  lateMarks: number;

  @Prop()
  notDoneMarks: number;
}

export const TaskSchema = SchemaFactory.createForClass(Task);