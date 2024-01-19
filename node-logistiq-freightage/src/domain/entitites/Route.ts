export class Route {
  constructor(params: Partial<Route>) {
    Object.assign(this, params)
  }

  public id: string
  public name: string
  public source: {
    name: string
    location: {
      lat: number
      long: number
    }
  }
  public destination: {
    name: string
    location: {
      lat: number
      long: number
    }
  }
  public distance: number
  public duration: number
  public directions: {
    available_travel_modes: string[]
    geocoded_waypoints: any[]
    routes: any[]
    request: any
  }
}
