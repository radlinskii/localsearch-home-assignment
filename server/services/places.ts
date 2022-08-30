import * as R from 'ramda'
import { DayName, ExternalApiPlace, OpeningDays, Day, OpeningHoursGroup } from '../../types/place'

const dayIndexesToDayNames: Record<number, DayName> = {
    0: 'sunday',
    1: 'monday',
    2: 'tuesday',
    3: 'wednesday',
    4: 'thursday',
    5: 'friday',
    6: 'saturday',
}

const getOpenAndClosedDays = (openingDays: OpeningDays) => {
    const dayNames: DayName[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

    return dayNames.map((dayName) => {
        const dayOpeningHours = openingDays[dayName]
        if (!dayOpeningHours) {
            return {
                name: dayName,
                hours: null,
            }
        }

        return {
            name: dayName,
            hours: dayOpeningHours,
        }
    })
}

const groupDaysByOpeningHours = (allDays: Day[]) => {
    let previousDay = allDays[0]
    let startDayName = allDays[0].name
    let hours: OpeningHoursGroup[] = []

    for (const day of allDays) {
        if (!R.equals(day.hours, previousDay.hours)) {
            hours = hours.concat({
                startDay: startDayName,
                endDay: previousDay.name,
                hours: previousDay.hours,
            })
            if (day.name === 'sunday') {
                hours = hours.concat({
                    startDay: day.name,
                    endDay: day.name,
                    hours: day.hours,
                })
            }
            startDayName = day.name
        } else if (day.name === 'sunday') {
            hours = hours.concat({
                startDay: startDayName,
                endDay: day.name,
                hours: previousDay.hours,
            })
            startDayName = day.name
        }
        previousDay = day
    }
    return hours
}

export const parseOpeningHours = (openingDays: OpeningDays) => {
    const allDays = getOpenAndClosedDays(openingDays)

    return groupDaysByOpeningHours(allDays)
}

export const getTimePart = (time: string) => {
    return { hour: parseInt(time.split(':')[0]), minutes: parseInt(time.split(':')[1]) }
}

export const checkIfPlaceIsOpen = (openingDays: OpeningDays) => {
    const allDays = getOpenAndClosedDays(openingDays)

    const currentDate = new Date()

    currentDate.setHours(20, 0, 0, 0)

    const currentDayIndex = currentDate.getDay()
    const currentDayName = dayIndexesToDayNames[currentDayIndex]

    const currentDay = allDays.find((day) => day.name === currentDayName)

    if (!currentDay || !currentDay.hours) {
        return false
    }

    return currentDay.hours.some((hour) => {
        const startTime = new Date(currentDate)
        const startTimeParts = getTimePart(hour.start)
        startTime.setHours(startTimeParts.hour, startTimeParts.minutes, 0, 0)

        const endTime = new Date(currentDate)
        const endTimeParts = getTimePart(hour.end)
        endTime.setHours(endTimeParts.hour, endTimeParts.minutes, 0, 0)

        // end time is in the next day if time was midnight

        return currentDate >= startTime && currentDate < endTime
    })
}

const placesService = {
    parsePlace: (place: ExternalApiPlace) => {
        return {
            id: place.local_entry_id,
            name: place.displayed_what,
            location: place.displayed_where,
            openingHours: parseOpeningHours(place.opening_hours.days),
            isOpen: checkIfPlaceIsOpen(place.opening_hours.days),
        }
    },
}

export default placesService
