import { mockDeep } from 'jest-mock-extended';
import { PrismaClient as OriginalPrismaClient } from '@prisma/client';

jest.mock('@prisma/client', () => ({
  PrismaClient: function () {
    return mockDeep<OriginalPrismaClient>();
  }
}));