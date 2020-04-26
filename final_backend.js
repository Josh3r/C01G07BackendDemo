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
/*------------------------------------------------*/

const app = express(); // We init our express app
// We host our app on port:3000
app.listen(3001,()=>{
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



// Instantiate the SDK
let rainbowSDK = new RainbowSDK(options);
rainbowSDK.stop();
    // Start the SDK~
    rainbowSDK.start();

class Agent {
    constructor(id, name, skills, product, availability, queue) {
        // details from contacts
        this.id = id, //agentIDs
        this.name = name, //displayName 
        this.skills = skills, //agentJobTitles
        this.product = product, //agentTitles
        this.availability = availability, //agentAvailability
        this.queue = queue; //agentQueue 
    }
};


//Get all users
rainbowSDK.events.on("rainbow_onready", async () => {
    let agents=await rainbowSDK.admin.getAllUsers("small"); 
    let agentIDs = [] // create list of agentIDs. 
    for (agent of agents) agentIDs.push(agent.id); //adds all the agentIDs into the list
    console.log(agentIDs);
    let agentNames = [] //create list of agentNames 
    for (agent of agents) agentNames.push(agent.displayName); //adds all the names of agents in the list
    console.log("agentNames");

    for (agentID of agentIDs) { 
        let objData = {"nickName":null, "title":null, "jobTitle":null}; //edit existing attributes to be null
        await rainbowSDK.admin.updateInformationForUser(objData,agentID).then((user) => {
            console.log("Done!");
            }).catch((err) => {
            console.log(err);
        });
    }

    agents=await rainbowSDK.admin.getAllUsers("full");
    
    let agentTitles = [] //create list of products
    for (agent of agents) agentTitles.push(agent.title);
    console.log("agentTitles", agentTitles);
    
    let agentJobTitles = [] //create list of expertise/skills
    for (agent of agents) agentJobTitles.push(agent.jobTitle);
    console.log("agentJobTitles", agentJobTitles);
    
    let agentAvailability = [] //create list of Availability
    for (agent of agents) agentAvailability.push(agent.isActive);
    console.log("agentAvability", agentAvailability);
    
    let agentQueue = [] // ccreate list of queue
    for (agent of agents) agentQueue.push(agent.nickName);
    console.log("agentQueue", agentQueue);
    
    let userId1 = "5e9d26399cff6b7279a8daf9";
    objData = {"agentJobTitles" : "replacement of parts", "agentTitles" : "Epad", "isActive" : "true", "nickName" : "['cs1', 'cs2']"};
    await rainbowSDK.admin.updateInformationForUser(objData,agentID).then((user) => {
        console.log("Done!");
        }).catch((err) => {
        console.log(err);
    });

    let userId2 = "5e9d25ba9cff6b7279a8dade";
    objData = {"agentJobTitles" : "hardware", "agentTitles" : "Ephone", "isActive" : "false", "nickName" : "[]"};
    await rainbowSDK.admin.updateInformationForUser(objData,agentID).then((user) => {
        console.log("Done!");
        }).catch((err) => {
        console.log(err);
    });		

    let userId3 = "5e9d264d9cff6b7279a8db0b";
    objData = {"agentJobTitles" : "maintainance of parts", "agentTitles" : "Emac", "isActive" : "true", "nickName" : "[]"};
    await rainbowSDK.admin.updateInformationForUser(objData,agentID).then((user) => {
        console.log("Done!");
        }).catch((err) => {
        console.log(err);
    });		

    var agentList = [];
    for (i = 0; i<agentIDs.length; i++) {
        agentList.push(new Agent(agentIDs[i], agentNames[i], agentJobTitles[i], agentTitles[i], agentAvailability[i], agentQueue[i]));
    }
    console.log(agentList);

})


app.post('/form',(req,res)=>{
    // Deconstruct to retrieve the necessary info
    /*
    let {guestFirstName,guestLastName,agentFirstName,agentLastName} = req.body;
    global.guestFirstName,global.guestLastName,global.agentFirstName,global.agentLastName = guestFirstName,guestLastName,agentFirstName,agentLastName;
    global.retirevedInfo = true;
    //res.json("Retrieved required information, thank you!");
    */
    // Generate user credentials
    let {answers} = req.body;
    let guestFirstName = "First";
    let guestLastName = "Last";
    let agentFirstName = "John";
    let agentLastName = "Smith";


    // Creation of bubbles (non-invite method)
    let withHistory = false; // Allow newcomers to have access to the bubble messages since the creation of the bubble
    console.log("Creating bubble now:");
    const testBubble = rainbowSDK.bubbles.createBubble("thisIsNew", "A little description of my bubble", withHistory).then(function(bubble) {
        // do something with the bubble created
        console.log(bubble);
        console.log("Bubble has been created!","color:red");
        console.log(guestFirstName,guestLastName,agentFirstName,agentLastName);
        //console.log(bubble.name);
        // We do something similar for users, except that GUEST accounts are created for them
        let language = "en-US";
        let ttl = 86400 // active for a day

        let testUser = rainbowSDK.admin.createGuestUser(guestFirstName, guestLastName, language, ttl).then((guest) => {
            // Do something when the guest has been created and added to that company`
            //console.log(rainbowSDK.bubbles.getAllPendingBubbles());
            console.log("User successfully created!","color:red");
            //console.log(guest);
            // Retrieve the required details for the customer to login and talk to the agent
            let returnObj = {
                login_email:guest.loginEmail,
                password:guest.password,
                quizAns: answers
            };
            res.json(returnObj);
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
            //console.log(err);
            console.log("An error occured in user-creation!","color:red");
        });
        /*console.log("Bubble has been created!","color:red");
        -
        -
        */
        // We do something similar for users, except that GUEST accounts are created for them
        let language2 = "en-US";
        let ttl2 = 86400 // active for a day
        /*
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
        */

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