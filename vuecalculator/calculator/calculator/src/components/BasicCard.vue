<template>
    <div class="block p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-900 dark:border-gray-700">
        <Display :displayValue="displayValue"></Display>


        <div class="flex space-x-1 flex-grow">
            <!-- Numeric keypad -->
            <div class="grid grid-cols-3 gap-1 flex-grow">
                <div v-for="i in 9" :key="i">
                    <GenericButton :text="i.toString()" @click="onNumberClicked(i.toString())"/> 
                </div>
                <GenericButton text="."  @click="onNumberClicked('.')"/> 
                <GenericButton text="0" @click="onNumberClicked(0)"/> 
                <GenericButton text="C" color="bg-red-500" @click="clear()"/> 
            </div>

            <!-- Operations -->
            <div class="grid gap-1 grid-rows-4 grid-flow-col-dense">
                <GenericButton text="*" color="bg-orange-500" @click="multiplyButton()"/>
                <GenericButton text="/" color="bg-orange-500" @click="divButton()"/>
                <GenericButton text="+" color="bg-orange-500" @click="sumButton()"/>
                <GenericButton text="-" color="bg-orange-500" @click="subButton()"/>

                <GenericButton text="<-" color="bg-red-500" class="row-span-3" @click="removeNumber()"/>
                <GenericButton text="=" color="bg-green-500" @click="equals()"/>
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

        if(displayValue.value == "0") {
            displayValue.value = arg;
            return;
        }
        if(arg == "."){
            if(displayValue.value.includes(".")) return;
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
        switch(operationFlag){
            case 1: valueCache = sum(valueCache, arg); break;
            case 2: valueCache = sub(valueCache, arg); break;
            case 3: valueCache = multiply(valueCache, arg); break;
            case 4: valueCache = divide(valueCache, arg); break;
            default: valueCache = arg; break;
        }
    }

    function clear(){
        displayValue.value = "0";
    }
    function clearCache(){
        valueCache = 0;
        operationFlag = 0;
    }

    function sumButton(){
        cacheValue(parseFloat( displayValue.value));
        operationFlag = 1;
        clear();
    }
    function subButton(){

        valueCache = parseFloat(displayValue.value);
        
        operationFlag = 2;
        clear();
    }
    function multiplyButton(){
        
        cacheValue(parseFloat( displayValue.value));

        operationFlag = 3;
        clear();
    }
    function divButton(){

        cacheValue(parseFloat( displayValue.value));
        
        operationFlag = 4;
        clear();
    }

    function sum(a, b){
        return a + b;
    }
    function sub(a, b){
        return a - b;
    }
    function multiply(a, b){
        return a * b;
    }
    function divide(a, b){
        return a / b;
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

            case 3:
                displayValue.value = multiply(valueCache, parseFloat(displayValue.value)).toString();
                clearCache();
                break;
            case 4:
                displayValue.value = divide(valueCache, parseFloat(displayValue.value)).toString();
                clearCache();
                break;
            default:
                break;
        }
    }

</script>