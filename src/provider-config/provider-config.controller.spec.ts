import { Test, TestingModule } from '@nestjs/testing';
import { ProviderConfigController } from './provider-config.controller';

describe('ProviderConfigController', () => {
  let controller: ProviderConfigController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProviderConfigController],
    }).compile();

    controller = module.get<ProviderConfigController>(ProviderConfigController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
