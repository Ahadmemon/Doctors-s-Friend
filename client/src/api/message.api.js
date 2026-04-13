import API from "../services/axios";

// ✅ get messages
export const getMessagesApi = (chatRoomId, page = 1) => {
  return API.get(`/messages/${chatRoomId}?page=${page}`);
};

// ✅ send message
export const sendMessageApi = (chatRoomId, message) => {
  return API.post(`/messages/${chatRoomId}`, { message });
};
