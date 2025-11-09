import type { H3Event, EventHandlerRequest } from 'h3';
import jwt from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken';
import type { User } from '~/types/user';

interface Payload extends JwtPayload {
	id: string,
	name: string,
	role: string,
	uid: string
}

export const JwtManager = {
	create(user: User): {token: string, refresh: string} {
		const token = jwt.sign(
			{ uid: user.id, role: user.role, name: user.name },
			process.env.NUXT_JWT_ACCESS_SECRET as string,
			{ expiresIn: '0.5h' }
		)
	
		const refresh = jwt.sign(
			{ uid: user.id, role: user.role, name: user.name },
			process.env.NUXT_JWT_REFRESH_SECRET as string,
			{ expiresIn: '30d' }
		)
		return { token, refresh };
	},
	refresh(token: string): {newToken: string, newRefresh: string, payload: Payload} {
		let newToken, newRefresh, payload;

		try {
			payload = this.verifyRefresh(token);
			({ token: newToken, refresh: newRefresh } = this.create({id: payload.uid, role: payload.role, name: payload.name }));

		} catch(err) {
			throw err;
		}

		return { newToken, newRefresh, payload };
	},
	verifyAccess(token: string): Payload {
		const decoded = jwt.verify(token, process.env.NUXT_JWT_ACCESS_SECRET as string);

		if (typeof decoded === 'string') {
			throw new Error('Invalid token payload: expected object, got string');
		}

		return decoded as Payload;
	},
	verifyRefresh(token: string): Payload {
		const decoded = jwt.verify(token, process.env.NUXT_JWT_REFRESH_SECRET as string);

		if (typeof decoded === 'string') {
			throw new Error('Invalid token payload: expected object, got string');
		}

		return decoded as Payload;
	},
	async clear(event: H3Event<EventHandlerRequest>) {
		deleteCookie(event, 'refreshToken', {
			path: '/api/auth/refresh',
		});
	},
};