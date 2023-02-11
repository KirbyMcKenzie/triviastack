import axios from "axios";
import { camelizeKeys } from "humps";

const apiClient = axios.create();

apiClient.interceptors.response.use((response) => {
  response.data = camelizeKeys(response.data);

  return response;
});

export default apiClient;
