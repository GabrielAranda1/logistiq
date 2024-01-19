import { Controller, Get, Query } from '@nestjs/common'
import { FindPlaceUseCase } from 'src/domain/usecases/FindPlace/find.place.usecase'

@Controller('places')
export class PlacesController {
  constructor(private readonly findPlaceUseCase: FindPlaceUseCase) {}

  @Get()
  async findPlace(@Query('text') text: string) {
    return this.findPlaceUseCase.execute(text)
  }
}
