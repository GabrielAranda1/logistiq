'use client'

import type {
  DirectionsResponseData,
  FindPlaceFromTextResponseData,
} from '@googlemaps/google-maps-services-js'
import { FormEvent, useRef } from 'react'
import { useMap } from '../hooks/useMap'

export function NewRoutePage() {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const map = useMap(mapContainerRef)

  async function searchPlaces(event: FormEvent) {
    event.preventDefault()

    const source = (document.getElementById('source') as HTMLInputElement).value
    const destination = (
      document.getElementById('destination') as HTMLInputElement
    ).value

    const [sourceResponse, destinationResponse] = await Promise.all([
      fetch(`http://localhost:5000/places?text=${source}`),
      fetch(`http://localhost:5000/places?text=${destination}`),
    ])

    const [sourcePlace, destinationPlace]: FindPlaceFromTextResponseData[] =
      await Promise.all([sourceResponse.json(), destinationResponse.json()])

    if (sourcePlace.status !== 'OK') {
      console.log(sourcePlace)
      alert('Origin not found')
      return
    }

    if (destinationPlace.status !== 'OK') {
      console.log(destinationPlace)
      alert('Destination not found')
      return
    }

    const placeSourceId = sourcePlace.candidates[0].place_id
    const placeDestinationId = destinationPlace.candidates[0].place_id

    const directionsResponse = await fetch(
      `http://localhost:5000/directions?originId=${placeSourceId}&destinationId=${placeDestinationId}`,
    )

    const directionsData: DirectionsResponseData & { request: any } =
      await directionsResponse.json()

    await map?.addRouteWithIcons({
      routeId: '1',
      startMarkerOptions: {
        position: directionsData.routes[0].legs[0].start_location,
      },
      endMarkerOptions: {
        position: directionsData.routes[0].legs[0].end_location,
      },
      carMarkerOptions: {
        position: directionsData.routes[0].legs[0].start_location,
      },
    })
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
        width: '100%',
      }}
    >
      <div>
        <h1>Nova rota</h1>
        <form
          style={{ display: 'flex', flexDirection: 'column' }}
          onSubmit={searchPlaces}
        >
          <div>
            <input id="source" type="text" placeholder="origem"></input>
          </div>
          <div>
            <input id="destination" type="text" placeholder="destino"></input>
          </div>
          <button type="submit">Pesquisar</button>
        </form>
      </div>
      <div
        id="map"
        ref={mapContainerRef}
        style={{
          height: '100%',
          width: '100%',
        }}
      ></div>
    </div>
  )
}

export default NewRoutePage
