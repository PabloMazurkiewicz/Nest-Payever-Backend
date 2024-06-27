import { Test, TestingModule } from '@nestjs/testing';
import { ReqresApiService } from 'src/database/reqresdb/reqres.service';
import { RabbitMQService } from 'src/modules/rabbitmq/rabbitmq.service';
import { UserController } from 'src/modules/user/user.controller';
import { UserService } from 'src/modules/user/user.service';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, ReqresApiService, RabbitMQService],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('getUserAvatar', () => {
    it('should return a user avatar by User ID', async () => {
      const user = {
        id: 1,
        email: 'michael.lawson@reqres.in',
        avatar: 'https://reqres.in/img/faces/1-image.jpg',
      };
      const avatarBase64 =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABlBMVEX///8AAABVwtN+AAAApUlEQVR42mP8z8AARIwE1wFOwKTpA8GhiIJYAhAV2QjCBdDkXQAAAABJRU5ErkJggg==';
      jest
        .spyOn(userService, 'getBase64UserAvatar')
        .mockImplementation(async () => avatarBase64);

      const result = await controller.getUser(1);

      expect(result).toEqual({
        ...user,
        avatar: avatarBase64,
      });
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const userData: any = {
        email: 'john.doe@example.com',
        avatar: 'https://example.com/avatar.png',
      };
      const createdUser = {
        ...userData,
      };
      jest
        .spyOn(userService, 'createUser')
        .mockImplementation(async () => createdUser);

      expect(await controller.createUser(userData)).toBe(createdUser);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user by ID', async () => {
      const userId = '664c6d99a5a7e50f5e66d0ca';
      jest
        .spyOn(userService, 'deleteAvatar')
        .mockImplementation(async () => undefined);

      expect(await controller.deleteAvatar(userId)).toBeUndefined();
    });
  });
});
