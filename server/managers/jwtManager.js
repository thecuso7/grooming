import jwt from 'jsonwebtoken'

export const JwtManager = {
	create(user) {
		const token = jwt.sign(
			{ uid: user.id, role: user.role, name: user.name },
			process.env.NUXT_JWT_ACCESS_SECRET,
			{ expiresIn: '0.5h' }
		)
	
		const refresh = jwt.sign(
			{ uid: user.id, role: user.role, name: user.name },
			process.env.NUXT_JWT_REFRESH_SECRET,
			{ expiresIn: process.env.NUXT_JWT_REFRESH_LIFE }
		)
		return { token, refresh };
	},
	refresh(token) {
		let newToken, newRefresh, payload;

		try {
			payload = this.verifyRefresh(token);
			({ token: newToken, refresh: newRefresh } = this.create({id: payload.uid, role: payload.role, name: payload.name }));

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
		const decoded = jwt.verify(token, process.env.NUXT_JWT_REFRESH_SECRET);

		return decoded;
	},
	async clear(event) {
		deleteCookie(event, 'refreshToken', {
			path: '/api/auth/refresh',
		});
	},
};