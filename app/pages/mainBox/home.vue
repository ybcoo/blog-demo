<template>
  <main class="main">
    <article style="height: 100%;">
      <h2>Yu Bingcao is a passionate coding enthusiast</h2>
      <span style="font-size: 20px; margin-top: 20px; display: inline-block;">Welcome to my personal corner. I’m someone
        who values work-life balance, and I’ll share my life, what I see,
        what I feel, and what I love here.</span>
      <span style="font-size: 20px; margin-top: 20px; display: inline-block;"> This is my second webpage project.</span>
       <div class="scroller-container">
        <!-- 文本列表：v-for 每行都用同一个 class，动态加动画 -->
        <div class="text-list">
          <p 
            v-for="(line, index) in textList" 
            :key="index" 
            class="text-line"
            :class="{ 'scroll-single-line': isScrolling && currentScrollIndex === index }"
          >
            {{ line }}
          </p>
        </div>
      </div>

      <div class="scroll-button" @click="scrollUp">KEEP GOING</div>
    </article>
    <section>

    </section>
  </main>
</template>
<script setup>
const textList = ref([
  "Hello! I'm Yu Bingcao, a passionate coding enthusiast.",
  "I love exploring new technologies and building innovative projects.",
  "In my free time, I enjoy hiking, reading, and playing the guitar.",
  "This is my second webpage project, and I'm excited to share it with you!"
]);
const moreLines = [
  "Built my first website at 12 (using FrontPage)",
  "Contributed to open-source projects since 2010",
  "Favorite programming language: Python (but loves Rust too)",
  "Once optimized a loop to reduce runtime by 90%",
  "Taught myself Assembly to hack old game consoles"
];
const lineHeight = ref(30); 
const isScrolling = ref(false);
let moreIndex = 0;
// 新增：控制“当前哪一行正在滚动”的索引
const currentScrollIndex = ref(-1);

// 核心改：逐行触发动画，而非容器整体动
const scrollUp = async () => {
  if (isScrolling.value) return;
  isScrolling.value = true;

  // 1. 逐行触发动画（从第0行到第3行，依次滚动）
  for (let i = 0; i < textList.value.length; i++) {
    currentScrollIndex.value = i; // 标记当前滚动行
    await new Promise(resolve => setTimeout(resolve, 150)); // 每行间隔150ms，更有节奏感
  }

  // 2. 所有行动画结束后，更新数据（删首行、加新行）
  textList.value.shift();
  textList.value.push(moreLines[moreIndex]);
  moreIndex = (moreIndex + 1) % moreLines.length;

  // 3. 重置状态，准备下一次滚动
  currentScrollIndex.value = -1;
  isScrolling.value = false;
};
</script>
<style lang="scss" scoped>
.main {
  width: 100%;
  max-width: 580px;
}
// 滚动容器：只负责固定高度和隐藏超出，无动画
.scroller-container {
  height: calc(4 * #{30px}); // 固定4行高度
  overflow: hidden;
  margin-top: 20px;
  border-radius: 8px;
  padding: 0 10px;
}

// 文本列表：保持每行垂直排列，不做动画
.text-list {
  margin: 0;
  padding: 0;
}

// 单行文本：基础样式（v-for 共用同一个class）
.text-line {
  height: 30px;
  line-height: 30px;
  margin: 0;
  padding: 2px 0;
  // 关键：给单行加过渡，动画时才动
  transition: all 0.3s ease-out;
  transform: translateY(0); // 初始位置
  opacity: 1; // 初始透明度
  white-space: nowrap;
  overflow: hidden;    /* 隐藏超出容器的文本 */
  text-overflow: ellipsis; /* 超出部分显示省略号 */
  width: 100%;
}

// 单行滚动动画类（v-for 共用这个动画逻辑）
.scroll-single-line {
  // 向上滚动“自身高度”（正好滚出容器）
  transform: translateY(-30px); 
  // 滚动时渐隐，增强层次感
  opacity: 0;
}

// 按钮样式（保留你的原有设置）
.scroll-button {
  border-radius: 8px;
  background-color: gray;
  width: auto;
  display: inline-block;
  padding: 8px 20px;
  color: white;
  cursor: pointer;
  margin-top: 15px;
  transition: transform 0.2s ease;
  &:active {
    transform: scale(0.95);
  }
}
</style>