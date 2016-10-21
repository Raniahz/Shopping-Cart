exports.validateName = function (name) {
    if (!name) {
        return {
            field: 'nameErr',
            message: 'category must have name'
        }
    }
    return undefined
};

exports.validateSlug = function (slug) {
    if (!slug) {
        return {
            field: 'slugErr',
            message: 'category must have slug name'
        }
    }

};