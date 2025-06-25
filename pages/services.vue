<template>
    <div>
        <h1>Услуги</h1>
        <!-- <img src="~/assets/img/rabbit.jpg" alt=""> -->
        <!-- Делаем детальную и разводящую услуг, их переделываем в серверный рендеринг -->
        <card-list></card-list>
    </div>
</template>

<script setup>
    const appConfig = useAppConfig()
    console.log(appConfig);
</script>