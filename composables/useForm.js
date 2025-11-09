export const useForm = () => {
	const isAuthenticated = useState('isAuthenticated', () => false);

	const checkAuth = async () => {
		const token = useCookie('auth')
	}
}