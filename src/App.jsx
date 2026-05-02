import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "./api/usersApi";
import "./styles.css";

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
    setPage(1); 
  }, 500);

  return () => clearTimeout(timer);
}, [search]);

  if (isLoading) return <h2 className="center">Loading...</h2>;
  if (isError) return <h2 className="center">Error: {error.message}</h2>;
const totalPages = Math.ceil(data.total / 10);
const filteredUsers = data.users.filter((user) =>
  `${user.firstName} ${user.lastName}`
    .toLowerCase()
    .includes(debouncedSearch.toLowerCase())
);
  return (
    
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
        <p>
          <strong>
            {user.firstName} {user.lastName}
          </strong>
        </p>
        <p>{user.email}</p>
      </div>
    ))
  )}
</div>

       {!debouncedSearch && (
  <div className="pagination">
    {page > 1 && (
      <button
        className="btn"
        onClick={() => setPage((p) => Math.max(p - 1, 1))}
      >
        Previous
      </button>
    )}

    <span>Page {page}</span>

    {page < totalPages && (
      <button
        className="btn"
        onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
      >
        Next
      </button>
    )}
  </div>
)}

      
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
    
  );
}

export default App;