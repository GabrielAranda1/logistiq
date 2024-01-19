import { Controller, Get, Query } from '@nestjs/common'
import { GetDirectionsUseCase } from 'src/domain/usecases/GetDirections/get.directions.usecase'

@Controller('directions')
export class DirectionsController {
  constructor(private readonly getDirectionsUseCase: GetDirectionsUseCase) {}

  @Get()
  async getDirections(
    @Query('originId') originId: string,
    @Query('destinationId') destinationId: string,
  ) {
    return this.getDirectionsUseCase.execute({ originId, destinationId })
  }
}
