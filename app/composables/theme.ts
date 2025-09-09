import { ref } from "vue";

export const theme = ref<any>({ label: "light", color: "#f6f1ed" });
export const changeTheme = () => {
  theme.value.label == "light"
    ? (theme.value = { label: "dark", color: "#1e1e1e" })
    : (theme.value = { label: "light", color: "#f6f1ed" });
};
