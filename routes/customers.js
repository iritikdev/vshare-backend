const express = require('express')
const mongoose = require('mongoose')

const { Customer, validate } = require('../model/customer')
const router = express.Router()

router.get('/', async (req, res) => {
    const customers = await Customer.find()
    res.send(customers)
})

router.post('/', async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const { name, isGold, phone } = req.body
    let customer = new Customer({ name, isGold, phone })
    customer = await customer.save()

    res.send(customer)
})

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const { name, isGold, phone } = req.body

    const customer = await Customer.findByIdAndUpdate(
        req.params.id,
        { name, isGold, phone },
        { new: true }
    )
    res.send(customer)
})

router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndDelete(req.body.id)
    if (!customer)
        return res
            .status(404)
            .send('customer is not found or not exit in db...')
    res.send(customer)
})

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id)
    if (!customer)
        return res
            .status(404)
            .send('The customer with the given ID was not found.')
    res.send(customer)
})

module.exports = router
