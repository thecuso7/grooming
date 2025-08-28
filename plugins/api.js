export default defineEventHandler((event) => {
  let isRefreshing = false;
  let refreshPromise = null;

  const $api = $fetch.create({
    onRequest: ({ request, options, error }) => {
        const token = useCookie('accessToken').value;

        if(token) {
            options.headers.set('Authorization', `Bearer ${token}`);
        }

        // а проверка токена должна быть на стороне серверного middleware
    },
    async onResponseError({ response }) {
        // Запускаем процесс обновления токена. Поскольку плагин объявляется глобально и состояние сохраняется, то нам нужно подождать
        // выполнения обновления и только потом действовать дальше. Поэтому используем промис обновления.
        /**
         * В этом методе к нам приходит объект запроса. И мы можем только модифицировать заголовок. Соответственно если пришел какой-то ответ
         * обновления, то подставляем токен и продолжаем запрос. Если же в процессе, то ждем выполнение промиса. 
         * А если ещё ничего не выполнено, то запускаем процесс с самого начала.
         * 
         * Соответственно тут только логика обработки промиса хранится - передача данных в header, как выше и получение токена из промиса.
         * Сам метод проверки 
         * 
         * 
         */

        if(response.status == 401 && useCookie('refreshToken').value) {
            if(isRefreshing && refreshPromise) {
                const newToken = await $fetch('/api/auth/refresh', {});
            }

        }
    }
  })
})