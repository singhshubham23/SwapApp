import { useState, useEffect } from "react";
import { useToast } from "../context/ToastContext";
import { useAuth } from "../context/AuthContext.jsx";
import API from "../api/axios";

const Marketplace = () => {
  const { user } = useAuth();
  const [swappableSlots, setSwappableSlots] = useState([]);
  const [myEvents, setMyEvents] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const [slotsRes, myEventsRes] = await Promise.all([
          API.get("/swappable-slots"),
          API.get("/events"),
        ]);
        setSwappableSlots(slotsRes.data);
        setMyEvents(myEventsRes.data);
      } catch (err) {
        console.error("Error fetching slots or events:", err);
        toast.error("Failed to load marketplace data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleSwapRequest = async (theirSlotId) => {
    if (!selectedId) {
      toast.warning("Please select one of your swappable events first!");
      return;
    }

    try {
      await API.post("/swap-request", { mySlotId: selectedId, theirSlotId });
      toast.success("Swap request sent! Check your Requests tab.");
    } catch (err) {
      console.error("Error sending swap request:", err);
      toast.error(
        err.response?.data?.message || "Failed to send swap request."
      );
    }
  };

  const availableMySlots = myEvents.filter((ev) => ev.status === "SWAPPABLE");

  return (
    <div className="page-container page-wrapper">
      {/* Header */}
      <div className="page-header animate-slideUp">
        <h1 className="page-title">🛒 Marketplace</h1>
        <p className="page-subtitle">Browse available slots and request swaps</p>
      </div>

      {/* Slot Selection */}
      <div
        className="glass-card-static animate-slideUp"
        style={{ padding: "var(--space-xl)", marginBottom: "var(--space-2xl)" }}
      >
        <h3 className="section-title">🔄 Your Slot Selection</h3>
        <p
          style={{
            color: "var(--color-text-secondary)",
            fontSize: "var(--font-size-sm)",
            marginBottom: "var(--space-md)",
          }}
        >
          Step 1: Select the slot you wish to <strong>give up</strong> for the swap:
        </p>
        <select
          className="select-field"
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          id="slot-select"
        >
          <option value="">Select your swappable event</option>
          {availableMySlots.map((ev) => (
            <option key={ev._id} value={ev._id}>
              {ev.title} ({new Date(ev.startTime).toLocaleString()})
            </option>
          ))}
        </select>
        {availableMySlots.length === 0 && (
          <p
            style={{
              color: "var(--color-warning-dark)",
              fontSize: "var(--font-size-sm)",
              marginTop: "var(--space-sm)",
            }}
          >
            You must mark an event as "SWAPPABLE" on your Dashboard before requesting a swap.
          </p>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div className="loading-overlay">
          <div className="spinner" />
          <p>Fetching available slots...</p>
        </div>
      )}

      {/* Slots Grid */}
      {!loading && (
        <>
          <h3 className="section-title animate-slideUp">
            📦 Available Slots from Other Users
          </h3>

          {swappableSlots.length === 0 ? (
            <div className="glass-card-static empty-state animate-fadeIn">
              <div className="empty-state-icon">🔍</div>
              <div className="empty-state-title">No slots available</div>
              <p className="empty-state-text">
                No other users have swappable slots right now. Check back later!
              </p>
            </div>
          ) : (
            <div className="cards-grid stagger-children">
              {swappableSlots.map((slot) => (
                <div key={slot._id} className="glass-card event-card">
                  <div className="event-card-header">
                    <h4 className="event-card-title">{slot.title}</h4>
                    <span className="badge badge-swappable">Swappable</span>
                  </div>

                  <p
                    style={{
                      fontSize: "var(--font-size-sm)",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    Offered by: {slot.user?.name || "Unknown User"}
                  </p>

                  <div className="event-card-times">
                    <div>
                      <span className="event-card-time-label">Start</span>
                      <br />
                      {new Date(slot.startTime).toLocaleString()}
                    </div>
                    <div>
                      <span className="event-card-time-label">End</span>
                      <br />
                      {new Date(slot.endTime).toLocaleString()}
                    </div>
                  </div>

                  <div className="event-card-actions" style={{ flexDirection: "column" }}>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleSwapRequest(slot._id)}
                      disabled={!selectedId}
                      style={{ width: "100%" }}
                    >
                      Request Swap
                    </button>
                    {!selectedId && (
                      <span
                        style={{
                          fontSize: "var(--font-size-xs)",
                          color: "var(--color-warning-dark)",
                          textAlign: "center",
                        }}
                      >
                        Select your slot above first
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Marketplace;
