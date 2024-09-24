import { useState } from "react";
import "./App.css"; // Import the CSS file for styling
import { users } from "./data/users"; // Adjust the path if necessary

function App() {
  // State for active filter
  const [activeFilter, setActiveFilter] = useState("all");
  // State for input value for the age filter
  const [ageInput, setAgeInput] = useState("");

  // Function to filter and sort users
  const getFilteredUsers = () => {
    let filteredUsers = [...users]; // Create a copy of users array to avoid mutation

    // Apply filters based on the active button
    if (activeFilter === "women") {
      filteredUsers = filteredUsers.filter((user) => user.gender === "female");
    } else if (activeFilter === "men") {
      filteredUsers = filteredUsers.filter((user) => user.gender === "male");
    } else if (activeFilter === "byName") {
      filteredUsers.sort((a, b) => a.name.first.localeCompare(b.name.first));
    } else if (activeFilter === "byAge") {
      filteredUsers.sort((a, b) => a.dob.age - b.dob.age);
    } else if (activeFilter === "olderThan" && ageInput) {
      filteredUsers = filteredUsers.filter(
        (user) => user.dob.age > parseInt(ageInput, 10)
      );
    }

    return filteredUsers;
  };

  const filteredUsers = getFilteredUsers(); // Local variable to store filtered array

  return (
    <div className="app-container">
      {/* Filter Buttons */}
      <div className="filter-buttons">
        <button
          onClick={() => setActiveFilter("all")}
          className={activeFilter === "all" ? "active" : ""}
        >
          All
        </button>
        <button
          onClick={() => setActiveFilter("women")}
          className={activeFilter === "women" ? "active" : ""}
        >
          Women
        </button>
        <button
          onClick={() => setActiveFilter("men")}
          className={activeFilter === "men" ? "active" : ""}
        >
          Men
        </button>
        <button
          onClick={() => setActiveFilter("byName")}
          className={activeFilter === "byName" ? "active" : ""}
        >
          By Name
        </button>
        <button
          onClick={() => setActiveFilter("byAge")}
          className={activeFilter === "byAge" ? "active" : ""}
        >
          By Age
        </button>
      </div>

      {/* Additional Filter: Users older than input */}
      <div className="age-filter">
        <input
          type="number"
          value={ageInput}
          onChange={(e) => setAgeInput(e.target.value)}
          placeholder="Enter age"
        />
        <button onClick={() => setActiveFilter("olderThan")}>
          Users older than...
        </button>
      </div>

      {/* User List */}
      <div className="user-list">
        {filteredUsers.map((user) => (
          <div key={user.login.uuid} className="user-card">
            <img src={user.picture.thumbnail} alt={user.name.first} />
            <p>
              {user.name.first} {user.name.last} - Age: {user.dob.age}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
