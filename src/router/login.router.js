const express = require("express");
const mysql = require("mysql2");
const loginroute = express.Router();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'travels-web',
    port: 3307,
  });

loginroute.post('/login',(req, res) => {
    const userName = req.body.username;
    const password = req.body.password;
    console.log(userName, password);

    connection.query('SELECT * FROM users WHERE userName = ?', [userName], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }

        if (results.length === 0) {
            return res.status(401).send('Username does not exist');
        }

        const user = results[0];

        if (password === user.password) {

            console.log(user);
            const accessToken = {username : userName , password : password};
            res.json({ accessToken });
        } else {
            return res.status(401).send('Incorrect password');
        }
    });
});


module.exports = loginroute;