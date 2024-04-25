import { Test, TestingModule } from '@nestjs/testing';
import { RoomUserController } from './roomUser.controller';
import { RoomUserService } from './roomUser.service';

describe('RoomUserController', () => {
  let controller: RoomUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomUserController],
      providers: [RoomUserService],
    }).compile();

    controller = module.get<RoomUserController>(RoomUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
