export const useFileUpload = () => {
    const fileLink = ref<string | null>();
    
    //Как-то передать data
    const onFileSelected = (event: Event) => {
		const file = (event.target as HTMLInputElement).files?.[0];
		if (!file) return;
		
		const reader = new FileReader();
		
		reader.onload = (e) => {
			fileLink.value = e.target?.result as string | null;
		}
		
		reader.onerror = () => {
			fileLink.value = null;
		}
		
		reader.readAsDataURL(file);
	}

	return {
        fileLink,
        onFileSelected,
    };
}