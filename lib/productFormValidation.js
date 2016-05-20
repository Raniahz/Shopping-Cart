exports.validateName = function (name) {
    if (!name) {
        return {
            field: 'nameErr',
            message: 'product must have name'
        }
    }
    return undefined
};

exports.validateCategory = function (category) {
    if (!category) {
        return {
            field: 'categoryErr',
            message: 'product must have category'
        }
    }
};
exports.validateSlug = function (slug) {
    if (!slug) {
        return {
            field: 'slugErr',
            message: 'product must have slug name'
        }
    }
};
exports.validateImage = function (image) {
    if (!image) {
        return {
            field: 'imageErr',
            message: 'product must an image'
        }
    }
};
exports.validateQuantity = function (quantity) {
    if (!quantity) {
        return {
            field: 'quantityErr',
            message: 'product must have a quantity'
        }
    }
    if (isNaN(quantity)) {
        return {
            field: 'quantityErr',
            message: 'quantity must be numeric value'
        }
    }
    console.log('quantity',typeof parseFloat(quantity));
    if (Number.isInteger(parseFloat(quantity)) == false) {
        console.log(Number.isInteger(quantity));
        return {
            field: 'quantityErr',
            message: 'quantity must be integer value'
        }
  }
};
exports.validatePrice = function (price) {
    if (!price) {
        return {
            field: 'priceErr',
            message: 'product must have a price'
        }
    }
    if (isNaN(price)) {
        return {
            field: 'priceErr',
            message: 'price must be a numeric value'
        }
    }
};

