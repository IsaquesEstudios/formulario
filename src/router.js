const express = require('express')
const tiConnected = require('./form/tiConnected')

const router = express()

router.use(tiConnected)


module.exports = router

// export default router