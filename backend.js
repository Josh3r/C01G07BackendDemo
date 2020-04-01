const express  = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const validator = require("email-validator");
// Load the SDK
let RainbowSDK = require("rainbow-node-sdk");
/*-----------------------------------------------------------*/
// Define your configuration
let options = {
    rainbow: {
        host: "sandbox"
    },
    credentials: {
        login: "", // To replace by your developer credendials
        password: "" // To replace by your developer credentials
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
/*------------------------------------------------*/

const app = express(); // We init our express app
// We host our app on port:3000
app.listen(3000,()=>{
    console.log('running!');
})
app.use(cors()); // Using cors
// Parsing json so we can understand json req
app.use(express.json()) // We use app.use() middleware

// Here's our first endpoint, for the index page
app.get('/',(req,res)=>{
    res.json("Up and running")
});
global.retirevedInfo = false;

app.post('/form',(req,res)=>{
    // Deconstruct to retrieve the necessary info
    let {guestFirstName,guestLastname,agentFirstName,agentLastName} = req;
    global.guestFirstName,global.guestLastname,global.agentFirstName,global.agentLastName = guestFirstName,guestLastname,agentFirstName,agentLastName;
    global.retirevedInfo = true;
    res.json("Retrieved required information, thank you!");
});

// Instantiate the SDK
let rainbowSDK = new RainbowSDK(options);
rainbowSDK.stop();
if(retirevedInfo===true){
    // Start the SDK~
    rainbowSDK.start();
}
rainbowSDK.events.on('rainbow_onready', function() {
    // do something when the SDK is connected to Rainbow
    console.log("Connected!","color:red");

    // Creation of bubbles (non-invite method)
    let withHistory = true; // Allow newcomers to have access to the bubble messages since the creation of the bubble
    const testBubble = rainbowSDK.bubbles.createBubble("testBubble", "A little description of my bubble", withHistory).then(function(bubble) {
        // do something with the bubble created
        console.log("Bubble has been created!","color:red");
        // We do something similar for users, except that GUEST accounts are created for them
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
At this time of writing, it's the responsability of your Node.JS application to transmit these information to the requesting app that needs it.

Basically, the scenario is the following:

Your front-end application requests a Guest account to your Node.JS application (This part is outside of the scope of Rainbow)

Your Node.JS application uses the SDK for Node.JS for creating a Guest user account (anonymous or not)

Your Node.JS transmit the credentials to the front-end application (This part is outside of the scope of Rainbow)

The front-end application uses the SDK for Android, IOS or SDK for Web with these credentials and connects to Rainbow
*/

app.get('/mybubble',(req,res)=>{
    res.json(rainbowSDK.bubbles.getAll());
})





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


// Finally, we close it of:
rainbowSDK.stop();