<template>
    <div>
        <section class="tw-relative tw-py-10 lg:tw-py-20">
            <div class="tw-container tw-mx-auto tw-text-center">
                <h1 class="tw-font-heading tw-text-3xl md:tw-text-4xl lg:tw-text-6xl tw-font-bold tw-mb-6">
                    Профессиональный <span class="tw-text-custom-green">груминг</span><br>для вашего питомца
                </h1>
                <p class="tw-text-xl tw-text-custom-gray tw-max-w-2xl tw-mx-auto tw-mb-8">
                    Забота о красоте и здоровье вашей собаки с любовью и профессионализмом
                </p>
                <div class="tw-flex tw-gap-4 tw-justify-center">
                    <!-- <a href="#services" class="tw-bg-custom-accent tw-text-white tw-px-8 tw-py-3 tw-rounded-lg hover:tw-bg-opacity-90">
                        Наши услуги
                    </a> -->
                    <RouterLink class="tw-border tw-border-custom-accent tw-text-custom-accent tw-px-8 tw-py-3 tw-rounded-lg hover:tw-bg-custom-accent hover:tw-text-white" to="/appointment">Запись онлайн</RouterLink>
                </div>
            </div>
        </section>

        <!-- Услуги -->
        <section id="services" class="tw-py-16 tw-bg-custom-card">
            <div class="tw-container tw-mx-auto">
                <h2 class="tw-font-heading tw-text-2xl tw-text-center tw-font-bold tw-mb-8">Наши услуги</h2>
                <div class="tw-grid md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-6">
                    <!-- Карточка услуги 1 -->
                    <div class="tw-bg-white tw-rounded-xl tw-p-6 tw-shadow-lg">
                        <div class="tw-w-12 tw-h-12 tw-bg-custom-green tw-rounded-full tw-flex tw-items-center tw-justify-center tw-mb-4">
                            <span class="tw-text-white tw-font-bold">1</span>
                        </div>
                        <h3 class="tw-font-heading tw-text-xl tw-font-semibold tw-mb-3">Комплексный груминг</h3>
                        <p class="tw-text-custom-gray tw-mb-4">Мытье, сушка, стрижка, обработка когтей и чистка ушей</p>
                        <span class="tw-text-custom-green tw-font-heading tw-font-bold tw-text-xl">от 1500₽</span>
                    </div>

                    <!-- Карточка услуги 2 -->
                    <div class="tw-bg-white tw-rounded-xl tw-p-6 tw-shadow-lg">
                        <div class="tw-w-12 tw-h-12 tw-bg-custom-accent tw-rounded-full tw-flex tw-items-center tw-justify-center tw-mb-4">
                            <span class="tw-text-white tw-font-bold">2</span>
                        </div>
                        <h3 class="tw-font-heading tw-text-xl tw-font-semibold tw-mb-3">Гигиенический уход</h3>
                        <p class="tw-text-custom-gray tw-mb-4">Чистка ушей, зубов, стрижка когтей и обработка глаз</p>
                        <span class="tw-text-custom-green tw-font-heading tw-font-bold tw-text-xl">от 800₽</span>
                    </div>

                    <!-- Карточка услуги 3 -->
                    <div class="tw-bg-white tw-rounded-xl tw-p-6 tw-shadow-lg">
                        <div class="tw-w-12 tw-h-12 tw-bg-custom-green tw-rounded-full tw-flex tw-items-center tw-justify-center tw-mb-4">
                            <span class="tw-text-white tw-font-bold">3</span>
                        </div>
                        <h3 class="tw-font-heading tw-text-xl tw-font-semibold tw-mb-3">Экспресс-линька</h3>
                        <p class="tw-text-custom-gray tw-mb-4">Удаление отмершей шерсти и подшерстка</p>
                        <span class="tw-text-custom-green tw-font-heading tw-font-bold tw-text-xl">от 1200₽</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- О нас -->
        <section class="tw-py-16">
            <div class="tw-container tw-mx-auto">
                <div class="tw-grid lg:tw-grid-cols-2 tw-gap-12 tw-items-center">
                    <div>
                        <h2 class="tw-font-heading tw-text-2xl tw-font-bold tw-mb-6">Почему выбирают нас?</h2>
                        <div class="tw-space-y-4">
                            <div class="tw-flex tw-items-start tw-gap-4">
                                <div class="tw-w-8 tw-h-8 tw-bg-custom-accent tw-rounded-full tw-flex tw-items-center tw-justify-center tw-flex-shrink-0">
                                    <span class="tw-text-white">✓</span>
                                </div>
                                <div>
                                    <h4 class="tw-font-heading tw-font-semibold">Опытные мастера</h4>
                                    <p class="tw-text-custom-gray">Профессионалы с многолетним опытом работы</p>
                                </div>
                            </div>
                            <div class="tw-flex tw-items-start tw-gap-4">
                                <div class="tw-w-8 tw-h-8 tw-bg-custom-accent tw-rounded-full tw-flex tw-items-center tw-justify-center tw-flex-shrink-0">
                                    <span class="tw-text-white">✓</span>
                                </div>
                                <div>
                                    <h4 class="tw-font-heading tw-font-semibold">Натуральная косметика</h4>
                                    <p class="tw-text-custom-gray">Используем только безопасные средства</p>
                                </div>
                            </div>
                            <div class="tw-flex tw-items-start tw-gap-4">
                                <div class="tw-w-8 tw-h-8 tw-bg-custom-accent tw-rounded-full tw-flex tw-items-center tw-justify-center tw-flex-shrink-0">
                                    <span class="tw-text-white">✓</span>
                                </div>
                                <div>
                                    <h4 class="tw-font-heading tw-font-semibold">Индивидуальный подход</h4>
                                    <p class="tw-text-custom-gray">Учитываем особенности каждой породы</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tw-bg-custom-purple tw-rounded-2xl tw-p-8">
                        <img src="/public/uploads/main.jpg" alt="Груминг салон" class="tw-rounded-xl tw-shadow-lg">
                    </div>
                </div>
            </div>
        </section>

        <!-- Блок с отзывами -->
        <section class="tw-py-16 tw-bg-custom-card">
            <div class="tw-container tw-mx-auto">
                <h2 class="tw-font-heading tw-text-2xl tw-text-center tw-font-bold tw-mb-8">Что говорят хозяева</h2>
                <div class="tw-grid md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-6">
                    <div class="tw-bg-white tw-rounded-xl tw-p-6 tw-shadow-lg">
                        <div class="tw-flex tw-items-center tw-gap-3 tw-mb-4">
                            <div class="tw-w-12 tw-h-12 tw-bg-custom-accent tw-rounded-full"></div>
                            <div>
                                <h4 class="tw-font-heading tw-font-semibold">Мария Иванова</h4>
                                <p class="tw-text-sm tw-text-custom-gray">Владелец золотистого ретривера</p>
                            </div>
                        </div>
                        <p class="tw-text-custom-gray tw-italic">"Отличный сервис! Мой Грейси выглядит потрясающе после груминга. Очень внимательные мастера!"</p>
                        <div class="tw-flex tw-gap-1 tw-mt-3">
                            ★★★★★
                        </div>
                    </div>
                    <div class="tw-bg-white tw-rounded-xl tw-p-6 tw-shadow-lg">
                        <div class="tw-flex tw-items-center tw-gap-3 tw-mb-4">
                            <div class="tw-w-12 tw-h-12 tw-bg-custom-green tw-rounded-full"></div>
                            <div>
                                <h4 class="tw-font-heading tw-font-semibold">Алексей Петров</h4>
                                <p class="tw-text-sm tw-text-custom-gray">Владелец шпица</p>
                            </div>
                        </div>
                        <p class="tw-text-custom-gray tw-italic">"Профессионалы своего дела! Учитывают все пожелания. Буду рекомендовать всем знакомым!"</p>
                        <div class="tw-flex tw-gap-1 tw-mt-3">
                            ★★★★★
                        </div>
                    </div>
                    <div class="tw-bg-white tw-rounded-xl tw-p-6 tw-shadow-lg">
                        <div class="tw-flex tw-items-center tw-gap-3 tw-mb-4">
                            <div class="tw-w-12 tw-h-12 tw-bg-custom-accent tw-rounded-full"></div>
                            <div>
                                <h4 class="tw-font-heading tw-font-semibold">Елена Смирнова</h4>
                                <p class="tw-text-sm tw-text-custom-gray">Владелец таксы</p>
                            </div>
                        </div>
                        <p class="tw-text-custom-gray tw-italic">"Чистота, уют и любовь к животным! Мой Барсик всегда в восторге от посещения салона."</p>
                        <div class="tw-flex tw-gap-1 tw-mt-3">
                            ★★★★★
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
</script>