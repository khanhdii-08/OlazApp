import { httpRequest } from "./../utils/httpRequest";

const meApi = {
  fetchProfile: () => {
    return httpRequest.get(`/m/profile`);
  },
};

export default meApi;
