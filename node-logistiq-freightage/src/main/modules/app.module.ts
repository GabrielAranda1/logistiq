import { Module } from '@nestjs/common'
import { PrismaModule } from './prisma/prisma.module'
import { RoutesModule } from './routes.module'
import { ConfigModule } from '@nestjs/config'
import { PlacesModule } from './places.module'
import { DirectionsModule } from './directions.module'
import { GoogleMapsIntegrationModule } from './googlemaps.integration.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    RoutesModule,
    PlacesModule,
    DirectionsModule,
    GoogleMapsIntegrationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
