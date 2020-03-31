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
rainbowSDK.stop();
// Start the SDK
rainbowSDK.start();
rainbowSDK.events.on('rainbow_onready', function() {
    // do something when the SDK is connected to Rainbow
    console.log("Connected!","color:red");

    // Creation of bubbles (non-invite method)
    let withHistory = true; // Allow newcomers to have access to the bubble messages since the creation of the bubble
    const testBubble = rainbowSDK.bubbles.createBubble("testBubble", "A little description of my bubble", withHistory).then(function(bubble) {
        // do something with the bubble created
        console.log("Bubble has been created!","color:red");
        // We do something similar for users, except that GUEST accounts are created for them
        let guestFirstname = "Jean";
        let guestLastname = "Dupont";
        let language = "en-US";
        let ttl = 86400 // active for a day

        let testUser = rainbowSDK.admin.createGuestUser(guestFirstname, guestLastname, language, ttl).then((guest) => {
            // Do something when the guest has been created and added to that company`
            console.log("User successfully created!","color:red");
            // Inviting users to bubbles via contact
            let invitedAsModerator1 = false;     // To set to true if you want to invite someone as a moderator
            let sendAnInvite1 = true;            // To set to false if you want to add someone to a bubble without having to invite him first
            let inviteReason1 = "bot-invite";    // Define a reason for the invite (part of the invite received by the recipient)

            rainbowSDK.bubbles.inviteContactToBubble(guest, bubble, invitedAsModerator1, sendAnInvite1, inviteReason1).then(function(bubbleUpdated) {
                // do something with the invite sent
                console.log("Invited user","color:red"); 
            }).catch(function(err) {
                // do something if the invitation failed (eg. bad reference to a buble)
                console.log("Error in inviting user","color:red");
            });
        }).catch((err) => {
            // Do something in case of error
            console.log("An error occured in user-creation!","color:red");
        });
        /*console.log("Bubble has been created!","color:red");
        -
        -
        */
        // We do something similar for users, except that GUEST accounts are created for them
        let agentFirstName = "Dupont";
        let agentLastName = "Jean";
        let language2 = "en-US";
        let ttl2 = 86400 // active for a day

        let testAgent2 = rainbowSDK.admin.createGuestUser(agentFirstName, agentLastName, language, ttl).then((guest2) => {
            // Do something when the guest has been created and added to that company`
            console.log("Agent successfully created!","color:red");
            // Inviting users to bubbles via contact
            let invitedAsModerator2 = false;     // To set to true if you want to invite someone as a moderator
            let sendAnInvite2 = true;            // To set to false if you want to add someone to a bubble without having to invite him first
            let inviteReason2 = "bot-invite";    // Define a reason for the invite (part of the invite received by the recipient)

            rainbowSDK.bubbles.inviteContactToBubble(guest2, bubble, invitedAsModerator2, sendAnInvite2, inviteReason2).then(function(bubbleUpdated2) {
                // do something with the invite sent
                console.log("Invited agent","color:red"); 
            }).catch(function(err) {
                // do something if the invitation failed (eg. bad reference to a buble)
                console.log("Error in inviting agent","color:red");
            });
        }).catch((err) => {
            // Do something in case of error
            console.log("An error occured in agent-creation!","color:red");
        });
    }).catch(function(err) {
        // do something if the creation of the bubble failed (eg. providing the same name as an existing bubble)
        console.log("There was an error in bubble-creation!","color:red");
    });

});

/*
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
*/



/*
At this time of writing, it's the responsability of your Node.JS application to transmit these information to the requesting app that needs it.

Basically, the scenario is the following:

Your front-end application requests a Guest account to your Node.JS application (This part is outside of the scope of Rainbow)

Your Node.JS application uses the SDK for Node.JS for creating a Guest user account (anonymous or not)

Your Node.JS transmit the credentials to the front-end application (This part is outside of the scope of Rainbow)

The front-end application uses the SDK for Android, IOS or SDK for Web with these credentials and connects to Rainbow
*/







// Just leave this here for error handling
let invitedAsModerator2 = true;     // To set to true if you want to invite someone as a moderator
let sendAnInvite2 = true;            // To set to false if you want to add someone to a bubble without having to invite him first
let inviteReason2 = "bot-invite";    // Define a reason for the invite (part of the invite received by the recipient)

rainbowSDK.bubbles.inviteContactToBubble(testAgent, aBubble, invitedAsModerator2, sendAnInvite2, inviteReason2).then(function(bubbleUpdated) {
    // do something with the invite sent
    console.log("Invited user","color:red");    
}).catch(function(err) {
    // do something if the invitation failed (eg. bad reference to a buble)
    console.log("Error in inviting user","color:red");
});

/*
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
*/

// Finally, we close it of:
rainbowSDK.stop();