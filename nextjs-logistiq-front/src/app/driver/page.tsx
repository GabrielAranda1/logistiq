'use client'

import { useRef } from 'react'
import { useMap } from '../hooks/useMap'
import useSwr from 'swr'
import { fetcher } from '../utils/http'
import { Route } from '../utils/model'
import { sleep } from '../utils/sleep'

export function DriverPage() {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const map = useMap(mapContainerRef)

  const {
    data: routes,
    error,
    isLoading,
  } = useSwr<Route[]>('http://localhost:5000/routes', fetcher, {
    fallbackData: [],
  })

  async function startRoute() {
    const routeId = (document.getElementById('route') as HTMLSelectElement)
      .value

    const response = await fetch(`http://localhost:5000/routes/${routeId}`)
    const route: Route = await response.json()

    map?.removeAllRoutes()
    await map?.addRouteWithIcons({
      routeId,
      startMarkerOptions: {
        position: route.directions.routes[0].legs[0].start_location,
      },
      endMarkerOptions: {
        position: route.directions.routes[0].legs[0].end_location,
      },
      carMarkerOptions: {
        position: route.directions.routes[0].legs[0].start_location,
      },
    })

    const { steps } = route.directions.routes[0].legs[0]

    steps.forEach(async (step) => {
      await sleep(2000)

      map?.moveCar(routeId, step.start_location)

      await sleep(2000)

      map?.moveCar(routeId, step.end_location)
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
        <h1>My travel</h1>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <select id="route">
            {isLoading && <option>Loading routes...</option>}
            {routes!.map((route) => (
              <option key={route.id} value={route.id}>
                {route.name}
              </option>
            ))}
          </select>
          <button type="submit" onClick={startRoute}>
            Start travel
          </button>
        </div>
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

export default DriverPage
