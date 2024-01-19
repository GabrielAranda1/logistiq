import { Client as GoogleMapsClient } from '@googlemaps/google-maps-services-js'
import {
  DirectionsRequest,
  FindPlaceFromTextResponseData,
  PlaceInputType,
  TravelMode,
} from '@googlemaps/google-maps-services-js'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class GoogleMapsIntegration {
  constructor(
    private readonly configService: ConfigService,
    private readonly googleMapsService: GoogleMapsClient,
  ) {}

  async getDirections(originId: string, destinationId: string) {
    const requestParams: DirectionsRequest['params'] = {
      origin: `place_id:${originId.replace('place_id:', '')}`,
      destination: `place_id:${destinationId.replace('place_id:', '')}`,
      mode: TravelMode.driving,
      key: this.configService.get<string>('GOOGLE_MAPS_API_KEY'),
    }

    const { data } = await this.googleMapsService.directions({
      params: requestParams,
    })

    return {
      ...data,
      request: {
        origin: {
          placeId: requestParams.origin,
          location: {
            lat: data.routes[0].legs[0].start_location.lat,
            lng: data.routes[0].legs[0].start_location.lng,
          },
        },
        destination: {
          placeId: requestParams.destination,
          location: {
            lat: data.routes[0].legs[0].end_location.lat,
            lng: data.routes[0].legs[0].end_location.lng,
          },
        },
        mode: requestParams.mode,
      },
    }
  }

  async findPlaceFromText(
    text: string,
  ): Promise<FindPlaceFromTextResponseData> {
    const { data } = await this.googleMapsService.findPlaceFromText({
      params: {
        input: text,
        inputtype: PlaceInputType.textQuery,
        fields: ['place_id', 'formatted_address', 'geometry', 'name'],
        key: this.configService.get<string>('GOOGLE_MAPS_API_KEY'),
      },
    })

    return data
  }
}
