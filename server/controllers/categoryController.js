const Category = require('../include/models').categoryModel;
const jsonResponse = require('../include/json_response');

let getCategories = () => new Promise((resolve, reject) => {
    Category.find({}).populate('user','name email').sort({description :1}).exec((err, categories) => {
        if (err) {
            reject(jsonResponse.error(500, err));
        }
        resolve(jsonResponse.ok(200, {
            categories
        }));
    });
});

let getCategory = (id) => new Promise((resolve, reject) => {
    Category.findById(id, (err, category) => {
        if (err) {
            reject(jsonResponse.error(500, err));
        }
        if (!category) {
            reject(jsonResponse.error(400, {
                message: "Category not found"
            }))
        }
        resolve(jsonResponse.ok(200, {
            category
        }));
    });
});

let saveCategory = (category) => new Promise((resolve, reject) => {
    category.save((err, category) => {
        if (err) {
            reject(jsonResponse.error(500, err));
        }
        if (!category) {
            reject(jsonResponse.error(400, {
                message: 'Category has failed on save'
            }))
        }
        resolve(jsonResponse.ok(201, {
            category
        }));
    });
});

let updateCategory = (id, category) => new Promise((resolve, reject) => {
    Category.findByIdAndUpdate(id, category, {
        new: true,runValidators:true
    }, (err, category) => {
        if (err) {
            reject(jsonResponse.error(500, err));
        }
        if (!category) {
            reject(jsonResponse.error(400, {
                message: 'Update has failed!'
            }));
        }
        resolve(jsonResponse.ok(200, {
            category
        }));
    });
});

let deleteCategory = (id) => new Promise((resolve, reject) => {
    Category.findByIdAndRemove(id, (err, category) => {
        if (err) {
            reject(jsonResponse.error(500, err));
        }
        if (!category) {
            reject(jsonResponse.error(404, {
                message: "Category not found"
            }));
        }
        resolve(jsonResponse.ok(200, {
            category
        }));
    });
});


module.exports = {
    getCategories,
    getCategory,
    saveCategory,
    updateCategory,
    deleteCategory
}