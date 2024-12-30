const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'ritik',
        database: 'loginformytvideo'
    }
})

const app = express();

let intialPath = path.join(__dirname, "public");
let jainnsongPath = path.join(__dirname, "public", "jainsongs");

app.use(bodyParser.json());
app.use(express.static(intialPath))
app.use(express.static(jainnsongPath))
app.use('/jainsongs', express.static(path.join(__dirname, 'public', 'jainsongs')));

app.get('/', (req, res) => {
    res.sendFile(path.join(intialPath, "index.html"));
})

app.get('/Login', (req, res) => {
    res.sendFile(path.join(intialPath, "Login.html"));
})

app.get('/register', (req, res) => {
    res.sendFile(path.join(intialPath, "register.html"));const express = require('express');
const path = require('path');
const logger = require('morgan');

const bodyParser = require('body-parser');
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'ritik',
        database: 'loginformytvideo'
    }
})

const app = express();

let intialPath = path.join(__dirname, "public");
let jainnsongPath = path.join(__dirname, "public", "jainsongs");

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.static(intialPath))
app.use(express.static(jainnsongPath))
app.use('/jainsongs', express.static(path.join(__dirname, 'public', 'jainsongs')));

app.get('/', (req, res) => {
    console.log('GET /');
    res.sendFile(path.join(intialPath, "index.html"));
})

app.get('/Login', (req, res) => {
    console.log('GET /Login');
    res.sendFile(path.join(intialPath, "Login.html"));
})

app.get('/register', (req, res) => {
    console.log('GET /register');
   const express = require('express');
const path = require('path');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const bodyParser = require('body-parser');
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'ritik',
        database: 'loginformytvideo'
    }
})

const app = express();

let intialPath = path.join(__dirname, "public");
let jainnsongPath = path.join(__dirname, "public", "jainsongs");

app.use(helmet());
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.static(intialPath))
app.use(express.static(jainnsongPath))
app.use('/jainsongs', express.static(path.join(__dirname, 'public', 'jainsongs')));

app.get('/', (req, res) => {
    console.log('GET /');
    res.sendFile(path.join(intialPath, "index.html"));
})

app.get('/Login', (req, res) => {
    console.log('GET /Login');
    res.sendFile(path.join(intialPath, "Login.html"));
})

app.get('/register', (req, res) => {
    console.log('GET /register');
    res.sendFile(path.join(intialPath, "register.html"));
})

app.post('/register-user', (req, res) => {
    const { name, email, password } = req.body;

    if (!name.length || !email.length || !password.length) {
        res.status(400).json({ error: 'Please fill all the fields' });
    } else {
        db("users").insert({
            name: name,
            email: email,
            password: password
        })
            .returning(["name", "email"])
            .then(data => {
                res.status(201).json(data[0])
            })
            .catch(err => {
                if (err.detail.includes('already exists')) {
                    res.status(409).json({ error: 'Email already exists' });
                } else {
                    res.status(500).json({ error: 'Internal Server Error' });
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
            if (data.length) {
                res.json(data[0]);
            } else {
                res.status(401).json({ error: 'Email or password is incorrect' });
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'Internal Server Error' });
        })
})

app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
})

app.use((err, req, res, next
});     })
        .then(data => {
            if (data.length) {
                console.log('User logged in successfully');
                res.json(data[0]);
            } else {
                console.log('Error: Invalid email or password');
                res.json('email or password is incorrect');
            }
        })


    


app.post('/register-user', (req, res) => {
    const { name, email, password } = req.body;

    if (!name.length || !email.length || !password.length) {
        res.json('fill all the fields');
    } else {
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
                if (err.detail.includes('already exists')) {
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
            if (data.length) {
                res.json(data[0]);
            } else {
                res.json('email or password is incorrect');
            }
        })
})

app.listen(3000, (req, res) => {
    console.log('listening on port 3000......')
})
