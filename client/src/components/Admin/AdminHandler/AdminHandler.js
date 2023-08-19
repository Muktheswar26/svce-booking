
import React, { useEffect, useState } from 'react'

import './AdminHandler.css'


function AdminHandler() {
  const [usersData, setUsersData] = useState({});
  const getAllUsers = async () => {
    const response = await fetch(`https://svce-booking-default-rtdb.firebaseio.com/users.json`)
    if (response.ok) {
      const data = await response.json();
      setUsersData(data);
    } else {
      console.log("error")
    }
  }
  useEffect(() => {
    getAllUsers()
  }, [])


  return (
    <div className="App">
      <h1>User Data</h1>
      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Booking Status</th>
            <th>Date</th>
            <th>slot</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(usersData).map((key) => (
            <tr key={key}>
              <td>{usersData[key].userName}</td>
              <td>{usersData[key].userEmail}</td>
              <td>{usersData[key].booking ? ("booked"):("not yet booked")}</td>
              <td>{usersData[key].date}</td>
              <td>{usersData[key].slot}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminHandler