const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors())

const database = {
    users: [
        {
            id :'0',
            name : 'Laura',
            email : 'laura@ferg.com',
            password: 'chester',
            entries : 0,
            joined : new Date()
        }
    ]
}

app.get('/',(req,res)=>{
    res.json(database.users)
});

app.get('/profile/:id',(req,res)=>{
    const {id} = req.params;
   
    const user  = database.users.filter( user => user.id === id);
    
    if(user.length > 0)
    res.json(user)
    else
    res.status(400).json('no user')
})

app.post('/login',(req,res)=>{

  
})

app.put('/image',(req,res)=>{
    const {id} = req.body;
   let found = false;
    const user  = database.users.map( user => {
        console.log(id)
        if(user.id === id){
            user.entries++;
            found = true;
            return res.json(user);
        }
    
    });
    
    if(!found)
    res.status(400).json('no user')
})

app.post('/signin',(req,res)=>{
    const {email , password} = req.body;
    const user = database.users[0];

    if(email === user.email && password === user.password)
    res.json('success');
    else
    res.status(400).json(`error signing in`)
})

app.post('/register',(req,res)=>{
    const {email,name,password} = req.body;

    // bcrypt.hash(password, null, null, function(err, hash) {
    //     // Store hash in your password DB.
    // });

    database.users.push(
        {
            id :100,
            name : name,
            email : email,
            password: password,
            entries : 0,
            joined : new Date()
        }
    )
    res.json(database.users[database.users.length -1])
})

app.listen(3001, ()=>{
    console.log('app is running')
});