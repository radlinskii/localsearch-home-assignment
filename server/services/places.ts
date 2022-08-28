const parseOpeningHours = (openingHours: any) => {
    return openingHours.days
}

const placesService = {
    parsePlace: (place: any) => {
        return {
            id: place.local_entry_id,
            name: place.displayed_what,
            location: place.displayed_where,
            openingHours: parseOpeningHours(place.opening_hours),
        }
    },
}

export default placesService
