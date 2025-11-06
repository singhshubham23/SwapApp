import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Dashboard() {
 const [events, setEvents] = useState([]);
 const [title, setTitle] = useState("");
 const [start, setStart] = useState("");
 const [end, setEnd] = useState("");

 const fetchEvents = async () => {
  try {
   const res = await API.get("/events");
   setEvents(res.data);
  } catch (error) {
   console.error("Error fetching events:", error);
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
  } catch (error) {
   console.error("Error creating event:", error);
   alert("Failed to create event.");
  }
 };

 const makeSwappable = async (id) => {
  try {
   await API.put(`/events/${id}`, { status: "SWAPPABLE" });
   fetchEvents();
  } catch (error) {
   console.error("Error updating status:", error);
   alert("Failed to make event swappable.");
  }
 };

 const deleteEvent = async (id) => {
  try {
   if (window.confirm("Are you sure you want to delete this event?")) {
    await API.delete(`/events/${id}`);
    fetchEvents();
   }
  } catch (error) {
   console.error("Error deleting event:", error);
   alert(
    "Failed to delete event. Only BUSY or SWAPPABLE events can be deleted."
   );
  }
 };

 return (
  <div className="p-3">
   <h2 className="mb-4 fw-bold">📅 My Events</h2>
   
   <div className="card shadow-sm mb-5 p-3">
    <h5 className="card-title mb-3">Add New Event</h5>
    <form className="row g-3" onSubmit={createEvent}>
     <div className="col-12 col-md-3">
      <input
       className="form-control"
       placeholder="Event Title"
       value={title}
       onChange={(e) => setTitle(e.target.value)}
       required
      />
     </div>
     <div className="col-12 col-md-3">
      <input
       className="form-control"
       type="datetime-local"
       value={start}
       onChange={(e) => setStart(e.target.value)}
       required
      />
     </div>

     <div className="col-12 col-md-3">
      <input
       className="form-control"
       type="datetime-local"
       value={end}
       onChange={(e) => setEnd(e.target.value)}
       required
      />
     </div>
     <div className="col-12 col-md-3">
      <button className="btn btn-success w-100">Add Event</button>
     </div>
    </form>
   </div>
   <h3 className="mb-3">My Scheduled Slots</h3>
   <div className="table-responsive">
    <table className="table table-striped table-hover align-middle">
     <thead className="table-dark">
      <tr>
       <th scope="col">Title</th>
       <th scope="col">Status</th>
       <th scope="col">Start Time</th>
       <th scope="col">End Time</th>
       <th scope="col" className="text-center">Action</th>
      </tr>
     </thead>
     <tbody>
      {events.map((ev) => (
       <tr key={ev._id}>
        <td>{ev.title}</td>
        <td className="fw-semibold">
         <span
          className={`badge fs-6 bg-${
           ev.status === "BUSY"
            ? "primary"
            : ev.status === "SWAPPABLE"
            ? "warning text-dark"
            : "info text-dark"
          }`}
         >
          {ev.status}
         </span>
        </td>
        <td>{new Date(ev.startTime).toLocaleString()}</td>
        <td>{new Date(ev.endTime).toLocaleString()}</td>
        <td className="text-center">
         <div className="d-grid gap-2 d-md-block">
          {ev.status === "BUSY" && (
           <button
            className="btn btn-warning btn-sm me-md-2"
            onClick={() => makeSwappable(ev._id)}
           >
            Make Swappable
           </button>
          )}
          
          {(ev.status === "BUSY" || ev.status === "SWAPPABLE") && (
           <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => deleteEvent(ev._id)}
           >
            Delete
           </button>
          )}
          
          {ev.status === "SWAP_PENDING" && (
           <span className="badge bg-secondary">Awaiting Response</span>
          )}
         </div>
        </td>
       </tr>
      ))}
     </tbody>
    </table>
   </div>
  </div>
 );
}