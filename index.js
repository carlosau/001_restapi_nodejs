const express = require('express')
const mongoose = require('mongoose')
const app = express();

mongoose.
connect('mongodb+srv://admin:IJeTXNRnbcOFBvnb@testnodeapi.vrrtugz.mongodb.net/NodeAPI_DB?retryWrites=true&w=majority')
.then(() => {
    console.log('connected to MongoDB')
    app.listen(3000, ()=> {
        console.log('Node API app is running on port 3000')
    })
}).catch((error) => {
    console.log(error)
})
