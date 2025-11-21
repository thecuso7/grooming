import { type Pet } from "~/types/Pet";
import { type Service } from "~/types/Service";
import { type TypeService } from "~/types/TypeService";

interface PetResponse {
    list: Pet[]
}

export const useAppointmentApi = () => {
    const { $api } = useNuxtApp();

    const getMyPetIds = async () => {
        const { pets } = await $api('/api/users/me');

        return pets;
	}

    const getPets = async (ids: []): Promise<Pet[]> => {
        if(ids.length) {
            const { list } = await $api<PetResponse>(`/api/pets?id=${ids}`);
            return list;
        }
        
        return [];
    }

    const getTypeServices = async (): Promise<TypeService[]> => {
        return await $api('/api/common/types');
    }

    const getServiceList = async (): Promise<Service[]> => {
        const { list } = await $api(`/api/services`);
        return list;
    }

	return {
        getMyPetIds,
        getTypeServices,
        getPets,
        getServiceList
    };
}