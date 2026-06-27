import React, { useEffect, useState } from "react";

function DebouncedSearchInput() {
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");

  const users = [
    { id: 1, name: "John Smith" },
    { id: 2, name: "Sarah Johnson" },
    { id: 3, name: "Michael Brown" },
    { id: 4, name: "Emily Davis" },
    { id: 5, name: "David Wilson" },
  ];

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchText]);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(debouncedSearchText.toLowerCase())
  );

  return (
    <div>
      <h2>Debounced Search</h2>

      <input
        type="text"
        placeholder="Search users..."
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
      />

      <p>Searching for: {debouncedSearchText}</p>

      <ul>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => <li key={user.id}>{user.name}</li>)
        ) : (
          <li>No users found</li>
        )}
      </ul>
    </div>
  );
}

export default DebouncedSearchInput;