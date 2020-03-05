const express  = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

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
            expertise: 'hardware'
        },
        {
            id: '21',
            name: 'ZhaoYi', 
            email: 'tesh@yahoo.com.sg',
            password: 'barmitzvah',
            entries: 21,
            joined: new Date(),
            expertise: 'software'
        },
        {
            id: '456',
            name: 'Sandeep', 
            email: 'donaldTrump@potus.com',
            password: 'trump',
            entries: 668,
            joined: new Date(),
            expertise: 'others'
        }
    ],
    login: [
        {
            id: '987',
            hash: '',
            email: 'mwod@gmail.com'
        }
    ]
}

// The most important endpoint for this demo, the form endpoint, which includes the routing functionality
app.post('/form',(req,res)=>{
    const {email,name,topic,urgency} = req.body; //Destructuring
    database.agents.forEach((agent)=>{
        if(agent.expertise==topic){
            console.log(name,topic);
            res.json("We are connecting you with this agent: "+agent.name.toString())
        }
        else{
            res.status(400).json("Sorry, no suitable agent is available as of now, please come back later")
        }
    })    
})
