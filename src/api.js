import axios from "axios";

const Http = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    language: "en-US",
    api_key: "1b869b3ccf57d089047ded4b1de007b8"
  },
  validateStatus: function(status) {
    return status >= 200 && status < 300;
  }
});

export default Http;
