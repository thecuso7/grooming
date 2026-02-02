import type { ApolloError } from "@apollo/client/errors";

interface UseErrorOptions {
  type?: string;
}

export const useErrorHandler = (options: UseErrorOptions = {}) => {
    const errorStore = useErrorStore();
    
    const handleError = (error: ApolloError, type: String | undefined = undefined) => {
        errorStore.setGlobalErrors('Ошибка на сайте. Уже исправляем');

        console.error('Query error:', error);
        if (error.graphQLErrors) {
                error.graphQLErrors.forEach((err) => {
                console.error('GraphQL Error:', err.message);
            })
        }
        
        if (error.networkError) {
            console.error('Network Error:', error.networkError);
        }
    };

	return {
        handleError
    };
}