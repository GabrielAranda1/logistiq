import { Injectable } from '@nestjs/common'
import { CreateRouteDTO } from './create.route.dto'
import { PrismaService } from 'src/main/modules/prisma/prisma.service'
import { GoogleMapsIntegration } from 'src/infra/integrations/googlemaps.integration'

@Injectable()
export class CreateRouteUseCase {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly googleMapsIntegration: GoogleMapsIntegration,
  ) {}

  async execute(params: CreateRouteDTO) {
    const { sourceId, destinationId } = params

    const { available_travel_modes, geocoded_waypoints, routes, request } =
      await this.googleMapsIntegration.getDirections(sourceId, destinationId)

    const initialLegs = routes[0].legs[0]

    return this.prismaService.route.create({
      data: {
        name: params.name,
        source: {
          name: initialLegs.start_address,
          location: {
            lat: initialLegs.start_location.lat,
            long: initialLegs.start_location.lng,
          },
        },
        destination: {
          name: initialLegs.end_address,
          location: {
            lat: initialLegs.end_location.lat,
            long: initialLegs.end_location.lng,
          },
        },
        distance: initialLegs.distance.value,
        duration: initialLegs.duration.value,
        directions: JSON.stringify({
          available_travel_modes,
          geocoded_waypoints,
          routes,
          request,
        }),
      },
    })
  }
}
