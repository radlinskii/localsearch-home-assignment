import { Router } from 'express'
import fetch from 'node-fetch'
import { ExternalApiPlace } from '../../types/place'
import placesService from '../services/places'

const placesRouter = Router()

placesRouter.get('/:placeId', async (req, res) => {
    const response = await fetch(`${process.env.EXTERNAL_API_URL}/${req.params.placeId}`)

    if (response.status === 200) {
        const externalApiPlace :  ExternalApiPlace = await response.json()

        const parsedPlace = placesService.parsePlace(externalApiPlace)

        res.json(parsedPlace)
    } else {
        res.status(response.status).json({ status: response.status })
    }
})

export default placesRouter
