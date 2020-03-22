// Define your configuration
let options = {
    rainbow: {
        host: "sandbox"
    },
    credentials: {
        login: "bot@mycompany.com", // To replace by your developer credendials
        password: "thePassword!123" // To replace by your developer credentials
    },
    // Application identifier
    application: {
        appID: "",
        appSecret: ""
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

const RainbowSDK = require('rainbow-node-sdk');

const myRainbow = new RainbowSDK(options); // Create new instance of rainbow SDK
myRainbow.start(); // start this new instance

myRainbow.events.on('rainbow_onready', function() {
    // do something when the SDK is connected to Rainbow
    console.log("SDK connected to rainbow!");
});
