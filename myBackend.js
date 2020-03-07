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

const validTopics = set('software','hardware','others');

// The most important endpoint for this demo, the form endpoint, which includes the routing functionality
app.post('/form',(req,res)=>{
    let msg = '';
    const {email,name,topic,urgency} = req.body; //Destructuring
    database.agents.forEach((agent)=>{
        if(agent.expertise==topic){
            console.log(name,topic);
            if(agent.available){
                msg = "We are connecting you with this agent: "+agent.name.toString();
                break;
            } else{
                msg = "We are sorry, but no suitable agents are available right now, please come back later";
            }
        }
        else{
            if(msg!==''){
                continue;
            }
            if(!validTopics.has(topic)){
                msg = "Please re-check your form, there are missing/ invalid details";
            }
        }
        res.json(msg);
    })    
})
