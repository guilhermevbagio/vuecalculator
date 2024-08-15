<template>
    <button class="w-20 h-20 rounded-xl shadow-lg text-white font-bold hover:bg-blue-400" :class="color">
            {{text}}
    </button>
</template>

<script setup>



 const props = defineProps({
    color : {
        type: String,
        default: "bg-blue-500"
    },
    text : {
        type: String,
        default: "Button"
    }
 })

</script>