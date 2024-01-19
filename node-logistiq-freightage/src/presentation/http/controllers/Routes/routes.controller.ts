import { Controller, Get, Post, Body, Param } from '@nestjs/common'
import { CreateRouteUseCase } from 'src/domain/usecases/CreateRoute/create.route.usecase'
import { CreateRouteDTO } from './create.routes.dto'
import { GetRoutesUseCase } from 'src/domain/usecases/GetRoutes/get.routes.usecase'
import { GetRouteUseCase } from 'src/domain/usecases/GetRoute/get.route.usecase'

@Controller('routes')
export class RoutesController {
  constructor(
    private readonly createRouteUseCase: CreateRouteUseCase,
    private readonly getRoutes: GetRoutesUseCase,
    private readonly getRoute: GetRouteUseCase,
  ) {}

  @Post()
  create(@Body() createRouteDto: CreateRouteDTO) {
    return this.createRouteUseCase.execute(createRouteDto)
  }

  @Get()
  findAll() {
    return this.getRoutes.execute({})
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getRoute.execute(id)
  }
}
