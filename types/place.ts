export type OpeningHours = {
    start: string
    end: string
}

export type DayName = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'

export type OpeningHoursGroup = {
    startDay: DayName
    endDay: DayName
    hours: OpeningHours[] | null
}

export type OpeningDays = Record<string, OpeningHours[]>

export type Day = {
    name: DayName
    hours: OpeningHours[] | null
}

export type Place = {
    id: string
    name: string
    location: string
    openingHours: OpeningHoursGroup[]
    isOpen: boolean
}

export type ExternalApiPlace = {
    local_entry_id: string
    displayed_what: string
    displayed_where: string
    opening_hours: {
        days: OpeningDays
    }
}
