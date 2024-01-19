import { Module } from '@nestjs/common'
import { CreateRouteUseCase } from 'src/domain/usecases/CreateRoute/create.route.usecase'
import { GetRouteUseCase } from 'src/domain/usecases/GetRoute/get.route.usecase'
import { GetRoutesUseCase } from 'src/domain/usecases/GetRoutes/get.routes.usecase'
import { RoutesController } from 'src/presentation/http/controllers/Routes/routes.controller'
import { RoutesGateway } from 'src/presentation/websocket/Routes/routes.gateway'

@Module({
  controllers: [RoutesController],
  providers: [
    CreateRouteUseCase,
    GetRoutesUseCase,
    GetRouteUseCase,
    RoutesGateway,
  ],
})
export class RoutesModule {}
