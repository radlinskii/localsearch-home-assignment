import React, { useState } from 'react'
import { OpeningHoursGroup } from '../../../types/place'

type Props = {
    hours: OpeningHoursGroup[]
}

export default function OpeningHours({ hours }: Props) {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <button onClick={() => setIsOpen((v) => !v)}>Opening hours {isOpen ? '+' : '-'}</button>
            {isOpen &&
                hours.map(({ startDay, endDay, hours: openingHours }) => {
                    return (
                        <div key={startDay}>
                            <span>{startDay === endDay ? startDay : `${startDay} - ${endDay}`}</span>
                            <div>
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
