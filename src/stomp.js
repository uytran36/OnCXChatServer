const stomp = require('@stomp/stompjs');

const token =
  'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1eXRrZyIsImF1dGhvcml0aWVzIjpbImdhTGpGeiJdLCJzZXNzaW9uSWQiOiIzMTRhMTdlYi01NTVmLTQ3YWQtYmI3MS00MmU3NjI3YmZhMWIiLCJpYXQiOjE2NzA5MDMxNzEsImV4cCI6MTY3MDk4OTU3MX0.z8NkY6sPgXFNQ9CPZwqTjxwk5QGZpAimpuvysbiENNeSEOEVxgUfRO1emwe5euBHioBiL1cvnflb1foCW_ty9A';
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
            if (this.StompClient.connected) {
              this.StompClient.subscribe(`/topic/event-room`, message => {
                if (message?.body) {
                  const body = JSON.parse(message.body);
                  console.log(body);
                }
              });
            }
          },
          onStompError: frame => {
            console.log('Broker reported error: ' + frame.headers['message']);
            console.log('Additional details: ' + frame.body);
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

module.exports = NewSetupSocket;
