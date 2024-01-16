import { Test, TestingModule } from '@nestjs/testing';

import { PlansRepository } from '@app/plans/repositories/plans.repository';
import { InMemoryPlansRepository } from '@infra/database/in-memory/repositories/plans.repository';
import { FindPlanService } from './find-plan.service';
import { planMock } from '@common/mocks/plan.mock';
import { PlanCreatedDto } from '@domain/dtos/plan/plan-created.dto';

describe('Find plan service', () => {
  let findPlanService: FindPlanService;
  let plansRepository: PlansRepository;
  let plan: PlanCreatedDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindPlanService,
        {
          provide: PlansRepository,
          useClass: InMemoryPlansRepository,
        },
      ],
    }).compile();

    findPlanService = module.get<FindPlanService>(FindPlanService);

    plansRepository = module.get<PlansRepository>(PlansRepository);

    plan = (await plansRepository.create(planMock)) as any;
  });

  it('should be defined', () => {
    expect(findPlanService).toBeDefined();
  });

  it('should found an plan by id', async () => {
    const { id } = plan;

    const planFound = await findPlanService.execute(id);

    expect(planFound).toBeTruthy();
    expect(planFound.name).toEqual(planMock.name);
  });

  it('should be able to return not found exception when plan dont exists', async () => {
    jest.spyOn(plansRepository, 'find');
    try {
      await findPlanService.execute('1234');
    } catch (error) {
      expect(error.status).toEqual(404);
    }
  });
});
