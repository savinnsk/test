"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_plan_service_1 = require("./create-plan/create-plan.service");
const get_all_plans_service_1 = require("./get-all-plans/get-all-plans.service");
const find_plan_service_1 = require("./find-plan/find-plan.service");
const update_plan_service_1 = require("./update-plan/update-plan.service");
exports.default = [
    create_plan_service_1.CreatePlanService,
    get_all_plans_service_1.GetAllPlansService,
    find_plan_service_1.FindPlanService,
    update_plan_service_1.UpdatePlanService,
];
//# sourceMappingURL=index.js.map