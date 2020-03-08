const express  = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const validator = require("email-validator");

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
})

// Here lies the dummy database 
const database = {
    agents: [
        {
            id: '123',
            name: 'Joshua',
            email: 'jyeoyi@gmail.com',
            password: 'Mahalo',
            entries: 0,
            joined: new Date(),
            expertise: 'hardware',
            available: false
        },
        {
            id: '21',
            name: 'ZhaoYi', 
            email: 'tesh@yahoo.com.sg',
            password: 'barmitzvah',
            entries: 21,
            joined: new Date(),
            expertise: 'software',
            available: true
        },
        {
            id: '456',
            name: 'Sandeep', 
            email: 'donaldTrump@potus.com',
            password: 'trump',
            entries: 668,
            joined: new Date(),
            expertise: 'others',
            available: true
        }
    ],
    // Possible future feature: Storage of customer details and history?
    login: [
        {
            id: '987',
            hash: '',
            email: 'mwod@gmail.com'
        }
    ]
}

const validTopics = new Set(['software','hardware','others']);

// The most important endpoint for this demo, the form endpoint, which includes the routing functionality
app.post('/form',(req,res)=>{
    let msg = '';
    let stop = NaN;
    const {email,name,topic,urgency} = req.body; //Destructuring
    // Firstly, we identify if the user is valid, by validating his email
    if(!validator.validate(email)){
        // If the user has an invalid email, we also check if his topic was invalid
        if(!validTopics.has(topic)){
            res.status(400).json("Please re-check your email and query-topic, they are missing/ invalid") // Send appropriate response
        } else{
            // Prompt user to re-check his email ONLY if it's the only invalid field
            res.status(400).json("Please re-check your input email, it is invalid")
        }
    }

    if(!validTopics.has(topic)){
        msg = "Please re-check your form, your query-topic is missing/ invalid";
        res.status(400).json(msg) // If user has valid email but invalid topic, we prompt him to re-check the topic
    }
    database.agents.forEach((agent)=>{
        if(agent.expertise==topic){
            if(agent.available===true){
                console.log(agent.name);
                msg = "We are connecting you with this agent: "+agent.name.toString();
                res.json(msg); // We immediately route user to the available agent, terminating the loop once we find a matching agent
                stop = true;
            } else if (stop!==true){
                msg = "We are sorry, but no suitable agents are available right now, please come back later"; // We have this msg until loop ends or we find our agent!
            }
        }
        
    })
    res.json(msg);// We send the rejection message (no agents found) if we find no available agents at the end of the loop   
})

// Some side notes: Currently, the DB is being implemented in postgres, which will allow for O(1) lookup time for customers, although DB may be shifted again to MongoDB if relations don't play a big part of our system