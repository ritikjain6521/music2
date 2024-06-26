const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
        host: 'dpg-comiofsf7o1s73f58400-a',
        user: 'postgresql_ritik_user',
        password: 'TGabXCb5wqNuneTDqtk8WKJ37XVcI00A',
        database: 'postgresql_ritik'
    }
})

const app = express();

let intialPath = path.join(__dirname, "public");

app.use(bodyParser.json());
app.use(express.static(intialPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(intialPath, "index.html"));
})

app.get('/Login', (req, res) => {
    res.sendFile(path.join(intialPath, "Login.html"));
})

app.get('/register', (req, res) => {
    res.sendFile(path.join(intialPath, "register.html"));
})

app.get('/:folder(*)', async (req, res) => {
    const { folder } = req.params;
    

    const folderPath = path.join(initialPath, folder);
    try {
        // Check if the requested folder exists
        const folderStats = await fs.stat(folderPath);
        if (!folderStats.isDirectory()) {
            return res.status(404).json({ error: 'Not a directory' });

        

            let response = await a.text();

        }

        // Read files from the directory and send them as a response
        const files = await fs.readdir(folderPath);
        res.send(files);
        

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



app.post('/register-user', (req, res) => {
    const { name, email, password } = req.body;

    if(!name.length || !email.length || !password.length){
        res.json('fill all the fields');
    } else{
        db("users").insert({
            name: name,
            email: email,
            password: password
        })
        .returning(["name", "email"])
        .then(data => {
            res.json(data[0])
        })
        .catch(err => {
            if(err.detail.includes('already exists')){
                res.json('email already exists');
            }
        })
    }
})

app.post('/login-user', (req, res) => {
    const { email, password } = req.body;

    db.select('name', 'email')
    .from('users')
    .where({
        email: email,
        password: password
    })
    .then(data => {
        if(data.length){
            res.json(data[0]);
        } else{
            res.json('email or password is incorrect');
        }
    })
})

app.listen(3000, (req, res) => {
    console.log('listening on port 3000......')
})
