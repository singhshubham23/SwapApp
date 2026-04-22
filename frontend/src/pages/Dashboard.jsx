import { useEffect, useState } from "react";
import { useToast } from "../context/ToastContext";
import API from "../api/axios";

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const toast = useToast();

  const fetchEvents = async () => {
    try {
      const res = await API.get("/events");
      setEvents(res.data);
    } catch (error) {
      console.error("Error fetching events:", error);
      toast.error("Failed to load events.");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const createEvent = async (e) => {
    e.preventDefault();
    try {
      await API.post("/events", { title, startTime: start, endTime: end });
      setTitle("");
      setStart("");
      setEnd("");
      fetchEvents();
      toast.success("Event created successfully!");
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("Failed to create event.");
    }
  };

  const makeSwappable = async (id) => {
    try {
      await API.put(`/events/${id}`, { status: "SWAPPABLE" });
      fetchEvents();
      toast.success("Event marked as swappable!");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to make event swappable.");
    }
  };

  const confirmDelete = (id) => setDeleteId(id);

  const deleteEvent = async () => {
    try {
      await API.delete(`/events/${deleteId}`);
      setDeleteId(null);
      fetchEvents();
      toast.success("Event deleted.");
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Failed to delete event. Only BUSY or SWAPPABLE events can be deleted.");
      setDeleteId(null);
    }
  };

  // Stats
  const totalEvents = events.length;
  const swappableCount = events.filter((e) => e.status === "SWAPPABLE").length;
  const pendingCount = events.filter((e) => e.status === "SWAP_PENDING").length;

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "BUSY": return "badge badge-busy";
      case "SWAPPABLE": return "badge badge-swappable";
      case "SWAP_PENDING": return "badge badge-pending";
      default: return "badge badge-busy";
    }
  };

  return (
    <div className="page-container page-wrapper">
      {/* Header */}
      <div className="page-header animate-slideUp">
        <h1 className="page-title">📅 My Events</h1>
        <p className="page-subtitle">Manage your time slots and make them available for swapping</p>
      </div>

      {/* Stats */}
      <div className="stats-grid stagger-children">
        <div className="glass-card stat-card stat-primary">
          <div className="stat-value">{totalEvents}</div>
          <div className="stat-label">Total Events</div>
        </div>
        <div className="glass-card stat-card stat-warning">
          <div className="stat-value">{swappableCount}</div>
          <div className="stat-label">Swappable</div>
        </div>
        <div className="glass-card stat-card stat-info">
          <div className="stat-value">{pendingCount}</div>
          <div className="stat-label">Pending Swap</div>
        </div>
      </div>

      {/* Add Event Form */}
      <div className="glass-card-static animate-slideUp" style={{ padding: "var(--space-xl)", marginBottom: "var(--space-2xl)" }}>
        <h3 className="section-title">➕ Add New Event</h3>
        <form onSubmit={createEvent} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "var(--space-md)", alignItems: "end" }}>
          <div className="input-group" style={{ marginBottom: 0 }}>
            <label htmlFor="event-title" className="input-label">Event Title</label>
            <input
              id="event-title"
              className="input-field"
              placeholder="e.g. Team Meeting"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="input-group" style={{ marginBottom: 0 }}>
            <label htmlFor="event-start" className="input-label">Start Time</label>
            <input
              id="event-start"
              className="input-field"
              type="datetime-local"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              required
            />
          </div>
          <div className="input-group" style={{ marginBottom: 0 }}>
            <label htmlFor="event-end" className="input-label">End Time</label>
            <input
              id="event-end"
              className="input-field"
              type="datetime-local"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-success btn-lg" type="submit">
            Add Event
          </button>
        </form>
      </div>

      {/* Events Grid */}
      <h3 className="section-title animate-slideUp">📋 My Scheduled Slots</h3>

      {events.length === 0 ? (
        <div className="glass-card-static empty-state animate-fadeIn">
          <div className="empty-state-icon">📭</div>
          <div className="empty-state-title">No events yet</div>
          <p className="empty-state-text">
            Create your first event above and start managing your schedule.
          </p>
        </div>
      ) : (
        <div className="cards-grid stagger-children">
          {events.map((ev) => (
            <div key={ev._id} className="glass-card event-card">
              <div className="event-card-header">
                <h4 className="event-card-title">{ev.title}</h4>
                <span className={getStatusBadgeClass(ev.status)}>{ev.status}</span>
              </div>

              <div className="event-card-times">
                <div>
                  <span className="event-card-time-label">Start</span>
                  <br />
                  {new Date(ev.startTime).toLocaleString()}
                </div>
                <div>
                  <span className="event-card-time-label">End</span>
                  <br />
                  {new Date(ev.endTime).toLocaleString()}
                </div>
              </div>

              <div className="event-card-actions">
                {ev.status === "BUSY" && (
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => makeSwappable(ev._id)}
                  >
                    Make Swappable
                  </button>
                )}
                {(ev.status === "BUSY" || ev.status === "SWAPPABLE") && (
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => confirmDelete(ev._id)}
                  >
                    Delete
                  </button>
                )}
                {ev.status === "SWAP_PENDING" && (
                  <span className="badge badge-pending">Awaiting Response</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="modal-backdrop" onClick={() => setDeleteId(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">Delete Event?</h3>
            <p className="modal-text">
              This action cannot be undone. The event will be permanently removed.
            </p>
            <div className="modal-actions">
              <button className="btn btn-ghost" onClick={() => setDeleteId(null)}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={deleteEvent}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}