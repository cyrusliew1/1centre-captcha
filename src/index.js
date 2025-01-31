const express = require('express')
const captchaRouter = require('./routers/captcha');

const app = express()
const port = process.env.PORT || 3000

app.use(
    express.json(),
    captchaRouter,
)

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})