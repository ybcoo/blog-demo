<template>
  <main class="layout" :style="{ backgroundColor: themeStore.theme.color }">
    <!-- 1. 小屏幕时显示顶部水平导航 -->
    <div class="top-nav" :style="{ '--hover-bg': hovorColor }">
      <NuxtLink
        class="top-nav-item"
        :style="{ backgroundColor: active === 'home' ? 'white' : '' }"
        @click="changeActive('home')"
        to="/mainBox/home"
      >
        <img class="icon" :src="changeImg(homePic)" alt="home" />
      </NuxtLink>
      <NuxtLink
        class="top-nav-item"
        :style="{ backgroundColor: active === 'about' ? 'white' : '' }"
        @click="changeActive('about')"
        to="/mainBox/about"
      >
        <img class="icon" :src="changeImg(aboutPic)" alt="about" />
      </NuxtLink>
      <NuxtLink
        class="top-nav-item"
        :style="{ backgroundColor: active === 'share' ? 'white' : '' }"
        @click="changeActive('share')"
        to="/mainBox/share"
      >
        <img class="icon" :src="changeImg(sharePic)" alt="share" />
      </NuxtLink>
      <button
        class="top-nav-item theme-btn"
        :disabled="isDisabled"
        @click="toggleThemeWithAnimation"
      >
        <img class="icon" :src="themeImg" alt="theme" />
        <span
          v-if="showRipple"
          class="ripple-effect"
          :style="rippleStyle"
        ></span>
      </button>
    </div>
    <aside class="sidebar">
      <nav class="navContainer">
        <div class="nav" :style="{ '--hover-bg': hovorColor }">
          <NuxtLink
            class="icon-container"
            :style="{ backgroundColor: active === 'home' ? 'white' : '' }"
            @click="changeActive('home')"
            to="/mainBox/home"
          >
            <img class="icon" :src="changeImg(homePic)" alt="home" />
          </NuxtLink>
          <NuxtLink
            class="icon-container"
            :style="{ backgroundColor: active === 'about' ? 'white' : '' }"
            @click="changeActive('about')"
            to="/mainBox/about"
          >
            <img class="icon" :src="changeImg(aboutPic)" alt="about" />
          </NuxtLink>
          <NuxtLink
            class="icon-container"
            :style="{ backgroundColor: active === 'share' ? 'white' : '' }"
            @click="changeActive('share')"
            to="/mainBox/share"
          >
            <img class="icon" :src="changeImg(sharePic)" alt="share" />
          </NuxtLink>
        </div>
        <button
          class="icon-container"
          :disabled="isDisabled"
          @click="toggleThemeWithAnimation"
        >
          <img class="icon" :src="themeImg" alt="theme" />
          <span
            v-if="showRipple"
            class="ripple-effect"
            :style="rippleStyle"
          ></span>
        </button>
      </nav>
    </aside>
    <section class="content">
      <NuxtPage />
    </section>
  </main>
</template>
<script setup>
import { homePic, aboutPic, sharePic, themePic } from "~/composables/theme";
import { useThemeStore } from "~~/stores/theme";
const themeStore = useThemeStore();
const isDisabled = ref(false);
// 涟漪加载效果
const showRipple = ref(false);
const rippleStyle = ref({});
const rippleSize = ref(0);
const toggleThemeWithAnimation = (event) => {
  const button = event.currentTarget;
  const buttonRect = button.getBoundingClientRect();
  isDisabled.value = true;
  // 1. 计算点击点相对于按钮的坐标（不变）
  const xInButton = event.clientX - buttonRect.left;
  const yInButton = event.clientY - buttonRect.top;

  // 2. 计算视口尺寸（包含滚动条宽度，避免边缘遗漏）
  const viewportWidth = document.documentElement.clientWidth;
  const viewportHeight = document.documentElement.clientHeight;

  // 3. 计算最大距离（增加10%冗余，确保覆盖边缘）
  const maxDistance =
    Math.max(
      event.clientX,
      viewportWidth - event.clientX,
      event.clientY,
      viewportHeight - event.clientY
    ) * 1.1; // 关键：加10%冗余，处理边框/滚动条等边缘情况

  // 4. 计算按钮对角线（不变）
  const buttonDiagonal = Math.sqrt(
    buttonRect.width ** 2 + buttonRect.height ** 2
  );

  // 5. 计算缩放倍数（再加5%保险值）
  const scale = ((maxDistance * 2) / buttonDiagonal) * 1.05; // 额外5%确保覆盖

  // 设置涟漪样式
  rippleStyle.value = {
    left: `${xInButton}px`,
    top: `${yInButton}px`,
    width: `${buttonDiagonal}px`,
    height: `${buttonDiagonal}px`,
    marginLeft: `-${buttonDiagonal / 2}px`,
    marginTop: `-${buttonDiagonal / 2}px`,
    "--scale": scale,
    "--backColor":
      themeStore.theme.label == "dark"
        ? "rgba(246, 241, 237, 1)"
        : "rgba(15, 22, 0, 1)",
  };

  showRipple.value = true;
  setTimeout(() => {
    changeTheme();
    showRipple.value = false;
    setTimeout(() => {
      isDisabled.value = false;
    }, 300);
  }, 500);
};
// 主题切换
const active = computed(() => {
  return themeStore.active;
});
const hovorColor = computed(() => {
  return themeStore.theme.label == "dark" ? "#1a2510" : "#f2eae1";
});
const changeActive = (value) => {
  themeStore.active = value;
};
const changeTheme = () => {
  themeStore.theme.label == "light"
    ? (themeStore.theme = { label: "dark", color: "#0f1600" })
    : (themeStore.theme = { label: "light", color: "#f6f1ed" });
};
const themeImg = computed(() => {
  if (themeStore.theme.label == "light") {
    return themePic.value.default_sun;
  } else {
    return themePic.value.default_moon;
  }
});
const changeImg = (img) => {
  if (img.label == active.value) {
    return img.select;
  } else {
    if (themeStore.theme.label == "light") {
      return img.default_sun;
    } else {
      return img.default_moon;
    }
  }
};
</script>
<style lang="scss" scoped>
.top-nav {
  display: none; // 默认隐藏
  position: fixed; // 固定在顶部
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: inherit; // 继承主题背景色
  z-index: 100; // 确保在内容上方
  align-items: center;
  justify-content: center;
  gap: 16px; // 导航项间距
  // 主题切换按钮在顶部导航中的样式
  .theme-btn {
    border: none;
    outline: none;
    padding: 0;
    background: transparent;
    position: relative;
  }
  // 小屏幕显示顶部导航
  @media (max-width: 768px) {
    display: flex;
  }
}

// 顶部导航项样式
.top-nav-item {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  cursor: pointer;
  // transition: background-color 0.2s;

  &:hover {
    background-color: var(--hover-bg);
  }
}
.layout {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: flex-start;
  }
  // transition: background-color 0.3s ease 0.3s;
  .sidebar {
    width: 20%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 768px) {
      display: none;
    }
  }
  .content {
    width: 80%;
    height: 100vh;
    @media (max-width: 768px) {
      width: 100%;
      height: calc(100vh - 60px); // 减去顶部导航高度
      margin-top: 60px;
    }
  }
}
.nav {
  width: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: var(--hover-bg);
  }
  border-radius: 8px;
}
.icon {
  width: 20px;
  height: 20px;
  vertical-align: middle;
}
.icon-container {
  width: 50px;
  height: 50px;
  display: flex;
  border: none; // 去除边框
  outline: none; // 去除聚焦轮廓
  padding: 0; // 清除内边距
  background: transparent; // 背景透明（继承父元素）
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 8px;
  position: relative;
  &:hover {
    cursor: pointer;
  }
}
.ripple-effect {
  position: absolute;
  border-radius: 50%;
  background-color: var(--backColor);
  transform: scale(0);
  animation: ripple 0.6s linear;
  pointer-events: none;
}
@keyframes ripple {
  to {
    transform: scale(var(--scale));
    opacity: 1;
  }
}
</style>
