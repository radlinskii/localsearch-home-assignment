import * as R from 'ramda'

const getOpenAndClosedDays = (openingDays: any) => {
    const dayNames = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

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

const groupDaysByOpeningHours = (allDays: { name: string; hours: any }[]) => {
    let previousDay = allDays[0]
    let startDayName = allDays[0].name
    let hours: any = []

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

export const parseOpeningHours = (openingDays: any) => {
    const allDays = getOpenAndClosedDays(openingDays)

    return groupDaysByOpeningHours(allDays)
}

const placesService = {
    parsePlace: (place: any) => {
        return {
            id: place.local_entry_id,
            name: place.displayed_what,
            location: place.displayed_where,
            openingHours: parseOpeningHours(place.opening_hours.days),
        }
    },
}

export default placesService
