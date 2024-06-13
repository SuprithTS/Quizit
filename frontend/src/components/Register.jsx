
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../app/Axios';
import './Register.css';

const Register = () => {
  const [name, setName] = useState('');
  const [usn, setUsn] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [year, setYear] = useState('');
  const [branch, setBranch] = useState('');
  const [cgpa, setCgpa] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = {
        name: name,
        usn: usn,
        phone: phone,
        email: email,
        year: year,
        branch: branch,
        cgpa: cgpa
      };

      const response = await axiosInstance.post('/api/users/register', data);
      //console.log(data); // Log the response data if needed
      setLoading(false);
      navigate(`/instructions?name=${name}&usn=${usn}`);
    } catch (error) {
      setLoading(false);
      if (error.response) {
        // The request was made and the server responded with a status code
        if (error.response.status === 409) {
          setError('A user with this information already exists.');
        } else if (error.response.status === 400) {
          setError('Invalid input. Please check your details and try again.');
        } else {
          setError('An error occurred. Please try again later.');
        }
      } else if (error.request) {
        // The request was made but no response was received
        setError('No response from the server. Please try again later.');
      } else {
        // Something else happened while setting up the request
        setError('An error occurred. Please check your network connection and try again.');
      }
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="registercontainer">
      <h2>ENTER DETAILS</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="text"
          value={usn}
          onChange={(e) => setUsn(e.target.value)}
          placeholder="USN"
          required
        />
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone Number"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <select value={year} onChange={(e) => setYear(e.target.value)} required>
          <option value="" disabled>Select Year</option>
          <option value="1st">1st</option>
          <option value="2nd">2nd</option>
        </select>
        <select value={branch} onChange={(e) => setBranch(e.target.value)} required>
          <option value="" disabled>Select Branch</option>
          <option value="CSE">CSE</option>
          <option value="ISE">ISE</option>
          <option value="AIDS">AIDS</option>
          <option value="AIML">AIML</option>
          <option value="EC">EC</option>
          <option value="EEE">EEE</option>
          <option value="EI">EI</option>
          <option value="ET">ET</option>
          <option value="CH">CH</option>
          <option value="BT">BT</option>
          <option value="ME">ME</option>
          <option value="CV">CV</option>
          <option value="IEM">IEM</option>
        </select>
        <input
          type="text"
          value={cgpa}
          onChange={(e) => setCgpa(e.target.value)}
          placeholder="CGPA"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Register'}
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Register;