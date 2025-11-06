import React, { useState, useEffect } from "react";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext.jsx";

const Marketplace = () => {
 const { token } = useAuth();
 const [swappableSlots, setSwappableSlots] = useState([]);
 const [myEvents, setMyEvents] = useState([]);
 const [selectedId, setSelectedId] = useState("");
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  if (!token) return;

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
   } finally {
        setLoading(false);
      }
  };

  fetchData();
 }, [token]);

 const handleSwapRequest = async (theirSlotId) => {
  if (!selectedId) return alert("Please select one of your swappable events first!");

  try {
   await API.post(
    "/swap-request",
    { mySlotId: selectedId, theirSlotId }
   );
   alert("Swap request sent successfully! Check your Requests tab.");
  } catch (err) {
   console.error("Error sending swap request:", err);
   alert("Error sending swap request: " + (err.response?.data?.message || "Server error."));
  }
 };

  const availableMySlots = myEvents.filter((ev) => ev.status === "SWAPPABLE");

 return (
  <div className="p-3">
   <h2 className="mb-4 fw-bold">🛒 Swappable Slots Marketplace</h2>

   <div className="card shadow-sm mb-5 p-4 bg-light">
    <h5 className="card-title mb-3">Your Slot Selection</h5>
    <label className="form-label fs-6 fw-semibold">
     Step 1: Select the slot you wish to **give up** for the swap:
    </label>
    <select
     className="form-select form-select-lg"
     value={selectedId}
     onChange={(e) => setSelectedId(e.target.value)}
    >
     <option value="">Select your swappable event</option>
     {availableMySlots.map((ev) => (
      <option key={ev._id} value={ev._id}>
       {ev.title} ({new Date(ev.startTime).toLocaleString()})
      </option>
     ))}
    </select>
        {availableMySlots.length === 0 && (
          <p className="text-danger mt-2">
            You must mark an event as "SWAPPABLE" on your Dashboard before requesting a swap.
          </p>
        )}
   </div>

      {loading && (
        <div className="text-center p-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Fetching available slots...</p>
        </div>
      )}

      {!loading && (
        <>
          <h3 className="mb-4">Available Slots from Other Users</h3>
          <div className="row">
            {swappableSlots.length === 0 ? (
              <div className="col-12">
                <p className="alert alert-info">No available slots from other users at the moment.</p>
              </div>
            ) : (
              swappableSlots.map((slot) => (
                <div key={slot._id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                  <div className="card h-100 shadow border-primary">
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title fw-bold text-primary">{slot.title}</h5>
                      <p className="card-text mb-2 text-muted">
                        <small>Offered by: {slot.user?.name || 'Unknown User'}</small>
                      </p>
                      <p className="card-text flex-grow-1">
                        **Start:** {new Date(slot.startTime).toLocaleString()}
                        <br/>
                        **End:** {new Date(slot.endTime).toLocaleString()}
                      </p>
                      <button
                        className="btn btn-primary mt-3 w-100"
                        onClick={() => handleSwapRequest(slot._id)}
                        disabled={!selectedId} 
                      >
                        Request Swap
                      </button>
                      {!selectedId && <small className="text-danger text-center mt-1">Select your slot above!</small>}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
  </div>
 );
};

export default Marketplace;