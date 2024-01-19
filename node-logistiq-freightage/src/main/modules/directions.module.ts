import { Module } from '@nestjs/common'
import { GetDirectionsUseCase } from 'src/domain/usecases/GetDirections/get.directions.usecase'
import { DirectionsController } from 'src/presentation/http/controllers/Directions/directions.controller'

@Module({
  controllers: [DirectionsController],
  providers: [GetDirectionsUseCase],
})
export class DirectionsModule {}
