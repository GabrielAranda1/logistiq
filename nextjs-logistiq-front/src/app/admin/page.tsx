'use client'

import { useEffect, useRef } from 'react'
import { useMap } from '../hooks/useMap'
import { Route } from '../utils/model'
import { socket } from '../utils/socket-io'

export function AdminPage() {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const map = useMap(mapContainerRef)

  useEffect(() => {
    socket.connect()

    socket.on(
      'adminNewPoint',
      async (data: { routeId: string; lat: number; long: number }) => {
        if (!map?.hasRoute(data.routeId)) {
          const response = await fetch(
            `http://localhost:5000/routes/${data.routeId}`,
          )

          const route: Route = await response.json()

          map?.removeRoute(data.routeId)

          await map?.addRouteWithIcons({
            routeId: data.routeId,
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
        }
        map?.moveCar(data.routeId, { lat: data.lat, lng: data.long })
      },
    )

    return () => {
      socket.disconnect()
    }
  }, [map])

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
      }}
    >
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

export default AdminPage
