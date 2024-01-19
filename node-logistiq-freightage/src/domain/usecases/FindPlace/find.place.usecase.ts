import { Injectable } from '@nestjs/common'
import { GoogleMapsIntegration } from 'src/infra/integrations/googlemaps.integration'

@Injectable()
export class FindPlaceUseCase {
  constructor(private readonly googleMapsIntegration: GoogleMapsIntegration) {}

  async execute(text: string) {
    return this.googleMapsIntegration.findPlaceFromText(text)
  }
}
