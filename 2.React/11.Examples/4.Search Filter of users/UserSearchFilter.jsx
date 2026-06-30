import React, { useState } from "react";

const users = [
  { id: 1, name: "John Smith", email: "john@example.com" },
  { id: 2, name: "Sarah Johnson", email: "sarah@example.com" },
  { id: 3, name: "Michael Brown", email: "michael@example.com" },
  { id: 4, name: "Emily Davis", email: "emily@example.com" },
  { id: 5, name: "David Wilson", email: "david@example.com" },
];

function UserSearchFilter() {
  const [searchText, setSearchText] = useState("");

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchText.trim().toLowerCase()),
  );

  return (
    <div data-testid="user-search-container">
      <h2 data-testid="user-search-title">User Search</h2>

      <input
        data-testid="search-input"
        type="text"
        placeholder="Search users..."
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
      />

      <ul data-testid="user-list">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <li key={user.id} data-testid={`user-item-${user.id}`}>
              <strong data-testid={`user-name-${user.id}`}>{user.name}</strong>{" "}
              - <span data-testid={`user-email-${user.id}`}>{user.email}</span>
            </li>
          ))
        ) : (
          <li data-testid="no-users-message">No users found</li>
        )}
      </ul>
    </div>
  );
}

export default UserSearchFilter;
