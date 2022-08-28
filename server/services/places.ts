import * as R from 'ramda'
import { DayName, ExternalApiPlace, OpeningDays, Day, OpeningHoursGroup } from '../../types/place'

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

const placesService = {
    parsePlace: (place: ExternalApiPlace) => {
        return {
            id: place.local_entry_id,
            name: place.displayed_what,
            location: place.displayed_where,
            openingHours: parseOpeningHours(place.opening_hours.days),
        }
    },
}

export default placesService
