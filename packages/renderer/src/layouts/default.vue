<template>
  <TitleBar />
  <Navigation />
  <main
    class="maincont mt-7 px-4 py-5 text-center text-gray-700 dark:text-gray-200 bg-deployr-600 w-full lg:pl-64 h-full pb-26 lg:pb-10 overflow-auto"
  >
    <router-view />
  </main>
</template>
