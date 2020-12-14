import { useRouter } from "vue-router";

export default function goDetail(id) {
  console.log(useRouter);
  const router = useRouter();
  router.push({ path: `/about/${id}` });
}
