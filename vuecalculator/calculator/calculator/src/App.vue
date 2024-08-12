<template>
  <main>
    <div class="flex justify-center items-center h-screen bg-gray-500 cursor-pointer" >

      <div>

        <div
          class="p-4 transition-transform ease-out duration-300"
          :style="{ transform: `translateX(${position}px)` }"
          @mousedown="startDrag" @drag ="onDrag" @dragend="stopDrag"
          >
          <HomePage :class="'mr-[distance]'" />
        </div>
        

      </div>
    </div>

  </main>
</template>

<script setup>
import { ref } from 'vue';
import HomePage from './components/HomePage.vue';

// Define reactive state
const position = ref(0);
const isDragging = ref(false);
const startX = ref(0);

const startDrag = (event) => {
  isDragging.value = true;
  startX.value = event.clientX - position.value;

};


const onDrag = (event) => {
  if(isDragging.value) position.value = (event.clientX - startX.value);
};

const stopDrag = () => {
  isDragging.value = false;
};

</script>

