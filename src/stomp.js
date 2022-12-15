// const stomp = require('@stomp/stompjs');
// const sendToDevice = require('./pushNotiFunction');
import stomp from '@stomp/stompjs';
import { admin } from './helper.js';
import {
  sendToDevice,
  subscribeTopic,
  unsubscribeTopic,
  unsubscribeTopicWithToken,
  getId
} from './pushNotiFunction.js';

const userId = '62c55d9e7157a97befeb2b9e';
const token =
  'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwaGlsayIsImF1dGhvcml0aWVzIjpbImdhTGpGeiJdLCJzZXNzaW9uSWQiOiI3ZGVhMTFmYS0xNGY3LTQ0OGQtOTRhNC04YWU0MmQ2NjIzZDkiLCJpYXQiOjE2NzEwODI1MTEsImV4cCI6MTY3MTE2ODkxMX0.OomysJFelPf0kLFSqGZoYBoX9rmWHa3lqHjWrx7Jn6EohJYDX01--FGBH0ED4jdoQLvF0FUWglo-AFa1r-51vA';
const REACT_APP_WEBSOCKET_SSL = 'wss://backend.stg.oncx.vn/websocket-chat';

class SetupSocket {
  StompClient = null;
  isConnected = false;
  constructor() {
    const newClient = new stomp.Client();
    this.StompClient = newClient;
  }

  #handleParseJson(handle) {
    return message => {
      if (message && message.body) {
        const msg = JSON.parse(message.body);
        handle(msg);
      }
    };
  }

  onDisconnect() {
    if (this.StompClient) {
      this.StompClient.deactivate();
      this.isConnected = false;
      unsubscribeTopic();
    }
  }

  onConnect() {
    try {
      if (this.StompClient) {
        this.StompClient.configure({
          debug: () => {},
          connectHeaders: {
            Authorization: token,
          },
          reconnectDelay: 2000,
          heartbeatIncoming: 10000,
          heartbeatOutgoing: 10000,
          brokerURL: REACT_APP_WEBSOCKET_SSL,
          beforeConnect: () => {
            this.isConnected = true;
          },
          onConnect: () => {
            console.log('connected socket');
            subscribeTopic();
            if (this.StompClient.connected) {
              this.StompClient.subscribe(`/topic/event-room`, async message => {
                subscribeTopic();
                if (message?.body) {
                  const body = JSON.parse(message.body);
                  const { room } = body;
                  const ids = await getId();
                  if (ids?.includes(room?.lastMessage?.senderId)) {
                    admin
                    .firestore()
                    .collection('tokenNotification')
                    .where('id', '==', room?.lastMessage?.senderId)
                    .get()
                    .then(async res => {
                      // res.docs.map(x => {
                      //   unsubscribeTopicWithToken([`${x.data().token}`])
                      // });
                      await unsubscribeTopicWithToken(res.docs.map(x => x.data().token))
                    })
                  }
                  await sendToDevice(
                    `${room?.lastMessage?.senderName} gửi tới ${room?.roomName}`,
                    `${room?.lastMessage?.text}`,
                    room || {},
                  );
                }
              });
            }
          },
          onStompError: frame => {
            console.log('Broker reported error: ' + frame.headers['message']);
            console.log('Additional details: ' + frame.body);
            unsubscribeTopic();
          },
        });
        this.StompClient.activate();
      }
    } catch (err) {
      console.error(err);
    }
  }
}

const NewSetupSocket = new SetupSocket();

export default NewSetupSocket;
