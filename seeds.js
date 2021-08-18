const mongoose = require('mongoose');
const Product = require('./models/product');
const { error } = require('console');
const { privateDecrypt } = require('crypto');
mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MOnGO connected")
    })
    .catch((e) => {
        console.log(e)
    })


const  seedProducts = [{
    name: 'KYle Mango',
    price: 23,
    category: 'fruit'
},
{
    name: 'banana',
    price: 28,
    category: 'fruit'
},
{
    name: 'brinjal',
    price: 30,
    category: 'vegetable'
},
{
    name: 'spanich',
    price: 23,
    category: 'leafs'
},
]
Product.insertMany(seedProducts)
    .then(res =>{
        console.log(res)
    })
    .catch(e =>{
        console.log(e)
    })


