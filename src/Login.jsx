import { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [prn, setPrn] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the login data to the backend using axios
      const response = await axios.post('http://localhost:5000/login', { prn, password });

      // Log the successful response
      console.log('Login successful:', response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      console.error('Login error:', err);
    }
  };

  // Handle change in prn input
  const handleChangePrn = (e) => {
    setPrn(e.target.value);
  };

  // Handle change in name input
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            PRN:
            <input type="text" name="prn" value={prn} required onChange={handleChangePrn} />
          </label>
        </div>

        <div>
          <label>
           Password:
            <input type="text" name="password" value={password} required onChange={handleChangePassword} />
          </label>
        </div>

        <button type="submit">Login</button>
      </form>

      {/* Display error if any */}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
}
