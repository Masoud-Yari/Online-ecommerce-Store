const express = require('express');
const Product = require('../../models/Product');
const {adminVerify, auth} = require('../../token');

const router = express.Router();

router.get('/', async (req, res) => {
    const data = await Product.find();
    res.send(data);
});

router.post('/', auth, adminVerify, async (req, res) => {
    
    try {
        const newData = new Product({
            name: req.body.name, 
            category: req.body.category, 
            price: req.body.price, 
            image: req.body.image, 
            brand: req.body.brand, 
            rating: req.body.rating, 
            reviews: req.body.reviews,
            numberOfProduct: req.body.numberOfProduct,
            description: req.body.description
        });
    
        const data = await newData.save();
        res.status(201).send(data);

    } catch (error) {
        res.status(401).send(error.message);
    }
});

router.put('/:id', auth, adminVerify, async (req, res) => {
    
    try {
        const product = await Product.findById(req.params.id);
        if(product) {
            product.name = req.body.name; 
            product.category = req.body.category;
            product.price = req.body.price;
            product.image = req.body.image; 
            product.brand = req.body.brand; 
            product.rating = req.body.rating;
            product.reviews = req.body.reviews;
            product.numberOfProduct = req.body.numberOfProduct;
            product.description = req.body.description;

            const data = await product.save();
            res.status(200).send(data);
        }else {
            res.status(401).send({msg: 'Product does not exist.'});    
        }
    
    } catch (error) {
        res.status(401).send(error.message);
    }
});

router.delete('/:id', auth, adminVerify, async (req, res) => {
    const product = await Product.findById(req.params.id);
    if(product) {
        await product.remove();
        res.send({success: 'Product remove successfuly'});
    }else {
        res.status(401).send({msg: 'Error removing data'});
    }
});

router.get('/:id', async (req, res) => {
    const productDetails = await Product.findById(req.params.id);
    res.send(productDetails);
});

module.exports = router;