import jwt from 'jsonwebtoken'

// зделать проверку при авторизации и сделать разлогин.
// Добавить админку
// начать делать вывод статей через ssr

export const JwtService = {
	create(user) {
		const runtimeConfig = useRuntimeConfig();

		const token = jwt.sign(
			{ uid: user.id, role: user.role },
			runtimeConfig.jwtAccessSecret,
			{ expiresIn: runtimeConfig.jwtAccessLife }
		)
	
		const refresh = jwt.sign(
			{ uid: user.id, role: user.role },
			runtimeConfig.jwtRefreshSecret,
			{ expiresIn: runtimeConfig.jwtRefreshLife }
		)
		return { token, refresh };
	},
	refresh(token) {
		let newToken, newRefresh;

		try {
			const payload = this.verifyRefresh(token);
			({ token: newToken, refresh: newRefresh } = this.create({id: payload.uid, role: payload.role }));

		} catch(err) {
			throw err;
		}

		return { newToken, newRefresh };
	},
	verifyAccess(token) {
		const runtimeConfig = useRuntimeConfig();
		const decoded = jwt.verify(token, runtimeConfig.jwtAccessSecret);

		return decoded;
	},
	verifyRefresh(token) {
		const runtimeConfig = useRuntimeConfig();
		const decoded = jwt.verify(token, runtimeConfig.jwtRefreshSecret);

		return decoded;
	},
	async clear() {
		deleteCookie(event, 'accessToken', {
			path: '/',
		});

		deleteCookie(event, 'refreshToken', {
			path: '/',
		});
	},
};