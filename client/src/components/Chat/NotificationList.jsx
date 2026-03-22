import React from "react";
import { replace, useNavigate } from "react-router-dom";

import { useState, useMemo, useCallback } from "react";
import { Bell, Check, Trash2, ArrowLeft, X } from "lucide-react";

// Sample notification data - Move to context/state management in production
const initialNotifications = [
  {
    id: 1,
    patientId: "P001",
    patientName: "Sarah Anderson",
    avatar: "SA",
    message:
      "I have been experiencing severe headaches for the past 3 days, especially in the morning.",
    time: "2 min ago",
    isRead: false,
    lastMessageTime: new Date().getTime(),
  },
  {
    id: 2,
    patientId: "P002",
    patientName: "Michael Brown",
    avatar: "MB",
    message:
      "My blood pressure readings have been higher than usual. Should I be concerned?",
    time: "15 min ago",
    isRead: false,
    lastMessageTime: new Date().getTime() - 900000,
  },
  {
    id: 3,
    patientId: "P003",
    patientName: "Emily Davis",
    avatar: "ED",
    message:
      "Thank you for the prescription. The medication is helping with my symptoms.",
    time: "1 hour ago",
    isRead: true,
    lastMessageTime: new Date().getTime() - 3600000,
  },
  {
    id: 4,
    patientId: "P004",
    patientName: "James Wilson",
    avatar: "JW",
    message:
      "I need to schedule a follow-up appointment for my diabetes check-up.",
    time: "2 hours ago",
    isRead: true,
    lastMessageTime: new Date().getTime() - 7200000,
  },
  {
    id: 5,
    patientId: "P005",
    patientName: "Maria Garcia",
    avatar: "MG",
    message:
      "The pain in my knee has gotten worse after the physical therapy session.",
    time: "3 hours ago",
    isRead: false,
    lastMessageTime: new Date().getTime() - 10800000,
  },
  {
    id: 6,
    patientId: "P006",
    patientName: "Robert Taylor",
    avatar: "RT",
    message: "Can you recommend any exercises for lower back pain relief?",
    time: "5 hours ago",
    isRead: true,
    lastMessageTime: new Date().getTime() - 18000000,
  },
  {
    id: 7,
    patientId: "P007",
    patientName: "Lisa Martinez",
    avatar: "LM",
    message:
      "My lab results show elevated cholesterol levels. What should I do next?",
    time: "Yesterday",
    isRead: true,
    lastMessageTime: new Date().getTime() - 86400000,
  },
  {
    id: 8,
    patientId: "P008",
    patientName: "David Johnson",
    avatar: "DJ",
    message:
      "I forgot to take my medication yesterday. Should I take a double dose today?",
    time: "2 days ago",
    isRead: true,
    lastMessageTime: new Date().getTime() - 172800000,
  },
];
const getStoredNotifications = () => {
  try {
    const stored = localStorage.getItem("notifications");
    return stored ? JSON.parse(stored) : initialNotifications;
  } catch (error) {
    console.error("Error loading notifications:", error);
    return initialNotifications;
  }
};
// Confirmation Dialog Component - Optimized with memo
const ConfirmDialog = ({ isOpen, onClose, onConfirm, patientName }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0  flex items-center justify-center z-50 p-4"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      {/* ============ ANIMATION: Modal Fade In ============ */}
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all duration-300 ease-out scale-100 opacity-100"
        style={{
          animation: "modalFadeIn 0.3s ease-out",
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800">Delete Message</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          Are you sure you want to delete the message from{" "}
          <span className="font-semibold">{patientName}</span>? This action
          cannot be undone.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>

      {/* CSS for modal animation */}
      <style>{`
          @keyframes modalFadeIn {
            from {
              opacity: 0;
              transform: scale(0.95) translateY(-10px);
            }
            to {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
        `}</style>
    </div>
  );
};

function NotificationList() {
  const [notifications, setNotifications] = useState(getStoredNotifications);
  // const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState("all");
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    id: null,
    name: "",
  });
  const navigate = useNavigate();

  // Save notifications to localStorage whenever they change
  React.useEffect(() => {
    try {
      localStorage.setItem("notifications", JSON.stringify(notifications));
    } catch (error) {
      console.error("Error saving notifications:", error);
    }
  }, [notifications]);

  // Memoized calculations - Optimization
  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.isRead).length,
    [notifications],
  );

  const filteredNotifications = useMemo(
    () =>
      filter === "unread"
        ? notifications.filter((n) => !n.isRead)
        : notifications,
    [notifications, filter],
  );

  // Optimized handlers with useCallback
  const markAsRead = useCallback((id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  }, []);

  const openDeleteDialog = useCallback((id, name) => {
    setDeleteDialog({ isOpen: true, id, name });
  }, []);

  const closeDeleteDialog = useCallback(() => {
    setDeleteDialog({ isOpen: false, id: null, name: "" });
  }, []);

  const confirmDelete = useCallback(() => {
    setNotifications((prev) => prev.filter((n) => n.id !== deleteDialog.id));
    closeDeleteDialog();
  }, [deleteDialog.id, closeDeleteDialog]);

  const handleNotificationClick = useCallback(
    (notification) => {
      markAsRead(notification.id);

      // React Router DOM Navigation
      navigate("/patients/chat", {
        state: { patient: notification },
        replace: true,
      });

      console.log("Navigate to /patients/chat with:", notification);
    },
    [markAsRead, navigate],
  );

  return (
    <>
      {/* ============ ANIMATION: Page Fade In ============ */}
      <div
        className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50"
        style={{
          animation: "pageFadeIn 0.5s ease-out",
        }}
      >
        {/* Header */}
        <div className="bg-white shadow-sm border-b sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate("/dashboard", { replace: true })}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <ArrowLeft size={20} />
                </button>

                <div className="bg-indigo-600 p-2 rounded-lg">
                  <Bell className="text-white" size={24} />
                </div>

                <div>
                  <h1 className="text-xl font-bold text-gray-800">
                    Patient Messages
                  </h1>
                  <p className="text-sm text-gray-500">
                    {unreadCount > 0
                      ? `${unreadCount} unread message${unreadCount > 1 ? "s" : ""}`
                      : "All caught up!"}
                  </p>
                </div>
              </div>

              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                >
                  <Check size={16} />
                  <span className="hidden sm:inline">Mark all read</span>
                </button>
              )}
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  filter === "all"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                All ({notifications.length})
              </button>
              <button
                onClick={() => setFilter("unread")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  filter === "unread"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Unread ({unreadCount})
              </button>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="space-y-3">
            {filteredNotifications.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bell className="text-gray-400" size={32} />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  No notifications
                </h3>
                <p className="text-gray-500">
                  {filter === "unread"
                    ? "You're all caught up! No unread messages."
                    : "You're all caught up! Check back later for updates."}
                </p>
              </div>
            ) : (
              filteredNotifications.map((notification, index) => (
                /* ============ ANIMATION: List Item Slide In ============ */
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`bg-white rounded-xl shadow-sm hover:shadow-md transition group cursor-pointer ${
                    !notification.isRead ? "border-l-4 border-indigo-600" : ""
                  }`}
                  style={{
                    animation: `slideInUp 0.4s ease-out ${index * 0.05}s both`,
                  }}
                >
                  <div className="p-4">
                    <div className="flex gap-3">
                      {/* Avatar */}
                      <div className="bg-indigo-500 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-semibold text-sm">
                          {notification.avatar}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        {/* First Row - Name and Time */}
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h3 className="font-semibold text-gray-800 truncate">
                            {notification.patientName}
                          </h3>
                          <span className="text-xs text-gray-500 whitespace-nowrap">
                            {notification.time}
                          </span>
                        </div>

                        {/* Second Row - Message with Ellipsis */}
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {notification.message}
                        </p>

                        {/* Unread Badge */}
                        {!notification.isRead && (
                          <div className="mt-2">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
                              New message
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-start gap-2 opacity-0 group-hover:opacity-100 transition">
                        {!notification.isRead && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              markAsRead(notification.id);
                            }}
                            className="p-2 hover:bg-indigo-50 rounded-lg transition"
                            title="Mark as read"
                          >
                            <Check size={16} className="text-indigo-600" />
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openDeleteDialog(
                              notification.id,
                              notification.patientName,
                            );
                          }}
                          className="p-2 hover:bg-red-50 rounded-lg transition"
                          title="Delete"
                        >
                          <Trash2 size={16} className="text-red-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* CSS for animations */}
        <style>{`
            @keyframes pageFadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
            
            @keyframes slideInUp {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>
      </div>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={closeDeleteDialog}
        onConfirm={confirmDelete}
        patientName={deleteDialog.name}
      />
    </>
  );
}

export default NotificationList;
