import { useState, useEffect } from "react";

const Checkread = () => {
  const apiUrl = 'http://localhost:5012/staff';

  const [staffId, setStaffId] = useState("");
  const [staffList, setStaffList] = useState([]);
  const [setSingleStaff] = useState(null);
  const [result, setResult] = useState("");

  // Fetch all staff members
  const getAllStaff = async () => {
    try {
      const response = await fetch(apiUrl);
      const result = await response.json();
      setStaffList(result);
      setResult(JSON.stringify(result, null, 2));
    } catch (error) {
      setResult(`Error: ${error.message}`);
    }
  };

  // Fetch a single staff member by ID
  const getStaffById = async () => {
    try {
      if (staffId) {
        const response = await fetch(`${apiUrl}/${staffId}`);
        const result = await response.json();
        setSingleStaff(result);
        setResult(JSON.stringify(result, null, 2));
      } else {
        setResult("Error: Staff ID is required to fetch a staff member.");
      }
    } catch (error) {
      setResult(`Error: ${error.message}`);
    }
  };

  // Fetch all staff members on component mount
  useEffect(() => {
    getAllStaff();
  }, []);

  return (
    <div>
      <h1>Staff Management</h1>

      <form id="getStaffByIdForm" onSubmit={(e) => { e.preventDefault(); getStaffById(); }}>
        <h2>Get Staff by ID</h2>
        <label htmlFor="staffId">Staff ID:</label>
        <input
          type="text"
          id="staffId"
          name="staffId"
          placeholder="Enter Staff ID"
          value={staffId}
          onChange={(e) => setStaffId(e.target.value)}
        />
        <button type="submit">Get Staff</button>
      </form>

      <div id="result" className="result">
        <h2>Result</h2>
        <pre>{result}</pre>
      </div>

      <div id="allStaff" className="all-staff">
        <h2>All Staff Members</h2>
        <ul>
          {staffList.map(staff => (
            <li key={staff._id}>
              {staff.firstName} {staff.lastName} - {staff.role}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Checkread;
