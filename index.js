const express = require('express');
const app = express();


const db = require('./db');

//any changes to a db (UPDATE, )

app.post('/petition', (req, res) => {
    console.log('GET /petition!!');
    db.addCity('Berlin', 'DE', 'doener!')
        .then(()=> {

            console.log('SUCCESS!!!');
            //send response to front
            //res.render or send a template
            //back as a response

        })
        .catch(err => {
            console.log('err in addCity:', err);
        })
    // how to we query a database from our express server?
});

app.listen(8080, () => console.log('Petition is listening! '));
