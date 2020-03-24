// Load the SDK
let RainbowSDK = require("rainbow-node-sdk");

// Define your configuration
let options = {
    rainbow: {
        host: "sandbox"
    },
    credentials: {
        login: "teo.josh@yahoo.com.sg", // To replace by your developer credendials
        password: "Halo123117!" // To replace by your developer credentials
    },
    // Application identifier
    application: {
        appID: "e9df78606de011eaa8fbfb2c1e16e226",
        appSecret: "Z0GLZ7tzyK9GZHInr2Po6Hb8xhRXTNIO5Wdqek4WjUYayvNZG3tECbVwIXXFEBAi"
    },
    // Logs options
    logs: {
        enableConsoleLogs: true,
        enableFileLogs: false,
        "color": true,
        "level": 'debug',
        "customLabel": "vincent01",
        "system-dev": {
            "internals": false,
            "http": false,
        }, 
        file: {
            path: "/var/tmp/rainbowsdk/",
            customFileName: "R-SDK-Node-Sample2",
            level: "debug",
            zippedArchive : false/*,
            maxSize : '10m',
            maxFiles : 10 // */
        }
    },
    // IM options
    im: {
        sendReadReceipt: true
    }
};

// Instantiate the SDK
let rainbowSDK = new RainbowSDK(options);

// Start the SDK
rainbowSDK.start();

rainbowSDK.events.on('rainbow_onready', function() {
    // do something when the SDK is connected to Rainbow
    console.log("Connected!");
});

rainbowSDK.events.on('rainbow_onerror', function(err) {
    // do something when something goes wrong
    console.log("An error has ocurred");
});

// This function is for when a ONE TO ONE message is recieved 
rainbowSDK.events.on('rainbow_onmessagereceived', function(message) {
    // test if the message comes from a bubble of from a conversation with one participant
    if(message.type == "groupchat") {
        // Send the answer to the bubble
        messageSent = rainbowSDK.im.sendMessageToBubbleJid('The message answer', message.fromBubbleJid);
    }
    else {
        // send the answer to the user directly otherwise
        messageSent = rainbowSDK.im.sendMessageToJid('The message answer', message.fromJid);
    }
});