import Amplify, { API, PubSub, Auth } from 'aws-amplify'
import { AWSIoTProvider } from '@aws-amplify/pubsub';

import awsmobile from './aws-exports';

Amplify.configure(awsmobile);

// Apply plugin with configuration
Amplify.addPluggable(new AWSIoTProvider({
  aws_pubsub_region: 'eu-west-1',
  aws_pubsub_endpoint: 'wss://ayasauzc2y5wm-ats.iot.eu-west-1.amazonaws.com/mqtt',
}));

PubSub.configure()


  export {awsmobile as data, Amplify, API, PubSub, Auth, AWSIoTProvider}