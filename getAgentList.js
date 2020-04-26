const express  = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const validator = require("email-validator");

// Load the SDK
let RainbowSDK = require("rainbow-node-sdk");

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

/*-----------------------------------------------------------*/
// Define your configuration
let options = {
    rainbow: {
        host: "sandbox"
    },
    credentials: {
        login: "", // To replace by your developer credendials
        password: "." // To replace by your developer credentials
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

