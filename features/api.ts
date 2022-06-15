import axios, { HeadersDefaults } from "axios";

let baseURL = "https://web.test.datamall.ai/";

export interface CommonHeaderProperties extends HeadersDefaults {
  Authorization: string;
}

const token =
  process.browser && localStorage != undefined
    ? localStorage.getItem("token")
    : "";

export const api = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: token !== null ? "token " + token : "",
    "Content-Type": "application/json",
    accept: "*/*",
  },
});
