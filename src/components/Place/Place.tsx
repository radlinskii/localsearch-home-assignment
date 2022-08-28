import React from 'react'
import { Place } from '../../../types/place'
import OpeningHours from '../OpeningHours'

import styles from './Place.module.scss'

type Props = {
    place: Place
}

export default function PlaceComponent({ place }: Props) {
    return (
        <>
            <h1 className={styles.name}>{place.name}</h1>
            <p className={styles.location}>{place.location}</p>
            <OpeningHours hours={place.openingHours} />
        </>
    )
}
