// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Company, Device, DeviceType, S3Object } = initSchema(schema);

export {
  Company,
  Device,
  DeviceType,
  S3Object
};