<template>  
    <div class="text-4xl w-full bg-gray-200 pr-4 p-2 mb-4 text-right rounded text-gray-800 font-bold">
        {{displayValue}}
    </div>
</template>

<script setup>

const props = defineProps({
    displayValue : {
        type: String,
        default: "0"
    }
})

</script>