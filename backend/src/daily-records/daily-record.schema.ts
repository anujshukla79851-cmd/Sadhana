import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class DailyRecord {

  @Prop()
  taskId: string;

  @Prop()
  date: string;

  @Prop()
  actualTime: string;

  @Prop()
  notDone: boolean;

  @Prop()
  marks: number;
}

export const DailyRecordSchema = SchemaFactory.createForClass(DailyRecord);