import { DirectionsResponseData } from '@googlemaps/google-maps-services-js'

export type Route = {
  id: string
  name: string
  source: { name: string; location: { lat: number; long: number } }
  destination: { name: string; location: { lat: number; long: number } }
  distance: number
  duration: number
  directions: DirectionsResponseData & { request: any }
  createdAt: Date
  updatedAt: Date
}
