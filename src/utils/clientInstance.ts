import axios from "axios";

const client = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_CLIENT_URL}/api`,
});
export default client;
