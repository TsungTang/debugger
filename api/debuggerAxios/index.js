import _axios from "axios"


const axiosAPI = () => {
  const instance = _axios.create({
    baseURL: "/",
    timeout: 6000,
  });

  return instance;
}

export default axiosAPI()
