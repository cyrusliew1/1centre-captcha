const express = require('express')
require('dotenv').config()
const axios = require('axios');
const router = new express.Router()

router.post('/verify', async (req, res) => {
    try {
        const { query } = req
        const options = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            }
        }

        const response = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${query.response}`,
            {},
            options,
        )

        const { success, score } = response.data

        if (!success) {
            return res.status(400).send({ error: response.data['error-codes'] })
        }

        if (score < 0.5) {
            return res.status(400).send({ error: 'Not human' })
        }

        res.status(200).send(response.data)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router;