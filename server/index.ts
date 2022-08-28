import 'dotenv/config'

import express from 'express'
import placesRouter from './routes/places'

const app = express()
const port = process.env.API_PORT

app.use(express.json())
app.use('/api/places', placesRouter)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
