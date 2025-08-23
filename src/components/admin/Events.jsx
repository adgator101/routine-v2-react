import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Calendar, Clock } from "lucide-react";

function Events() {
  // Mock events data
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "GitHub 101",
      date: "2025/03/01",
      location: "SR-01",
      state: "Upcoming",
    },
    {
      id: 2,
      title: "React Workshop",
      date: "2025/03/15",
      location: "SR-02",
      state: "Upcoming",
    },
    {
      id: 3,
      title: "Database Design",
      date: "2025/02/20",
      location: "Lab-01",
      state: "Completed",
    },
    {
      id: 4,
      title: "AI/ML Seminar",
      date: "2025/04/10",
      location: "Hall-A",
      state: "Upcoming",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    location: "",
    state: "Upcoming",
  });

  // Filter events based on search term
  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.state.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Handle add event
  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.location) {
      const event = {
        id: events.length + 1,
        ...newEvent,
      };
      setEvents([...events, event]);
      setNewEvent({ title: "", date: "", location: "", state: "Upcoming" });
      setShowAddModal(false);
    }
  };

  // Handle edit event
  const handleEditEvent = (event) => {
    setEditingEvent(event.id);
    setNewEvent(event);
  };

  // Handle save edit
  const handleSaveEdit = () => {
    setEvents(
      events.map((event) =>
        event.id === editingEvent ? { ...newEvent, id: editingEvent } : event,
      ),
    );
    setEditingEvent(null);
    setNewEvent({ title: "", date: "", location: "", state: "Upcoming" });
  };

  // Handle delete event
  const handleDeleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  // Handle cancel edit/add
  const handleCancel = () => {
    setEditingEvent(null);
    setShowAddModal(false);
    setNewEvent({ title: "", date: "", location: "", state: "Upcoming" });
  };

  // Get state color configuration
  const getStateConfig = (state) => {
    const configs = {
      Upcoming: {
        bg: "bg-blue-100",
        text: "text-blue-800",
        border: "border-blue-200",
      },
      Ongoing: {
        bg: "bg-green-100",
        text: "text-green-800",
        border: "border-green-200",
      },
      Completed: {
        bg: "bg-gray-100",
        text: "text-gray-800",
        border: "border-gray-200",
      },
      Cancelled: {
        bg: "bg-red-100",
        text: "text-red-800",
        border: "border-red-200",
      },
    };
    return configs[state] || configs.Upcoming;
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Get days until event
  const getDaysUntil = (dateString) => {
    return "10D";
  };
  return (
    <div className="mx-10 mt-20 flex flex-col gap-8">
      <div className="event-header flex items-center justify-between">
        <p className="text-3xl font-bold">Event Management</p>
        <Button
          onClick={() => setShowAddModal(true)}
          className="bg-accent text-white shadow-[0_2px_5px_rgba(248,65,120,0.3)] transition-all hover:bg-accent/90 hover:shadow-[0_4px_10px_rgba(248,65,120,0.3)]"
        >
          Add Event
        </Button>
      </div>

      {/* Add/Edit Event Modal */}
      {(showAddModal || editingEvent) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-96 max-w-md rounded-xl bg-white p-6 shadow-[0_4px_16px_rgba(0,_0,_0,_0.2)]">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">
              {editingEvent ? "Edit Event" : "Add New Event"}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Title
                </label>
                <Input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                  placeholder="Event title"
                  className="focus:border-accent focus:ring-accent"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Date
                </label>
                <Input
                  type="date"
                  value={newEvent.date}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, date: e.target.value })
                  }
                  className="focus:border-accent focus:ring-accent"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Location
                </label>
                <Input
                  type="text"
                  value={newEvent.location}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, location: e.target.value })
                  }
                  placeholder="Event location"
                  className="focus:border-accent focus:ring-accent"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  State
                </label>
                <Select
                  value={newEvent.state}
                  onValueChange={(value) =>
                    setNewEvent({ ...newEvent, state: value })
                  }
                >
                  <SelectTrigger className="focus-visible:ring-accent">
                    <SelectValue placeholder="Select event state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Upcoming">Upcoming</SelectItem>
                    <SelectItem value="Ongoing">Ongoing</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                onClick={editingEvent ? handleSaveEdit : handleAddEvent}
                className="bg-accent text-white shadow-[0_2px_5px_rgba(248,65,120,0.3)] hover:bg-accent/90"
              >
                {editingEvent ? "Save Changes" : "Add Event"}
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="event-main-container flex flex-col gap-8">
        <div className="event-search-form">
          <form onSubmit={(event) => event.preventDefault()}>
            <Input
              type="text"
              placeholder="Search Events"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-1/2 focus:border-accent focus:ring-accent"
            />
          </form>
        </div>

        {/* Grid View */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <div
                key={event.id}
                className="w-full cursor-pointer rounded-xl bg-white p-4 shadow-[0_2px_8px_rgba(0,_0,_0,_0.1)] transition-[shadow_transform] hover:scale-105 hover:shadow-[0_4px_16px_rgba(0,_0,_0,_0.1)] dark:border-dark-border dark:bg-dark-card"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    {/* Event Icon/Image */}
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[url('https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg')] bg-cover bg-center shadow-sm">
                      {/* <Calendar className="h-8 w-8 text-accent" /> */}
                    </div>
                    <div className="flex-1">
                      <p className="text-lg font-semibold text-gray-800 dark:text-white">
                        {event.title}
                      </p>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="h-3 w-3" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">
                        <span className="font-poppins text-2xl font-semibold text-accent">
                          {getDaysUntil(event.date)}
                        </span>
                        {" left"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${getStateConfig(event.state).bg} ${getStateConfig(event.state).text} border ${getStateConfig(event.state).border}`}
                    >
                      {event.state}
                    </span>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditEvent(event)}
                        className="border-accent text-accent hover:bg-accent hover:text-white"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteEvent(event.id)}
                        className="bg-red-500 hover:bg-red-600"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-8 text-center">
              <div className="text-lg text-gray-400">No events found</div>
              <p className="mt-2 text-sm text-gray-500">
                Try adjusting your search criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Events;
