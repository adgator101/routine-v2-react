import { X } from "lucide-react";

const Notification = ({ isVisible, onClose }) => {
  const notifications = [
    {
      id: 1,
      title: "New Assignment",
      message: "Your Web Development assignment is due tomorrow",
      time: "2 hours ago"
    },
    {
      id: 2,
      title: "Meeting Reminder",
      message: "Team meeting starts in 30 minutes",
      time: "30 minutes ago"
    },
    {
      id: 3,
      title: "Grade Updated",
      message: "Your Database Management grade has been updated",
      time: "5 minutes ago"
    }
  ];

  if (!isVisible) return null;

  return (
    <div className="absolute right-0 top-16 z-50 w-80 rounded-xl bg-white p-4 shadow-lg">
      <div className="flex items-center justify-between border-b pb-2">
        <h3 className="font-semibold text-dark">Notifications</h3>
        <button
          onClick={onClose}
          className="rounded-full p-1 hover:bg-gray-100"
        >
          <X size={16} />
        </button>
      </div>
      
      <div className="mt-2 space-y-3">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="cursor-pointer rounded-lg p-3 hover:bg-gray-50"
          >
            <div className="font-medium text-dark">{notification.title}</div>
            <div className="text-sm text-gray-600">{notification.message}</div>
            <div className="mt-1 text-xs text-gray-400">{notification.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification; 