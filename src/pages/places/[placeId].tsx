import { GetServerSideProps } from 'next'
import OpeningHours from '../../components/OpeningHours'
import { Place } from '../../../types/place'

type Props = {
    place: Place
}

function Page({ place }: Props) {
    return (
        <div className="container">
            <h1>{place.name}</h1>
            <p>{place.location}</p>
            <OpeningHours hours={place.openingHours} />
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
