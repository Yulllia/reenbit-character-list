import { atom } from "recoil";

export const filterListState = atom({
  key: "filterListState",
  default: localStorage.getItem("searchWord") || "",
});

export const loginState = atom({
  key: "loginState",
  default: localStorage.getItem("loginData")
    ? JSON.parse(localStorage.getItem("loginData") as string)
    : null,
});
