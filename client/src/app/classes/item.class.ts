import { v4 as uuid } from 'uuid';

export enum SensorType {
  Force = "force",
  Accel = "accel",
  Gyro  = "gyro"
}

export class Data {
  id: string;
  time: string;
  values: Array<number>;

  constructor( params ) {
    this.id = params.id || null;
    this.time = params.time;
    this.values = params.values;
  }
}

export class Session {
  id: string;
  name: string;
  tags: Array<Tag>;
  data: Array<Data>;

  constructor( params ) {
    this.id = params.id;
    this.name = params.name;
    this.tags = params.tags;
    this.data = params.data;
  }
}

export class Tag {
  id: string;
  name: string;

  constructor( params ) {
    this.id = params.id;
    this.name = params.name;
  }
}