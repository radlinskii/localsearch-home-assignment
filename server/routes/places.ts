import { Router } from 'express'
import fetch from 'node-fetch'
import placesService from '../services/places'

const placesRouter = Router()

placesRouter.get('/:placeId', async (req, res) => {
    const response = await fetch(`${process.env.EXTERNAL_API_URL}/${req.params.placeId}`)

    if (response.status === 200) {
        const data = await response.json()

        const parsedPlace = placesService.parsePlace(data)

        res.send(parsedPlace)
    } else {
        res.status(response.status).json({ status: response.status })
    }
})

export default placesRouter
