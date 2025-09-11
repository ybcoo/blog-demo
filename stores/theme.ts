// stores/theme.ts
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  // 状态
  state: () => ({
    active:"home",
    theme:{ label: "light", color: "#f6f1ed" },
  }),
   persist: true,
  
  // 计算属性（类似 Vuex 的 getters）
  getters: {
    
  },
  
  // 方法（类似 Vuex 的 actions）
  actions: {
    
  }
})
