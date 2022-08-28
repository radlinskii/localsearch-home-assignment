import React, { useState } from 'react'
import { OpeningHoursGroup } from '../../../types/place'
import styles from './OpeningHours.module.scss'

type Props = {
    hours: OpeningHoursGroup[]
}

export default function OpeningHours({ hours }: Props) {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <button className={styles.button} onClick={() => setIsOpen((v) => !v)}>
                Opening hours {isOpen ? '-' : '+'}
            </button>
            {isOpen &&
                hours.map(({ startDay, endDay, hours: openingHours }) => {
                    return (
                        <div className={styles.hoursGroup} key={startDay}>
                            <span>{startDay === endDay ? startDay : `${startDay} - ${endDay}`}</span>
                            <div className={styles.hours}>
                                {openingHours === null && 'closed'}
                                {openingHours &&
                                    openingHours.map(({ start, end }) => {
                                        return (
                                            <div key={start}>
                                                <span>
                                                    {start} - {end}
                                                </span>
                                            </div>
                                        )
                                    })}
                            </div>
                        </div>
                    )
                })}
        </>
    )
}
