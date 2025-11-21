import { type Pet } from "~/types/Pet";
import { type Service } from "~/types/Service";
import { type GroupedServices } from "~/types/Service";
import { useAppointmentApi } from "./useAppointmentApi";
import { type TypeService } from "~/types/TypeService";
import { getPartsTime } from '~/utils/formatters';

export const useAppointment = () => {
    const api = useAppointmentApi();

    const petList = ref<Pet[]>([]);
    const typeServiceList = ref<TypeService[]>([]);
    const services = ref<Service[]>([]);
    const reqService = ref<Service | null>(null);

    const loadPets = async () => {
        const ids = await api.getMyPetIds();
        petList.value = await api.getPets(ids);
	}

    const loadServices = async () => {
        const [ types, serviceList ] = await Promise.all([
            api.getTypeServices(),
            api.getServiceList()
        ]);

        typeServiceList.value = types;
        services.value = serviceList;
    }

    const groupedServiceList = computed<GroupedServices>(() => {
        const grouped: GroupedServices = {};

        typeServiceList.value.forEach(type => {
			let group = services.value.map(service => {
				const serviceCopy = {...service};

				if(serviceCopy.required) {
					reqService.value = serviceCopy;
				}

				const [hours, minutes] = getPartsTime(serviceCopy.duration);
				serviceCopy.durationFormatted = hours ? `${hours} час(a) ${minutes} минут` : `${minutes} минут`;

				return serviceCopy;
			}).filter(serviceCopy => {
				if(serviceCopy.required) {
					reqService.value = serviceCopy;
				}

				return serviceCopy.type?.code == type.code;
			});
			grouped[type.code] = group;
		});

        return grouped;
    });

	return {
        petList,
        reqService,
        typeServiceList,
        groupedServiceList,
        services,
        loadServices,
        loadPets,
    };
}