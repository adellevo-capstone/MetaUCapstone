const express = require('express')
const app = express()
app.use(express.json())

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 

    res.header("Access-Control-Allow-Origin", "http://localhost:3000", "https://api.yelp.com/v3/*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/store', (req, res) => {
    // const products = StoreModel.listAllProducts();
    res.status(200).send({"products": "products"});
})

module.exports = app;
