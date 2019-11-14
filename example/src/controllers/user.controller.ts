import { Count, CountSchema } from '@loopback/repository';
import { post, param, get, patch, put, del, requestBody } from '@loopback/rest';
import {
  Int,
  String,
  User,
  UserOrderByInput,
  UserWhereInput,
  prisma
} from '../generated/prisma-client';

const UserSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' }
  }
};

const UsersSchema = {
  type: 'array',
  items: UserSchema
};

interface UserQuery {
  where?: UserWhereInput;
  orderBy?: UserOrderByInput;
  skip?: Int;
  after?: String;
  before?: String;
  first?: Int;
  last?: Int;
}

export class UserController {
  constructor() {}

  @post('/users', {
    responses: {
      '200': {
        description: 'User model instance',
        content: { 'application/json': { schema: UserSchema } }
      }
    }
  })
  async create(
    @requestBody({ content: { 'application/json': { schema: UserSchema } } })
    user: Omit<User, 'id'>
  ): Promise<User> {
    return prisma.createUser(user);
  }

  @get('/users/count', {
    responses: {
      '200': {
        description: 'User model count',
        content: { 'application/json': { schema: CountSchema } }
      }
    }
  })
  async count(
    @param.query.object('where', {}) where?: UserWhereInput
  ): Promise<Count> {
    return { count: (await prisma.users({ where })).length };
  }

  @get('/users', {
    responses: {
      '200': {
        description: 'Array of User model instances',
        content: { 'application/json': { schema: UsersSchema } }
      }
    }
  })
  async find(
    @param.query.object('filter', {})
    filter?: UserQuery
  ): Promise<User[]> {
    return prisma.users(filter);
  }

  // TODO
  @patch('/users', {
    responses: {
      '200': {
        description: 'User PATCH success count',
        content: { 'application/json': { schema: CountSchema } }
      }
    }
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: { ...UsersSchema, partial: true }
        }
      }
    })
    user: User,
    @param.query.object('where', UserSchema) where?: UserWhereInput
  ): Promise<Count> {
    return {
      count: Number((await prisma.updateManyUsers({ data: user, where })).count)
    };
  }

  @get('/users/{id}', {
    responses: {
      '200': {
        description: 'User model instance',
        content: { 'application/json': { schema: UserSchema } }
      }
    }
  })
  async findById(@param.path.string('id') id: string): Promise<User | null> {
    return prisma.user({ id });
  }

  @patch('/users/{id}', {
    responses: {
      '204': {
        description: 'User PATCH success'
      }
    }
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: { ...UserSchema, partial: true }
        }
      }
    })
    user: User
  ): Promise<void> {
    await prisma.updateUser({ data: user, where: { id } });
  }

  @put('/users/{id}', {
    responses: {
      '204': {
        description: 'User PUT success'
      }
    }
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() user: User
  ): Promise<void> {
    await prisma.updateUser({ data: user, where: { id } });
  }

  @del('/users/{id}', {
    responses: {
      '204': {
        description: 'User DELETE success'
      }
    }
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await prisma.deleteUser({ id });
  }
}
