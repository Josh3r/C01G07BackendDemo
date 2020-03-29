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

/*
// Creation of bubbles (non-invite method)
let withHistory = true; // Allow newcomers to have access to the bubble messages since the creation of the bubble
const testBubble = rainbowSDK.bubbles.createBubble("testBubble", "A little description of my bubble", withHistory).then(function(bubble) {
    // do something with the bubble created
    console.log("Bubble has been created!");
}).catch(function(err) {
    // do something if the creation of the bubble failed (eg. providing the same name as an existing bubble)
    console.log("There was an error in bubble-creation!");
});
*/

/*
At this time of writing, it's the responsability of your Node.JS application to transmit these information to the requesting app that needs it.

Basically, the scenario is the following:

Your front-end application requests a Guest account to your Node.JS application (This part is outside of the scope of Rainbow)

Your Node.JS application uses the SDK for Node.JS for creating a Guest user account (anonymous or not)

Your Node.JS transmit the credentials to the front-end application (This part is outside of the scope of Rainbow)

The front-end application uses the SDK for Android, IOS or SDK for Web with these credentials and connects to Rainbow
*/

// Before we can add agents into a bubble, we first have to create their respective user account
let userEmailAccount = "john.doe@myCompany.com";
let userPassword = "********";
let userFirstname = "John";
let userLastname = "Doe";

let testAgent = rainbowSDK.admin.createUserInCompany(userEmailAccount, userPassword, userFirstname, userLastname).then((user) => {
    // Do something when the user has been created and added to that company
    console.log("Agent successfully created!");
}).catch((err) => {
    // Do something in case of error
    console.log("Error occured in agent-creation!");
});

// We do something similar for users, except that GUEST accounts are created for them
let guestFirstname = "Jean";
let guestLastname = "Dupont";
let language = "en-US";
let ttl = 86400 // active for a day

let testUser = rainbowSDK.admin.createGuestUser(guestFirstname, guestLastname, language, ttl).then((guest) => {
    // Do something when the guest has been created and added to that company
    console.log("User successfully created!");
}).catch((err) => {
    // Do something in case of error
    console.log("An error occured in user-creation!");
});

// Inviting users to bubbles via contact
let invitedAsModerator = false;     // To set to true if you want to invite someone as a moderator
let sendAnInvite = true;            // To set to false if you want to add someone to a bubble without having to invite him first
let inviteReason = "bot-invite";    // Define a reason for the invite (part of the invite received by the recipient)

rainbowSDK.bubbles.inviteContactToBubble(testUser, aBubble, invitedAsModerator, sendAnInvite, inviteReason).then(function(bubbleUpdated) {
    // do something with the invite sent
    
}).catch(function(err) {
    // do something if the invitation failed (eg. bad reference to a buble)
    
});

// Inviting agents to bubbles via contact
let invitedAsModerator = true;     // To set to true if you want to invite someone as a moderator
let sendAnInvite = true;            // To set to false if you want to add someone to a bubble without having to invite him first
let inviteReason = "bot-invite";    // Define a reason for the invite (part of the invite received by the recipient)

rainbowSDK.bubbles.inviteContactToBubble(testAgent, aBubble, invitedAsModerator, sendAnInvite, inviteReason).then(function(bubbleUpdated) {
    // do something with the invite sent
    
}).catch(function(err) {
    // do something if the invitation failed (eg. bad reference to a buble)
    
});


// Creating and inviting users into the bubble
let utc = new Date().toJSON().replace(/-/g, '/');
rainbowSDK.bubbles.createBubble("TestInviteByEmails" + utc, "TestInviteByEmails" + utc).then((bubble) => {
   let contacts = [];
   contacts.push("invited.01@openrainbow.net");
   contacts.push("invited.02@openrainbow.net");
   rainbowSDK.bubbles.inviteContactsByEmailsToBubble(contacts, bubble).then(async(bubble) => {
      console.log("Invited!");
   });
});

// Finally, we close it of:
rainbowSDK.stop();