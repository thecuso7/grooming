import jwt from 'jsonwebtoken'

export const JwtService = {
	create(user) {
		// const runtimeConfig = useRuntimeConfig();

		const token = jwt.sign(
			{ uid: user.id, role: user.role },
			process.env.NUXT_JWT_ACCESS_SECRET,
			{ expiresIn: '0.5h' }
		)
	
		const refresh = jwt.sign(
			{ uid: user.id, role: user.role },
			process.env.NUXT_JWT_REFRESH_SECRET,
			{ expiresIn: process.env.NUXT_JWT_REFRESH_LIFE }
		)
		return { token, refresh };
	},
	refresh(token) {
		let newToken, newRefresh, payload;

		try {
			payload = this.verifyRefresh(token);
			({ token: newToken, refresh: newRefresh } = this.create({id: payload.uid, role: payload.role }));

		} catch(err) {
			throw err;
		}

		return { newToken, newRefresh, payload };
	},
	verifyAccess(token) {
		const decoded = jwt.verify(token, process.env.NUXT_JWT_ACCESS_SECRET);

		return decoded;
	},
	verifyRefresh(token) {
		// const runtimeConfig = useRuntimeConfig();
		const decoded = jwt.verify(token, process.env.NUXT_JWT_REFRESH_SECRET);

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