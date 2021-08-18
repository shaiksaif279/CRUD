const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./models/product');
const { error } = require('console');
const methodOverride = require('method-override');
const { ALL } = require('dns');
mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MOnGO connected")
    })
    .catch((e) => {
        console.log(e)
    })


const categories = ['fruits', 'vegetables', 'leafs', 'dairy', 'dryfruits']
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.get('/cars', (req, res) => {
    res.send("MG this the products in the cars which is one of the favourite!!")
})

app.get('/products', async (req, res) => {
    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category });
        res.render('product/backtoproducts', { products,category });
    } else {
        const products = await Product.find({})



        res.render('product/index', { products ,category:'All'});

    }

})
app.get('/products/new', (req, res) => {
    res.render('product/new', { categories })
})
app.post('/products', async (req, res) => {
    const newproduct = new Product(req.body);
    await newproduct.save();
    console.log(newproduct)
    res.redirect('/products')
})
app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    res.render('product/show', { product, categories })
})
app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    res.render('product/edit', { product })
})
app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });


    res.redirect('/products', { pro });

})
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const deleteproduct = await Product.findByIdAndDelete(id);
    res.redirect('/products')
})


app.set('views', path.join(__dirname, 'views')); 27
app.set('view engine', 'ejs');



app.listen(3000, () => {
    console.log("port 3000 iam listening")
})