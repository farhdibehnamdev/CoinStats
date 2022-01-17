import { create } from "apisauce";
import { baseURL } from "./constatnts";
import { message } from "antd";
const headers = {
  "Accept-Language": "en",
  "Content-Type": "application/json; charset=utf-8; v=1.0",
};

export const api = create({
  baseURL,
  headers,
});

api.addResponseTransform((response) => {
  switch (response.status) {
    case 400:
      message.error(response.data.message);
      break;
    case 401:
      break;
    case 403:
      break;
    case 500:
      break;
    case 404:
      break;
    default:
  }

  if (response.status === 200) {
    return response;
  } else {
    throw response;
  }
});

export async function getRequest(endpointUrl) {
  return api.get(endpointUrl);
}
