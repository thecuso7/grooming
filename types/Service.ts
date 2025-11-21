import { type TypeService } from "./TypeService";

export interface Service {
    _id: string,
    id: string,
    title: string,
    description: string,
    duration: number,
    durationFormatted?: string,
    price: number,
    complex?: boolean,
    type: TypeService,
    hours: number,
    minutes: number,
    required: false,
    bundle: []
}

export interface GroupedServices {
    [index: string]: Service[]
}