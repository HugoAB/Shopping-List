const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

// middlewares
app.use(cors());
app.use(express.json());


/** ROUTES */

// add product
app.post('/products', async (req, res) => {
    try {
        const { product, price } = req.body;
        const newProduct = await pool.query("INSERT INTO products (product, price) VALUES ($1, $2)", [product, price]);
        res.json(`New product added: ${product}, price: ${price}`);
    } catch (error) {
        console.log(error);
    }
});

// get all todos
app.get('/products', async (req, res) => {
    try {
        const allProducts = await pool.query("SELECT * FROM products");
        res.json(allProducts.rows);
    } catch (error) {
        console.log(error);
    }
});

// get a product
app.get('/products/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const getProduct = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
        res.json(getProduct.rows);
    } catch (error) {
        console.log(error);
    }
});

// update a product
app.put('/products/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { product, price } = req.body;
        const updateProduct = await pool.query("UPDATE products SET product = $1, price = $2 WHERE id = $3", [product, price, id]);
        res.json("Product updated");
    } catch (error) {
        console.log(error);
    }
});

// delete a product
app.delete('/products/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deleteProduct = await pool.query("DELETE FROM products WHERE id = $1", [id]);
        res.json("Product deleted");
    } catch (error) {
        console.log(error);
    }
});

app.listen(5050, () => {
    console.log("server listening on port 5050");
});