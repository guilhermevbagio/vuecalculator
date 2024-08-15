import { defineStore } from 'pinia'
import {ref} from 'vue'

export const useStore = defineStore('history', () => {
    const history = ref('')
    function addOperation(arg) {
      history.value += arg;
      console.log(arg)
    }
    function removeOperation(){
        if(history.value.endsWith("\n")) return;
        history.value = history.value.slice(0, -1)
    }
  
    return { history, addOperation, removeOperation }
  })