import API from "../services/axios";

// Get all notifications for current user
export const getNotifications = async (isRead) => {
  try {
    let url = "/notifications";
    if (isRead !== undefined) {
      url += `?isRead=${isRead}`;
    }
    const response = await API.get(url);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get unread notification count
export const getUnreadCount = async () => {
  try {
    const response = await API.get("/notifications/unread-count");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Mark notification as read
export const markAsRead = async (notificationId) => {
  try {
    const response = await API.patch(`/notifications/${notificationId}/read`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Mark all notifications as read
export const markAllAsRead = async () => {
  try {
    const response = await API.patch("/notifications/mark-all-read");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Delete notification
export const deleteNotification = async (notificationId) => {
  try {
    const response = await API.delete(`/notifications/${notificationId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
