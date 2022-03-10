import { UserService } from '../../../src/modules/user/user.service';
import { UserController } from '../../../src/modules/user/user.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../../../src/modules/user/user.entity';

describe('User Controller ', () => {
  const userMock = { id: 123, name: 'Full Name', email: 'username@acme.com', password: '123456' };
  let userController: UserController;
  let userService: UserService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            get: jest.fn(),
            login: jest.fn(),
            register: jest.fn(),
          },
        },
      ],
    }).compile();
    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('register', () => {
    it('should conflict if email already taken', async () => {
      const spyGet = jest.spyOn(userService, 'get').mockReturnValue(Promise.resolve<User>(userMock));
      const spySave = jest.spyOn(userService, 'register').mockReturnValue(Promise.resolve(null));

      try {
        await userController.register({ email: 'username@acme.com', name: 'Full Name', password: '123456' });
      } catch (e) {
        expect(e).toBeDefined();
        expect(spyGet).toBeCalledWith('username@acme.com');
        expect(spySave).toBeCalledTimes(0);
      }
    });

    it('should register if email is available ', async () => {
      const spyGet = jest.spyOn(userService, 'get').mockReturnValue(null);
      const spySave = jest.spyOn(userService, 'register').mockReturnValue(Promise.resolve<User>(userMock));

      await userController.register({ name: 'Full Name', email: 'username@acme.com', password: '123456' });

      expect(spyGet).toBeCalledWith('username@acme.com');
      expect(spySave).toBeCalledTimes(1);
    });
  });
});
