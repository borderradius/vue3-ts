<template>
  <div>테스트컴포넌트안에서 뿌린 state : {{ getCommonData }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// import store from "@/store/index";
import { mapGetters } from "vuex";

export default defineComponent({
  setup() {
    // const commonData = computed(() => {
    //   return store.getters.getCommonData;
    // });
    // return { commonData };
  },
  computed: {
    ...mapGetters(["getCommonData"])
  }
});
</script>

<style scoped></style>
