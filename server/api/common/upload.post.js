import { ServiceManager } from "~/server/managers/serviceManager";

export default defineEventHandler(async (event) => {
	try {
		const parts = await readMultipartFormData(event);

		console.log('parts', parts);
		
		if (!parts) {
			throw createError({ statusCode: 400, message: 'No file provided' });
		}

		const filePart = parts.find(part => part.name === 'file');
		if (!filePart || !filePart.filename) {
			throw createError({
				statusCode: 400,
				data: {
					code: 'INTERNAL_ERROR',
					message: 'Внутренняя ошибка сервера!'
				}
			});
		}

		// Генерируем уникальное имя файла
		const timestamp = Date.now();
		const extension = filePart.filename.split('.').pop();
		const filename = `${timestamp}.${extension}`;

		// Путь для сохранения (в папке public)
		const filePath = `public/uploads/${filename}`;

		// Сохраняем файл
		await writeFile(filePath, filePart.data);

		// Возвращаем URL
		return {
			url: `/uploads/${filename}`,
			filename: filePart.filename,
			size: filePart.data.length
		}

	} catch (error) {
		throw createError({
			statusCode: 500,
			data: {
				code: 'INTERNAL_ERROR',
				message: 'Внутренняя ошибка сервера!'
			}
		});
	}
});