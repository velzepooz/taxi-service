import { PrismaClient } from '@prisma/client';

export class PrismaService extends PrismaClient {
  constructor() {
    super();
  }

  init() {
    return this.$connect;
  }
}

export const initPrismaService = () => new PrismaService();
