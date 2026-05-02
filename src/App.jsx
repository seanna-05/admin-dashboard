import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "./api/usersApi";
import "./styles.css";

function App() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const { data, isLoading, isError, error, refetch } = useQuery({
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

  if (isLoading) return <h2 className="center">Loading...</h2>;
  if (isError)
  return (
    <div className="center">
      <h2>Failed to load users!</h2>
      <p>{error.message}</p>

      <button className="btn" onClick={() => refetch()}>
        Retry
      </button>
    </div>
  );
const totalPages = Math.ceil(data.total / 10);
const filteredUsers = data.users.filter((user) =>
  `${user.firstName} ${user.lastName}`
    .toLowerCase()
    .includes(debouncedSearch.toLowerCase())
);
  return (
    <>
      <div className="container">
        <h1 className="title">Admin Dashboard</h1>

        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search"
        />

        <div className="grid">
  {filteredUsers.length === 0 ? (
    <p className="center">No users found</p>
  ) : (
    filteredUsers.map((user) => (
      <div
        key={user.id}
        className="card"
        onClick={() => setSelectedUser(user)}
      >
        <h3>
          {user.firstName} {user.lastName}
        </h3>
        <p>{user.email}</p>
      </div>
    ))
  )}
</div>

      {filteredUsers.length > 0 && (
  <div className="pagination">
    <button
      onClick={() => setPage((p) => Math.max(p - 1, 1))}
      className="btn"
    >
      Previous
    </button>

    <span>Page {page}</span>

    {page < totalPages && (
      <button
        className="btn"
        onClick={() =>
          setPage((prev) => Math.min(prev + 1, totalPages))
        }
      >
        Next
      </button>
    )}
  </div>
)}

      {/* MODAL */}
      {selectedUser && (
        <div className="modal-overlay">
          <div className="modal">
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

            <button className="btn close" onClick={() => setSelectedUser(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;