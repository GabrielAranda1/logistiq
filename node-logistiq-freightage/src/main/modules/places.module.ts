import { Module } from '@nestjs/common'
import { FindPlaceUseCase } from 'src/domain/usecases/FindPlace/find.place.usecase'
import { PlacesController } from 'src/presentation/http/controllers/Places/places.controller'

@Module({
  controllers: [PlacesController],
  providers: [FindPlaceUseCase],
})
export class PlacesModule {}
