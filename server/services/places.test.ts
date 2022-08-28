import { describe, expect, test } from '@jest/globals'
import { parseOpeningHours } from './places'

describe('places service', () => {
    describe('parseOpeningHours', () => {
        test('should parse opening hours with adding missing days and grouping closed days', () => {
            const openingHours = {
                tuesday: [
                    {
                        start: '18:30',
                        end: '00:00',
                    },
                ],
            }

            expect(parseOpeningHours(openingHours)).toStrictEqual([
                {
                    startDay: 'monday',
                    endDay: 'monday',
                    hours: null,
                },
                {
                    startDay: 'tuesday',
                    endDay: 'tuesday',
                    hours: [
                        {
                            start: '18:30',
                            end: '00:00',
                        },
                    ],
                },
                {
                    startDay: 'wednesday',
                    endDay: 'sunday',
                    hours: null,
                },
            ])
        })

        test('should parse opening hours with grouping open days', () => {
            const openingHours = {
                monday: [
                    {
                        start: '18:30',
                        end: '00:00',
                    },
                ],
                tuesday: [
                    {
                        start: '18:30',
                        end: '00:00',
                    },
                ],
                wednesday: [
                    {
                        start: '18:30',
                        end: '00:00',
                    },
                ],
                friday: [
                    {
                        start: '12:15',
                        end: '17:45',
                    },
                ],
                saturday: [
                    {
                        start: '12:15',
                        end: '17:45',
                    },
                ],
            }

            expect(parseOpeningHours(openingHours)).toStrictEqual([
                {
                    startDay: 'monday',
                    endDay: 'wednesday',
                    hours: [
                        {
                            start: '18:30',
                            end: '00:00',
                        },
                    ],
                },
                {
                    startDay: 'thursday',
                    endDay: 'thursday',
                    hours: null,
                },
                {
                    startDay: 'friday',
                    endDay: 'saturday',
                    hours: [
                        {
                            start: '12:15',
                            end: '17:45',
                        },
                    ],
                },
                {
                    startDay: 'sunday',
                    endDay: 'sunday',
                    hours: null,
                },
            ])
        })

        test('should handle case when sunday is the same as saturday', () => {
            const openingHours = {
                saturday: [
                    {
                        start: '18:30',
                        end: '00:00',
                    },
                ],
                sunday: [
                    {
                        start: '18:30',
                        end: '00:00',
                    },
                ],
            }

            expect(parseOpeningHours(openingHours)).toStrictEqual([
                {
                    startDay: 'monday',
                    endDay: 'friday',
                    hours: null,
                },
                {
                    startDay: 'saturday',
                    endDay: 'sunday',
                    hours: [
                        {
                            start: '18:30',
                            end: '00:00',
                        },
                    ],
                },
            ])
        })

        test('should handle case when sunday is different than saturday', () => {
            const openingHours = {
                saturday: [
                    {
                        start: '18:30',
                        end: '00:00',
                    },
                ],
                sunday: [
                    {
                        start: '12:15',
                        end: '17:45',
                    },
                ],
            }

            expect(parseOpeningHours(openingHours)).toStrictEqual([
                {
                    startDay: 'monday',
                    endDay: 'friday',
                    hours: null,
                },
                {
                    startDay: 'saturday',
                    endDay: 'saturday',
                    hours: [
                        {
                            start: '18:30',
                            end: '00:00',
                        },
                    ],
                },
                {
                    startDay: 'sunday',
                    endDay: 'sunday',
                    hours: [
                        {
                            start: '12:15',
                            end: '17:45',
                        },
                    ],
                },
            ])
        })

        test('should handle case when there are no open hours', () => {
            const openingHours = {}

            expect(parseOpeningHours(openingHours)).toStrictEqual([
                {
                    startDay: 'monday',
                    endDay: 'sunday',
                    hours: null,
                },
            ])
        })
    })
})
