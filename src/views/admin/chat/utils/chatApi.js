// export const signupAPI = "http://localhost:8000/api/v1/user/register";

// export const loginAPI = "http://localhost:8000/api/v1/user/login";

// export const logoutAPI = "http://localhost:8000/api/v1/user/logout";
import { host } from "../../../../constants/api";
export const sendMessageAPI = `${host}/api/v1/message/sendMessage/:`;
export const getAllUserData = `${host}/api/v1/message/getAllUserData`;
export const getMessage = `${host}/api/v1/message/getMessage/:`;
export const getOneUserConversation = `${host}/api/v1/message/getOneUserConversation/`;
export const sendMessage = `${host}/api/v1/message/sendMessage/`;
export const connectSocket = `${host}?userId=`;
