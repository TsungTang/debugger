import _axios from "axios"


const axiosAPI = () => {
  const instance = _axios.create({
    baseURL: "http://125.228.70.130/",
    timeout: 6000,
  });

  return instance;
}

export default axiosAPI()
