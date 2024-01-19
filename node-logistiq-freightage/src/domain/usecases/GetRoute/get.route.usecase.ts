import { Injectable } from '@nestjs/common'
import { Route } from 'src/domain/entitites/Route'
import { PrismaService } from 'src/main/modules/prisma/prisma.service'

@Injectable()
export class GetRouteUseCase {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(routeId: string) {
    const foundRoute = await this.prismaService.route.findUnique({
      where: { id: routeId },
    })

    return new Route({
      ...foundRoute,
      directions: JSON.parse(foundRoute.directions as string),
    })
  }
}
