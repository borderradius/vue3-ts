<template>
  <div>테스트컴포넌트안에서 뿌린 state : {{ commonData }}</div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import store from "@/store/index";

export default defineComponent({
  setup() {
    const commonData = computed(() => {
      return store.getters.getCommonData;
    });
    return { commonData };
  }
});
</script>

<style scoped></style>
