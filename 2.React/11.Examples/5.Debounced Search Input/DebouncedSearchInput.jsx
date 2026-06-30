import React, { useEffect, useState } from "react";

const users = [
  { id: 1, name: "John Smith" },
  { id: 2, name: "Sarah Johnson" },
  { id: 3, name: "Michael Brown" },
  { id: 4, name: "Emily Davis" },
  { id: 5, name: "David Wilson" },
];

function DebouncedSearchInput() {
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchText(searchText.trim());
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchText]);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(debouncedSearchText.toLowerCase()),
  );

  return (
    <div data-testid="debounced-search-container">
      <h2 data-testid="debounced-search-title">Debounced Search</h2>

      <input
        data-testid="search-input"
        type="text"
        placeholder="Search users..."
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
      />

      <p data-testid="searching-text">Searching for: {debouncedSearchText}</p>

      <ul data-testid="user-list">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <li key={user.id} data-testid={`user-item-${user.id}`}>
              {user.name}
            </li>
          ))
        ) : (
          <li data-testid="no-users-message">No users found</li>
        )}
      </ul>
    </div>
  );
}

export default DebouncedSearchInput;
