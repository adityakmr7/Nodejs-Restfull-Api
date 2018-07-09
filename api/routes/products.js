const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
//const mongoose = require('mongoose');

const multer = require('multer');
//const upload = multer({dest : 'uploads/'});
const ProductController = require('../controller/product');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null,  new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});



const fileFilter = (req, file, cb) => {
    //reject file
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    }else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter : fileFilter
});

//model
const Product = require('../models/product');

router.get('/', ProductController.product_get_all);


router.post('/', checkAuth, upload.single('productImage'), ProductController.create_product );


router.get('/:productId', ProductController.products_get_product);




router.patch('/:productId', checkAuth, ProductController.products_patch_product);

router.delete('/:productId', checkAuth, ProductController.products_delete_product);


module.exports = router;