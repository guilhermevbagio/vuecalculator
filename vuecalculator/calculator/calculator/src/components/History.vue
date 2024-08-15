<template>
    <div class="text-xl w-[30%] h-[28rem] m-2 p-4 text-left bg-gray-700 rounded text-gray-300 font-bold whitespace-break-spaces">

            {{store.history}} 

    </div>
</template>

<script setup>
    import{ useStore } from "./historyStore.js"
    const store = useStore();

    console.log(store);
</script>