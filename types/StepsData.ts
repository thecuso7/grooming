import { type ServiceStep } from "./ServiceStep";
import { type Client } from "./Client";
import { type Choose } from "./Choose";

export interface StepsData {
    choose: Choose | null,
    service: ServiceStep | null,
    client: Client | null
}