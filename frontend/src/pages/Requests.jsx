import { useEffect, useState } from "react";
import { useToast } from "../context/ToastContext";
import { useAuth } from "../context/AuthContext.jsx";
import API from "../api/axios";

export default function Requests() {
  const { user } = useAuth();
  const [incoming, setIncoming] = useState([]);
  const [outgoing, setOutgoing] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await API.get("/swap-requests");
      setIncoming(res.data.incoming || []);
      setOutgoing(res.data.outgoing || []);
    } catch (err) {
      console.error("Error fetching requests:", err);
      toast.error("Failed to load swap requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchRequests();
  }, [user]);

  const respond = async (id, accept) => {
    try {
      await API.post(`/swap-response/${id}`, { accept });
      fetchRequests();
      toast.success(accept ? "Swap accepted!" : "Swap rejected.");
    } catch (err) {
      console.error("Error responding to request:", err.response?.data || err);
      toast.error(
        err.response?.data?.message || "Failed to update request status."
      );
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "PENDING": return "badge badge-pending";
      case "ACCEPTED": return "badge badge-accepted";
      case "REJECTED": return "badge badge-rejected";
      default: return "badge badge-busy";
    }
  };

  return (
    <div className="page-container page-wrapper">
      {/* Header */}
      <div className="page-header animate-slideUp">
        <h1 className="page-title">🤝 Swap Requests</h1>
        <p className="page-subtitle">Manage incoming and outgoing swap requests</p>
      </div>

      {loading && (
        <div className="loading-overlay">
          <div className="spinner" />
          <p>Fetching your swap requests...</p>
        </div>
      )}

      {!loading && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
            gap: "var(--space-xl)",
          }}
        >
          {/* Incoming */}
          <div className="animate-slideInLeft">
            <h3 className="section-title">📥 Incoming Requests</h3>

            {incoming.length === 0 ? (
              <div className="glass-card-static empty-state">
                <div className="empty-state-icon">📭</div>
                <div className="empty-state-title">No incoming requests</div>
                <p className="empty-state-text">
                  No one has requested to swap with you yet.
                </p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
                {incoming.map((req) => (
                  <div
                    key={req._id}
                    className="glass-card"
                    style={{ padding: "var(--space-lg)" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: "var(--space-md)",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-sm)" }}>
                        <div className="avatar" style={{ width: "32px", height: "32px", fontSize: "var(--font-size-xs)" }}>
                          {req.requester?.name?.charAt(0)?.toUpperCase() || "?"}
                        </div>
                        <span style={{ fontWeight: 600 }}>
                          {req.requester?.name || "Unknown User"}
                        </span>
                      </div>
                      <span className={getStatusBadge(req.status)}>{req.status}</span>
                    </div>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr auto 1fr",
                        gap: "var(--space-sm)",
                        alignItems: "center",
                        marginBottom: "var(--space-md)",
                        fontSize: "var(--font-size-sm)",
                      }}
                    >
                      <div
                        style={{
                          padding: "var(--space-sm) var(--space-md)",
                          background: "rgba(0, 184, 148, 0.08)",
                          borderRadius: "var(--radius-sm)",
                          border: "1px solid rgba(0, 184, 148, 0.15)",
                        }}
                      >
                        <span style={{ color: "var(--color-success-light)", fontSize: "var(--font-size-xs)", fontWeight: 600 }}>
                          THEIRS
                        </span>
                        <br />
                        <span style={{ color: "var(--color-text-secondary)" }}>
                          {req.mySlot?.title || "DELETED SLOT"}
                        </span>
                      </div>
                      <span style={{ color: "var(--color-text-muted)", fontSize: "var(--font-size-lg)" }}>⇄</span>
                      <div
                        style={{
                          padding: "var(--space-sm) var(--space-md)",
                          background: "rgba(214, 48, 49, 0.08)",
                          borderRadius: "var(--radius-sm)",
                          border: "1px solid rgba(214, 48, 49, 0.15)",
                        }}
                      >
                        <span style={{ color: "var(--color-danger-light)", fontSize: "var(--font-size-xs)", fontWeight: 600 }}>
                          YOURS
                        </span>
                        <br />
                        <span style={{ color: "var(--color-text-secondary)" }}>
                          {req.theirSlot?.title || "DELETED SLOT"}
                        </span>
                      </div>
                    </div>

                    {req.status === "PENDING" && (
                      <div style={{ display: "flex", gap: "var(--space-sm)" }}>
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => respond(req._id, true)}
                          style={{ flex: 1 }}
                        >
                          ✓ Accept
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => respond(req._id, false)}
                          style={{ flex: 1 }}
                        >
                          ✕ Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Outgoing */}
          <div className="animate-slideInRight">
            <h3 className="section-title">📤 Outgoing Requests</h3>

            {outgoing.length === 0 ? (
              <div className="glass-card-static empty-state">
                <div className="empty-state-icon">📬</div>
                <div className="empty-state-title">No outgoing requests</div>
                <p className="empty-state-text">
                  Visit the Marketplace to request a swap.
                </p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
                {outgoing.map((req) => (
                  <div
                    key={req._id}
                    className="glass-card"
                    style={{ padding: "var(--space-lg)" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "var(--space-md)",
                      }}
                    >
                      <span style={{ fontWeight: 600, fontSize: "var(--font-size-sm)" }}>
                        Swap Request
                      </span>
                      <span className={getStatusBadge(req.status)}>{req.status}</span>
                    </div>

                    <div
                      style={{
                        fontSize: "var(--font-size-sm)",
                        color: "var(--color-text-secondary)",
                        lineHeight: 1.7,
                      }}
                    >
                      <span style={{ color: "var(--color-text)" }}>Your slot:</span>{" "}
                      <strong>{req.mySlot?.title || "DELETED SLOT"}</strong>
                      <br />
                      <span style={{ color: "var(--color-text)" }}>For:</span>{" "}
                      <strong>{req.theirSlot?.title || "DELETED SLOT"}</strong>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
