// const admin = require('./helper');
// const firestore = require('@react-native-firebase/firestore');
import { admin } from './helper.js';
// import firestore from '@react-native-firebase/firestore';

const getToken = async () => await admin.firestore().collection('tokenNotification').get().then(data => data.docs.map(x => x._fieldsProto.token.stringValue)).catch(err => console.log(err));

export const getId = async () => await admin.firestore().collection('tokenNotification').get().then(data => data.docs.map(x => x._fieldsProto.id.stringValue)).catch(err => console.log(err));

export const subscribeTopic = async () => {
  const token = await getToken();
  const renewToken = [...new Set(token)];
  if (renewToken) {
    admin
    .messaging()
    .subscribeToTopic(renewToken, 'oncxchat')
    .then((res) => console.log('success subscribing:', res))
    .catch(err => console.log('error subscribing:', err))
  }
  return "";
}

export const unsubscribeTopic = async () => {
  const token = getToken();
  const renewToken = [...new Set(token)];
  if (renewToken) {
    admin
    .messaging()
    .unsubscribeFromTopic(renewToken, 'oncxchat')
    .then((res) => console.log('success unsubscribing:', res))
    .catch(err => console.log('error unsubscribing:', err))
  }
}

export const unsubscribeTopicWithToken = async (token) => {
  if (token) {
    admin
    .messaging()
    .unsubscribeFromTopic(token, 'oncxchat')
    .then((res) => console.log('success unsubscribing with token:', res))
    .catch(err => console.log('error unsubscribing with token:', err))
  }
}

export const sendToDevice = async (title, body, data) => {
  admin
    .messaging()
    .send({
      topic: 'oncxchat',
      notification: {
        title,
        body,
      },
      data: {
        room: JSON.stringify(data),
        // notification: JSON.stringify({ title, body }),
      },
      android: {
        priority: 'high',
        notification: {
          sound: 'default',
        },
      },
      // token: renewToken[0],
    })
    .then(res => console.log(JSON.stringify(res)))
    .catch(err => console.log(JSON.stringify(err)))
  return '';
};
