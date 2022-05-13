const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    isGold: Boolean,
    phone: {
        type: String,
        required: true,
    },
})

const Customer = mongoose.model('Customer', customerSchema)

function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        isGold: Joi.boolean(),
        phone: Joi.string().min(3).required(),
    })

    return schema.validate(customer)
}

module.exports.Customer = Customer
module.exports.validate = validateCustomer
