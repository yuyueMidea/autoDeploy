<template>
    <div class="calculation-view">
      <h2>耗时计算界面</h2>
      
      <div v-if="!isCalculating && !result">
        <!-- <button @click="startCalculation">开始计算</button> -->
        <input type="text" v-model="maxCount" placeholder="please input timeCount" />
        <button v-permission="'admin'" class="btn" @click="startCalculation">开始计算(管理员权限)</button>
      </div>
      
      <div v-if="isCalculating">
        <p>计算进度: {{ progress }}%</p>
        <p>计算中... 可以切换到其他界面，计算不会中断</p>
      </div>
      
      <div v-if="result">
        <h3>计算结果: {{ result }}</h3>
        <p>计算完成时间: {{ completionTime }}</p>
      </div>
      
    </div>
  </template>
  
<script setup>
import { ref, onMounted, onUnmounted, onActivated, onDeactivated } from 'vue';
import Worker from '@/calculator.worker.js?worker';
defineOptions({ name: 'calcPage' });



const worker = ref(null);
const isCalculating = ref(false);
const progress = ref(0);
const result = ref(null);
const completionTime = ref(null);

// 初始化 Worker
const initWorker = () => {
  worker.value = new Worker();
  
  worker.value.onmessage = (e) => {
    const { type, progress: prog, result: res } = e.data;
    
    if (type === 'progress') {
      progress.value = prog.toFixed(2);
    } else if (type === 'result') {
      result.value = res.toFixed(4);
      completionTime.value = new Date().toLocaleTimeString();
      isCalculating.value = false;
    }
  };
};

const maxCount = ref(500000000);
// 开始计算
const startCalculation = () => {
  if (!worker.value) initWorker();
  
  isCalculating.value = true;
  progress.value = 0;
  result.value = null;
  
  worker.value.postMessage({
    type: 'start',
    data: { maxIterations: maxCount.value } // 5千万次迭代
  });
};

// 组件卸载时清理 Worker
onUnmounted(() => {
  if (worker.value) {
    worker.value.terminate();
    worker.value = null;
  }
});

// 组件挂载时恢复状态（如果从其他界面返回）
onMounted(() => {
  if (worker.value) {
    // 可以在这里添加恢复状态的逻辑
  }
});

</script>