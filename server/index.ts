import 'dotenv/config'

import express from 'express'
import placesRouter from './routes/places'

const app = express()
const port = 3000

app.use(express.json())
app.use('/api/places', placesRouter)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
