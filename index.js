const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const app = express();

//middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//fetch all data from Mongo DB
app.get('/products', async(req, res)=>{
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//fetch data by ID
app.get('/products/:id', async(req, res)=>{
    try {
        const {id} = req.params
        const product = await Product.findById(id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//create data on Mongo DB
app.post('/products', async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

//update data on Mongo DB
app.put('/products/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body)
        if(!product) {
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        } else {
            const updatedProduct = await Product.findById(id)
            res.status(200).json(updatedProduct)
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//remove data on Mongo DB
app.delete('/products/:id', async (req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndDelete(id)
        if(!product) {
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        } else {
            res.status(200).json(product)
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

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
