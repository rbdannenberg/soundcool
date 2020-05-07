# OSC Soundcool

## Introduction

Open Sound Control (OSC) is a protocol for networking sound synthesizers, computers, and other multimedia devices for purposes such as musical performance or show control.

## How it flows in our app?

1. Backend opens up a tcp port when requested
2. Port receives a message
3. Backend redirects the message to front-end using Socket.IO(websocket)
4. frontend receives the message and handles the operation

## Where is the code?

1. `src/backend/routes/osc.js:9` - API endpoint - `/openPort`
2. `src/backend/routes/osc.js:26` - Message receiving point

   ```javascript
   var udp_server = dgram.createSocket("udp4", function (msg, rinfo) {
     sendMessage(msg, oscHelper.getName(), portNumber);
   });
   ```

3. `src/backend/routes/osc.js:34` - Message sent to front-end

   ```javascript
   function sendMessage(msg, socket, portNumber) {
   var osc_message;
       .
       .
       .
   }
   ```

4. `src/frontend/src/components/projectEditor/index.js:279` - Message received

   ```javascript
   socket.on("oscData", data => {
    .
    .
    .
   });
   ```

Note: Line number may vary a little due to new commits

## How to use?

1. Enter port number in oscport input
2. Tick the osc checkbox
3. If you have entered a new port number a button `open required ports` will appear. Click on it.
4. Enter the server IP and use the port you just opened.
5. You are good to go.

Note: If you don't know server IP then check the first message which appears when server starts
    
Hint: Starting server, you can visit the server locally at http://localhost:5000 and remotely at http://`192.168.0.105`:5000

### DEMO
[![Watch the video](https://i.ibb.co/JdxWVfY/Screenshot-from-2020-05-07-16-41-58.png)](https://www.loom.com/share/ea8c8cb895264d63a7cf0e812cc49709)