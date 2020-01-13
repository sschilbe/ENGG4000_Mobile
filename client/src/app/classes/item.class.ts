import { v4 as uuid } from 'uuid';

export enum SensorType {
  Force = "force",
  Accel = "accel",
  Gyro  = "gyro"
}

export class Sensor {
  id : number;
  type : SensorType;
  name : string;
  data : Array<Data>;

  constructor( params ) {
    this.id = params.id;
    this.type = params.type;
    this.name = params.name;
    this.data = params.data || [];
  }
}

export class Data {
    public id: number;
    public timestamp: Date;
    public value: number;
    
    constructor( params ) {
      this.id = params.id || null;
      this.timestamp = params.timestamp;
      this.value = params.value;
    }
}
  