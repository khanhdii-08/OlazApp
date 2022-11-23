import { httpRequest } from "./../utils/httpRequest";

const meApi = {
  fetchProfile: () => {
    return httpRequest.get(`/m/profile`);
  },
  updateAvatar: (image: any) => {
    console.log(image);
    return httpRequest.patch("/m/avatar", image);
  },
};

export default meApi;
