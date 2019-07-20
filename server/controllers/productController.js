const Product = require('../include/models').productModel;
const jsonResponse = require('../include/json_response');
const log = require('../include/log').initLogger(__filename);

let findProducts = (limit, from) => new Promise((resolve, reject) => {
    Product.find({available:true})
        .limit(limit)
        .skip(from)
        .populate('category', 'description')
        .populate('user', 'name email')
        .exec((err, products) => {
            if (err) {
                log.error(err.message, err)
                reject(jsonResponse.error(500, err));
            }
            if (!products) {
                log.warn('Product failed on save');
                reject(jsonResponse.error(400, {
                    message: 'Product failed on save'
                }));
            } else {
                Product.countDocuments({available:true}, (err, count) => {
                    if (err) {
                        log.error(err.message, err)
                        reject(jsonResponse.error(500, err));
                    }
                    if (!products || products.length === 0) {
                        reject(jsonResponse.error(400, {
                            message: `Products not found at page ${Math.ceil((from+1)/limit)}`,
                            pageInfo: paginator(from, limit, count)
                        }));
                    }
                    resolve(jsonResponse.ok(200, {
                        products,
                        pageInfo: paginator(from, limit, count)
                    }))
                });
            }

        });
});

let paginator = (from, limit, count) => new Object({
    page: Math.ceil((from + 1) / limit),
    pages: Math.ceil(count / limit),
    items: {
        this_page: {
            first: from + 1,
            last: from + limit
        },
        total: count
    }
});

let findProduct = (id) => new Promise((resolve, reject) => {
    Product.findById(id).findOne({available:true})
        .populate('user', 'name email')
        .populate('category', 'description')
        .exec((err, product) => {
            log.info(product)
            if (err) {
                log.error(err.message, err);
                reject(jsonResponse.error(500, err));
            }
            if (!product) {
                reject(jsonResponse.error(400, {
                    message: 'Product not found.'
                }));
            }
            resolve(jsonResponse.ok(200, {product}));
        });
});

let findProductByQuery = (args) => new Promise((resolve,reject)=>{
    log.debug('args',args)
    Product.find(args)
    .populate('user', 'name email')
    .populate('category', 'description')
    .exec((err, product) => {
        log.debug(product)
        if (err) {
            log.error(err.message, err);
            reject(jsonResponse.error(500, err));
        }
        if (!product) {
            reject(jsonResponse.error(400, {
                message: 'Product not found.'
            }));
        }
        resolve(jsonResponse.ok(200, {product}));
    });
})

let saveProduct = (product) => new Promise((resolve, reject) => {
    product.save((err, productDB) => {
        if (err) {
            log.error(err.message, err);
            reject(jsonResponse.error(500, err));
        }
        if (!productDB) {
            log.warn('Product failed on save');
            reject(jsonResponse.error(400, {
                message: 'Product failed on save'
            }));
        }
        log.debug('Product saved')
        resolve(jsonResponse.ok(200, {
            product: productDB
        }));
    });
});

let updateProduct = (id, product) => new Promise((resolve, reject) => {
    Product.findByIdAndUpdate(id, product, {
        new: true
    }, (err, productDB) => {
        if (err) {
            log.error(err.message, err);
            reject(jsonResponse.error(500, err));
        }
        if (!productDB) {
            reject(jsonResponse.error(400, {
                message: 'Product has failed on update'
            }))
        }
        resolve(jsonResponse.ok(200, {
            product: productDB
        }));
    });
});

let deleteProduct = (id) => new Promise((resolve, reject) => {
    Product.findByIdAndUpdate(id,{available:false},{new:true},(err,product)=>{
        if (err) {
            log.error(err.message, err);
            reject(jsonResponse.error(500, err));
        }
        if (!product) {
            reject(jsonResponse.error(400, {
                message: 'Product has failed on delete'
            }))
        }
        resolve(jsonResponse.ok(200, {
            product
        }));
    });
});

module.exports = {
    findProducts,
    findProduct,
    findProductByQuery,
    saveProduct,
    updateProduct,
    deleteProduct
}