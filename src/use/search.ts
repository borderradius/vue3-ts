import axios from "axios";

export default function useSearch({ url, params }) {
  console.log(url, params);
  // console.log(`useSearch() from @reuse/search - param : ${param}`);
  return axios.get(url, params);
}
