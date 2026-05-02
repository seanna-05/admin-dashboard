import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "./api/usersApi";

function App() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const { data, isLoading, isError, error } = useQuery({
  queryKey: ["users", page],
  queryFn: fetchUsers,
  retry: 1,
});

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>Error: {error.message}</h2>;
  if (!data) return <h2>Loading...</h2>; 
  return (
    <>
      <div style={{ padding: "20px", maxWidth: "800px", margin:"auto" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "20px"  }}>Admin Dashboard</h1>

        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            width: "100%",
            borderRadius: "8px",
            border: "1px solid #cc",
            marginBottom: "20px",
          }}
        />

        <div style={{ display: "grid", gap: "10px" }}>
          {data.users
            .filter((user) =>
              `${user.firstName} ${user.lastName}`
                .toLowerCase()
                .includes(debouncedSearch.toLowerCase())
            )
            .map((user) => (
              <div
                key={user.id}
                onClick={() => setSelectedUser(user)}
                style={{
                  border: "1px solid #e0e0e0",
                  padding: "15px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  transition: "0.2s"
                }}
              >
                <p>
                  <strong>
                    {user.firstName} {user.lastName}
                  </strong>
                </p>
                <p>{user.email}</p>
              </div>
            ))}
        </div>

        <div style={{ marginTop: "20px" }}>
          <button style={{
            padding: "8px 12px",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#007bff",
            color: "white",
            cursor: "pointer",
          }} 
          onClick={() => setPage((p) => Math.max(p - 1, 1))}>
            Previous
          </button>

          <span style={{ margin: "0 10px" }}>Page {page}</span>

          <button onClick={() => setPage((p) => p + 1)}>Next</button>
        </div>
      </div>

      {/* MODAL */}
      {selectedUser && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              width: "300px",
            }}
          >
            <h2>User Details</h2>

            <p>
              <strong>Name:</strong> {selectedUser.firstName}{" "}
              {selectedUser.lastName}
            </p>

            <p>
              <strong>Email:</strong> {selectedUser.email || "N/A"}
            </p>

            <p>
              <strong>Phone:</strong> {selectedUser.phone || "N/A"}
            </p>

            <button onClick={() => setSelectedUser(null)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;