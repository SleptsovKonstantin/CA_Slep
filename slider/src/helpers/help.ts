import axios from "axios";

export const getData = async (api: string) => {
  try {
    let req = await axios.get(api);
    return req.data;
  } catch (error) {
    console.log("Err:", error);
    return [];
  }
};
