<template>
  <div class="home">
    <h1>{{ title }}</h1>
    <Test />
    <p>titleLength: {{ titleLength }}</p>
    <button @click="updateTitle('changed title')">update title</button>
    <p>getCommonData: {{ commonData }}</p>
    <button @click="goActions">increase common data</button>
    <table>
      <thead>
        <tr>
          <th>no</th>
          <th>name</th>
          <th>tel</th>
          <th>address</th>
          <th>photo</th>
        </tr>
      </thead>
      <div v-if="error">
        {{ error }}
      </div>
      <Suspense>
        <template #default>
          <tbody v-if="!getLists.length">
            <tr>
              <td>데이터가 없습니다.</td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr v-for="item in getLists" :key="item.no">
              <td>{{ item.no }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.tel }}</td>
              <td>{{ item.address }}</td>
              <td>{{ item.photo }}</td>
            </tr>
          </tbody>
        </template>
        <template #fallback>
          <tbody>
            <tr>
              <td>LOADING...</td>
            </tr>
          </tbody>
        </template>
      </Suspense>
    </table>
    <button @click="setLists">리스트 api 통신 actions</button>
    <button @click="decreaseLength">decrease length</button>
    <button @click="setCovid">Covid list get</button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, onErrorCaptured } from "vue";
// import useSearch from "@/use/search";
import store from "@/store/index";
import Test from "@/components/Test.vue";
import { mapGetters } from "vuex";

import { CERT_KEY } from "@/static/const";

export default defineComponent({
  components: {
    Test
  },
  setup() {
    const error = ref(0);
    const title = ref("Vue 3 + TS + Vuex + Vue Router");
    const count = ref(0);
    const lists = ref([]);
    const titleLength = computed(() => title.value.length);
    const updateTitle = newValue => {
      title.value = newValue;
    };
    const commonData = computed(() => {
      return store.getters.getCommonData;
    });

    // watchEffect(() => {
    //   console.log(title.value);
    // });

    // setTimeout(() => {
    //   title.value = "1111111";
    // }, 2000);

    const decreaseLength = () => {
      lists.value.length--;
    };

    // const fetchCommonData = () => {
    //   axios
    //     .get("http://sample.bmaster.kro.kr/contacts", {
    //       params: {
    //         pageno: 1,
    //         pagesize: 10
    //       }
    //     })
    //     // .get(
    //     //   `http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson`,
    //     //   {
    //     //     params: {
    //     //       serviceKey: encodeURIComponent(CERT_KEY),
    //     //       pageNo: 1,
    //     //       numOfRows: 10,
    //     //       startCreateDt: 20201111,
    //     //       endCreateDt: 20201201
    //     //     }
    //     //   }
    //     // )
    //     .then(({ data }) => {
    //       // console.warn("공공데이터 호출 완료:", data);
    //       lists.value = data.contacts;
    //     });
    // };

    const goActions = function() {
      store.dispatch("setCommonData", count.value++);
    };

    const setLists = function() {
      store.dispatch("setLists", {
        pageno: 1,
        pagesize: 100
      });
    };

    onErrorCaptured(e => {
      // console.warn(e);
      error.value = e;
      return true;
    });
    const setCovid = function() {
      store.dispatch("setCovid", {
        serviceKey: encodeURIComponent(CERT_KEY),
        pageNo: 1,
        numOfRows: 10,
        startCreateDt: 20201111,
        endCreateDt: 20201201
      });
    };

    // console.log(e);
    // error.value = e;

    return {
      error,
      title,
      titleLength,
      updateTitle,
      lists,
      decreaseLength,
      commonData,
      goActions,
      setLists,
      setCovid
    };
  },
  computed: {
    ...mapGetters(["getLists"])
  }
});
</script>

<style scoped lang="scss">
.home {
  h1 {
    color: purple;
  }
}
</style>
