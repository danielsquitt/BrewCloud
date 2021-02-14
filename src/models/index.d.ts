import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";



export declare class S3Object {
  readonly bucket: string;
  readonly region: string;
  readonly key: string;
  constructor(init: ModelInit<S3Object>);
}

export declare class Company {
  readonly id: string;
  readonly name: string;
  readonly InitImg?: S3Object;
  readonly devices?: (Device | null)[];
  constructor(init: ModelInit<Company>);
  static copyOf(source: Company, mutator: (draft: MutableModel<Company>) => MutableModel<Company> | void): Company;
}

export declare class Device {
  readonly id: string;
  readonly type: string;
  readonly company?: Company;
  readonly alias?: string;
  readonly description?: string;
  readonly connStatus?: boolean;
  constructor(init: ModelInit<Device>);
  static copyOf(source: Device, mutator: (draft: MutableModel<Device>) => MutableModel<Device> | void): Device;
}

export declare class DeviceType {
  readonly id: string;
  readonly name: string;
  constructor(init: ModelInit<DeviceType>);
  static copyOf(source: DeviceType, mutator: (draft: MutableModel<DeviceType>) => MutableModel<DeviceType> | void): DeviceType;
}