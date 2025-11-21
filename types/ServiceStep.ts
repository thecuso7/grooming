import { type Service } from "./Service";

export interface ServiceStep {
    selectedIds: string[],
    selected: Service[],
    complex: {
        parts: string[],
        summ: number,
        id: string
    },
    summ: {
        price: number,
        time: number
    }
}