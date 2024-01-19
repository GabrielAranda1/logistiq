import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/main/modules/prisma/prisma.service'
import { AddRouteLocationDto } from './addRouteLocation.dto'

Injectable()
export class AddRouteLocationUseCase {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(params: AddRouteLocationDto) {
    const { lat, long, routeId } = params
    return this.prismaService.routeDriver.upsert({
      include: {
        route: true,
      },
      where: {
        routeId,
      },
      create: {
        routeId,
        points: {
          set: {
            location: {
              long,
              lat,
            },
          },
        },
      },
      update: {
        points: {
          push: {
            location: {
              long,
              lat,
            },
          },
        },
      },
    })
  }
}
