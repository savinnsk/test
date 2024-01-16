import { Test, TestingModule } from '@nestjs/testing';

import { PlansRepository } from '@app/plans/repositories/plans.repository';
import { InMemoryPlansRepository } from '@infra/database/in-memory/repositories/plans.repository';
import { planMock } from '@common/mocks/plan.mock';
import { PlanCreatedDto } from '@domain/dtos/plan/plan-created.dto';
import { UpdatePlanService } from './update-plan.service';

describe('Update plan service', () => {
  let updatePlanService: UpdatePlanService;
  let plansRepository: PlansRepository;
  let plan: PlanCreatedDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdatePlanService,
        {
          provide: PlansRepository,
          useClass: InMemoryPlansRepository,
        },
      ],
    }).compile();

    updatePlanService = module.get<UpdatePlanService>(UpdatePlanService);

    plansRepository = module.get<PlansRepository>(PlansRepository);

    plan = (await plansRepository.create(planMock)) as any;
  });

  it('should be defined', () => {
    expect(updatePlanService).toBeDefined();
  });

  it('should update a plan by id', async () => {
    const { id } = plan;
    const newName = { name: 'Produto atualizado com sucesso' };

    const planUpdated = await updatePlanService.execute(newName, id);

    expect(planUpdated).toBeTruthy();
    expect(planUpdated.name).toEqual(newName.name);
  });

  it('should be able to return bad request exception when plan cant be updated', async () => {
    jest.spyOn(plansRepository, 'update');
    try {
      await updatePlanService.execute({ name: 'Teste' }, '1234');
    } catch (error) {
      expect(error.status).toEqual(401);
    }
  });
});
