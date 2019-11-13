import * as path from 'path';
import { Entity /* , EntityCrudRepository */ } from '@loopback/repository';
import { pathExistsSync } from 'fs-extra';
import { Prisma } from '../types';

let prisma: Prisma;
if (
  pathExistsSync(
    path.resolve(__dirname, '../../../../example/generated/prisma-client')
  )
) {
  prisma = require(path.resolve(
    __dirname,
    '../../example/generated/prisma-client'
  )).prisma;
}

export class DefaultCrudRepository<
  T extends Entity
  //  ID,
  //  Relations extends object = {}
> /* implements EntityCrudRepository<T, ID, Relations> */ {
  constructor(
    public entityClass: typeof Entity & { prototype: T },
    public dataSource: any
  ) {}
}
