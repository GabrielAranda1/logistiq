import { Injectable } from '@nestjs/common'
import { GetRoutesDTO } from './get.routes.dto'
import { PrismaService } from 'src/main/modules/prisma/prisma.service'
import { Route } from 'src/domain/entitites/Route'

@Injectable()
export class GetRoutesUseCase {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(_params: GetRoutesDTO) {
    const foundRoutes = await this.prismaService.route.findMany({})

    return foundRoutes.map((route) => {
      return new Route({
        ...route,
        directions: JSON.parse(route.directions as string),
      })
    })
  }
}
