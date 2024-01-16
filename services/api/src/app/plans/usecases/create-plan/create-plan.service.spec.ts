import { Test, TestingModule } from '@nestjs/testing';

import { PlansRepository } from '@app/plans/repositories/plans.repository';
import { InMemoryPlansRepository } from '@infra/database/in-memory/repositories/plans.repository';
import { CreatePlanService } from './create-plan.service';
import { planMock } from '@common/mocks/plan.mock';

describe('Create plan service', () => {
  let createPlanService: CreatePlanService;
  let plansRepository: PlansRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreatePlanService,
        {
          provide: PlansRepository,
          useClass: InMemoryPlansRepository,
        },
      ],
    }).compile();

    plansRepository = module.get<PlansRepository>(PlansRepository);

    createPlanService = module.get<CreatePlanService>(CreatePlanService);
  });

  it('should be defined', () => {
    expect(createPlanService).toBeDefined();
  });

  it('should be able to create a plan', async () => {
    const newPlan = await createPlanService.execute(planMock);

    expect(newPlan.id).toBeTruthy();
    expect(newPlan.name).toEqual('Plano de assinatura');
  });

  it('should return internal server exception when repository fails', async () => {
    jest.spyOn(plansRepository, 'create').mockRejectedValueOnce('Error');
    try {
      await createPlanService.execute(planMock);
    } catch (error) {
      expect(error.status).toEqual(500);
    }
  });
});
