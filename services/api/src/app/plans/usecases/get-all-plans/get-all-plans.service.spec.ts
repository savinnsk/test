import { Test, TestingModule } from '@nestjs/testing';

import { PlansRepository } from '@app/plans/repositories/plans.repository';
import { InMemoryPlansRepository } from '@infra/database/in-memory/repositories/plans.repository';
import { planMock } from '@common/mocks/plan.mock';
import { GetAllPlansService } from './get-all-plans.service';

describe('Get all plans service', () => {
  let getAllPlansService: GetAllPlansService;
  let plansRepository: PlansRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetAllPlansService,
        {
          provide: PlansRepository,
          useClass: InMemoryPlansRepository,
        },
      ],
    }).compile();

    getAllPlansService = module.get<GetAllPlansService>(GetAllPlansService);

    plansRepository = module.get<PlansRepository>(PlansRepository);

    (await plansRepository.create(planMock)) as any;
  });

  it('should be defined', () => {
    expect(getAllPlansService).toBeDefined();
  });

  it('should return all plans', async () => {
    const plans = await getAllPlansService.execute();

    expect(plans).toBeTruthy();
    expect(plans.length).toBeTruthy();
  });
});
