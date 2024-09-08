import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [score, setScore] = useState('');
  const [groupedUsers, setGroupedUsers] = useState([]); // State to hold grouped users

  const handleUserSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/users', { 
        name, 
        age: parseInt(age), 
        score: parseFloat(score)
      });

      setName('');
      setAge('');
      setScore('');

      alert("User added successfully!");

    } catch (error) {
      console.error("Error while sending data to the server:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleGroup = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users/age-group');
      
      setGroupedUsers(response.data);
      

    } catch (error) {
      console.error("Error while fetching grouped data:", error);
      alert("An error occurred while grouping users by age.");
    }
  };

  return (
    <>
      <h1>User and Post Management</h1>

      <form onSubmit={handleUserSubmit}>
        <h2>Add User</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Age"
          required
        />
        <input
          type="number"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          placeholder="Score"
          required
        />
        <button type="submit">Add User</button>
      </form>

      <button onClick={handleGroup}>Group Users By Age</button>

      <h2>Grouped Users by ascending Age and avg score</h2>
      <ul>
  {groupedUsers.map((group) => (
    <li key={group._id}>
      Age: {group._id}, Count: {group.count}, Avg Score: {group.avgscore.toFixed(2)}
    </li>
  ))}
</ul>
    </>
  );
}

export default App;
