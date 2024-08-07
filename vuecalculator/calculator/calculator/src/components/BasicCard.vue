<template>
    <div class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-900 dark:border-gray-700">
        <Display :displayValue="displayValue"></Display>


        <div class="flex space-x-5">
            <!-- Numeric keypad -->
            <div class="grid grid-cols-3 gap-1 gap-x-5 flex-grow">
                <div v-for="i in 9" :key="i">
                    <button @click="onNumberClicked(i.toString())"> 
                        <GenericButton :text="i.toString()"/> 
                    </button>
                </div>
                <button @click="onNumberClicked('.')"> 
                    <GenericButton text="." /> 
                </button>
                <button @click="onNumberClicked(0)"> 
                    <GenericButton text="0" /> 
                </button>
                <button @click="clear()"> 
                    <GenericButton text="C" color="bg-red-500"/> 
                </button>
            </div>

            <!-- Operations -->
            <div class="flex flex-col justify-between space-y-1">
                <button @click="removeNumber()"> <GenericButton text="<-" color="bg-red-500" /> </button>
                <button @click="sumButton()"> <GenericButton text="+" color="bg-red-500"/> </button>
                <button @click="subButton()"> <GenericButton text="-" color="bg-red-500"/> </button>
                <button @click="equals()"> <GenericButton text="=" color="bg-red-500"/> </button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import Display from './Display.vue';
    import GenericButton from './GenericButton.vue';
    import { ref } from 'vue';

    let displayValue = ref("0");

    var props = defineProps({

    }) 

    function onNumberClicked(arg) {
        if(displayValue.value === "0") {
            displayValue.value = arg;
            return;
        }
        displayValue.value = displayValue.value + arg;

    }

    function removeNumber(){

        if(displayValue.value.length === 1) {
            displayValue.value = "0";
            return;
        }

        displayValue.value = displayValue.value.slice(0, -1);
    }

    let valueCache = 0;
    let operationFlag = 0;

    function cacheValue(arg){
        valueCache = arg;
    }

    function clear(){
        displayValue.value = "0";
    }
    function clearCache(){
        valueCache = 0;
        operationFlag = 0;
    }

    function sumButton(){
        cacheValue(parseFloat( displayValue.value) + parseFloat(valueCache));
        operationFlag = 1;
        clear();
    }
    function subButton(){
        if(valueCache === 0){
            valueCache = parseFloat(displayValue.value);
        }
        else cacheValue(parseFloat(valueCache) - parseFloat( displayValue.value));
        operationFlag = 2;
        clear();
    }

    function sum(a, b){
        return a + b;
    }
    function sub(a, b){
        return a - b;
    }

    function equals(){
        switch(operationFlag){
            case 1:
                displayValue.value = sum(valueCache, parseFloat(displayValue.value)).toString();
                clearCache();
                break;
            case 2:
                displayValue.value = sub(valueCache, parseFloat(displayValue.value)).toString();
                clearCache();
                break;
            default:
                break;
        }
    }

</script>