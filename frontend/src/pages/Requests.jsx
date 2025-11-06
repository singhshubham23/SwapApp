import { useEffect, useState } from "react";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext.jsx";

export default function Requests() {
  const { user } = useAuth();
  const [incoming, setIncoming] = useState([]);
  const [outgoing, setOutgoing] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await API.get("/swap-requests");
      setIncoming(res.data.incoming || []);
      setOutgoing(res.data.outgoing || []);
    } catch (err) {
      console.error("Error fetching requests:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchRequests();
  }, [user]);

  const respond = async (id, accept) => {
    try {
      const res = await API.post(`/swap-response/${id}`, { accept });
      console.log("Response success:", res.data);
      fetchRequests();
    } catch (err) {
      console.error("Error responding to request:", err.response?.data || err);
      alert(
        "Failed to update request status: " +
          (err.response?.data?.message || "Server Error")
      );
    }
  };

  return (
    <div className="p-3">
      <h2 className="mb-4 fw-bold">🤝 Swap Requests Hub</h2>

      {loading && (
        <div className="text-center p-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Fetching your swap requests...</p>
        </div>
      )}

      {!loading && (
        <div className="row g-4">
          <div className="col-12 col-lg-6">
            <div className="card shadow-sm h-100">
              <div className="card-header bg-primary text-white">
                <h4 className="card-title mb-0">📥 Incoming Requests</h4>
              </div>
              <ul className="list-group list-group-flush fs-6">
                {incoming.length === 0 ? (
                  <li className="list-group-item text-center py-4 text-muted">
                    No pending requests waiting for your action.
                  </li>
                ) : (
                  incoming.map((req) => (
                    <li
                      key={req._id}
                      className="list-group-item d-flex flex-column flex-sm-row justify-content-between align-items-sm-center py-3"
                    >
                      <div className="me-sm-3 mb-2 mb-sm-0 flex-grow-1">
                        <p className="mb-0">
                          <span className="fw-bold">
                            {req.requester?.name || "Unknown User"}
                          </span>{" "}
                          wants to swap:
                        </p>
                        <p className="mb-0">
                          <span className="text-success fw-bold me-2">
                            THEIRS:
                          </span>
                          <span className="text-muted">
                            {req.mySlot?.title || "DELETED SLOT"}
                          </span>
                        </p>
                        <p className="mb-0">
                          <span className="text-danger fw-bold me-2">
                            FOR YOURS:
                          </span>
                          <span className="text-muted">
                            {req.theirSlot?.title || "DELETED SLOT"}
                          </span>
                        </p>
                      </div>

                      <div className="text-nowrap mt-2 mt-sm-0">
                        {req.status === "PENDING" ? (
                          <>
                            <button
                              className="btn btn-success btn-sm me-2"
                              onClick={() => respond(req._id, true)}
                            >
                              Accept
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => respond(req._id, false)}
                            >
                              Reject
                            </button>
                          </>
                        ) : (
                          <span
                            className={`badge fs-6 bg-${
                              req.status === "ACCEPTED" ? "success" : "danger"
                            }`}
                          >
                            {req.status}
                          </span>
                        )}
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <div className="card shadow-sm h-100">
              <div className="card-header bg-secondary text-white">
                <h4 className="card-title mb-0">📤 Outgoing Requests</h4>
              </div>
              <ul className="list-group list-group-flush fs-6">
                {outgoing.length === 0 ? (
                  <li className="list-group-item text-center py-4 text-muted">
                    You have not sent any swap requests yet.
                  </li>
                ) : (
                  outgoing.map((req) => (
                    <li
                      key={req._id}
                      className="list-group-item d-flex justify-content-between align-items-center py-3"
                    >
                      <div className="flex-grow-1 me-3">
                        <p className="mb-0">
                          You requested to swap
                          <span className="fw-bold mx-1">
                            {req.mySlot?.title || "DELETED SLOT"}
                          </span>{" "}
                          (yours) for{" "}
                          <span className="fw-bold mx-1">
                            {req.theirSlot?.title || "DELETED SLOT"}
                          </span>{" "}
                          (theirs).
                        </p>
                      </div>
                      <span
                        className={`badge fs-6 bg-${
                          req.status === "ACCEPTED"
                            ? "success"
                            : req.status === "REJECTED"
                            ? "danger"
                            : "secondary"
                        }`}
                      >
                        {req.status}
                      </span>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
