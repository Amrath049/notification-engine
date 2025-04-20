import { Test, TestingModule } from '@nestjs/testing';
import { ProviderConfigService } from './provider-config.service';

describe('ProviderConfigService', () => {
  let service: ProviderConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProviderConfigService],
    }).compile();

    service = module.get<ProviderConfigService>(ProviderConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
