import { Client as GoogleMapsClient } from '@googlemaps/google-maps-services-js'
import { Global, Module } from '@nestjs/common'
import { GoogleMapsIntegration } from 'src/infra/integrations/googlemaps.integration'

@Global()
@Module({
  providers: [
    GoogleMapsIntegration,
    { provide: GoogleMapsClient, useValue: new GoogleMapsClient({}) },
  ],
  exports: [GoogleMapsIntegration],
})
export class GoogleMapsIntegrationModule {}
