import { useState } from "react";

const CheckUpdate = () => {
  const apiUrl = 'http://localhost:5012/staff';

  const [staffId, setStaffId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Admin");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [salary, setSalary] = useState("");
  const [result, setResult] = useState("");

  const updateStaff = async () => {
    const staffData = {
      firstName,
      lastName,
      age,
      email,
      role,
      phone,
      address,
      salary,
    };

    try {
      if (staffId) {
        const response = await fetch(`${apiUrl}/${staffId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(staffData),
        });
        const result = await response.json();
        setResult(JSON.stringify(result, null, 2));
      } else {
        setResult("Error: Staff ID is required for update.");
      }
    } catch (error) {
      setResult(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Update Staff</h1>

      <form id="staffForm" onSubmit={(e) => { e.preventDefault(); updateStaff(); }}>
        <h2>Update Staff Information</h2>
        <label htmlFor="staffId">Staff ID:</label>
        <input
          type="text"
          id="staffId"
          name="staffId"
          placeholder="Enter Staff ID to update"
          value={staffId}
          onChange={(e) => setStaffId(e.target.value)}
        />

        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          name="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="role">Role:</label>
        <select id="role" name="role" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="Admin">Admin</option>
          <option value="Trainer">Trainer</option>
          <option value="Receptionist">Receptionist</option>
        </select>

        <label htmlFor="phone">Phone:</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <label htmlFor="salary">Salary:</label>
        <input
          type="number"
          id="salary"
          name="salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />

        <button type="submit">Update</button>
      </form>

      <div id="result" className="result">
        <pre>{result}</pre>
      </div>
    </div>
  );
};

export default CheckUpdate;
