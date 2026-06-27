import React, { useState } from "react";

function UserSearchFilter() {
  const [searchText, setSearchText] = useState("");

  const users = [
    { id: 1, name: "John Smith", email: "john@example.com" },
    { id: 2, name: "Sarah Johnson", email: "sarah@example.com" },
    { id: 3, name: "Michael Brown", email: "michael@example.com" },
    { id: 4, name: "Emily Davis", email: "emily@example.com" },
    { id: 5, name: "David Wilson", email: "david@example.com" },
  ];

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <h2>User Search</h2>

      <input
        type="text"
        placeholder="Search users..."
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
      />

      <ul>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <li key={user.id}>
              <strong>{user.name}</strong> - {user.email}
            </li>
          ))
        ) : (
          <li>No users found</li>
        )}
      </ul>
    </div>
  );
}

export default UserSearchFilter;