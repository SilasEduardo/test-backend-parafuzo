import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Parking extends Document {
  @Prop({ required: true })
  plate: string;

  @Prop({ default: null })
  entryTime: Date;

  @Prop({ default: null })
  exitTime: Date;

  @Prop({ default: null })
  reservationNumber: string;

  @Prop({ default: false })
  paid: boolean;

  @Prop({ default: false })
  left: boolean;
}

export const ParkingSchema = SchemaFactory.createForClass(Parking);
