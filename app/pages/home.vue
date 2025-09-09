<template>
  <main class="layout" :style="{ backgroundColor: theme.color }">
    <aside class="sidebar">
      <nav class="nav">
        <NuxtLink to="/">
          <img class="icon" :src="homeIcon" alt="home" />
        </NuxtLink>
        <NuxtLink to="/about">
          <img class="icon" :src="aboutIcon" alt="" />
        </NuxtLink>
        <NuxtLink to="/posts">Posts</NuxtLink>
        <NuxtLink to="/projects">Projects</NuxtLink>
      </nav>
    </aside>
    <section class="content">
      <NuxtPage />
    </section>
  </main>
</template>
<script setup>
import { theme } from "~/composables/theme";
import { homeIcon, aboutIcon } from "~/assets/icon/svg";
</script>
<style lang="css" scoped>
.layout {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .sidebar {
    width: 20vw;
    height: 100vh;
    background-color: #f6f1ed;
    position: fixed;
  }
  .content {
    width: 80vw;
    height: 100vh;
    background-color: #f6f1ed;
  }
}
.nav {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.icon {
  width: 20px;
  height: 20px;
  vertical-align: middle;
}
</style>
