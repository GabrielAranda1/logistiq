import { Injectable } from '@nestjs/common'
import { GetDirectionsDTO } from './get.directions.dto'
import { GoogleMapsIntegration } from 'src/infra/integrations/googlemaps.integration'

@Injectable()
export class GetDirectionsUseCase {
  constructor(private readonly googleMapsIntegration: GoogleMapsIntegration) {}

  async execute(params: GetDirectionsDTO) {
    const { originId, destinationId } = params

    return this.googleMapsIntegration.getDirections(originId, destinationId)
  }
}
