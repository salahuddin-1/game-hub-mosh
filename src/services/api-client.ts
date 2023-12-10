import axios from "axios";

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "a0f9f88f8a0c43ffb5feacf19f3419c3",
  },
});
