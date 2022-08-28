import { GetServerSideProps } from 'next'
import PlaceComponent from '../../components/Place'
import type { Place } from '../../../types/place'
import Link from 'next/link'

type Props = {
    place: Place
}

function Page({ place }: Props) {
    return (
        <div>
            <PlaceComponent place={place} />
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    if (!context?.params?.placeId) {
        return {
            notFound: true,
        }
    }

    const url = `${process.env.API_URL}/places/${context.params.placeId}`

    const res = await fetch(url)
    const place = await res.json()

    if (!place) {
        return {
            notFound: true,
        }
    }

    return { props: { place } }
}

export default Page
