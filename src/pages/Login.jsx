import { useState } from 'react';
import { Link } from 'react-router-dom';
import validator from 'validator';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Login.css'

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [clientErrors, setClientErrors] = useState({});
    const [serverMessage, setServerMessage] = useState("");

    // Validation logic
    const runValidations = () => {
        const errors = {};

        if (email.trim().length === 0) {
            errors.email = 'Email is required';
        } else if (!validator.isEmail(email)) {
            errors.email = 'Invalid email format';
        }

        if (password.trim().length === 0) {
            errors.password = 'Password is required';
        } else if (password.trim().length < 8) {
            errors.password = 'Password must be at least 8 characters';
        }

        setClientErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = runValidations();

        if (isValid) {
            const formData = { email, password };

            try {
                // Send API request
                const response = await axios.post('http://localhost:8080/api/users/login', formData);
                console.log('Login successful:', response.data);

                setEmail("");
                setPassword("");

                // Show success alert
                Swal.fire({
                    title: 'Success!',
                    text: 'Login has been successfully completed.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });

                setServerMessage("Login successful!");
            } catch (error) {
                if (error.response) {
                    console.error('Error during login:', error.response.data);
                    setServerMessage(error.response.data.message || "Invalid email or password!");
                } else {
                    console.error('Error during login:', error.message);
                    setServerMessage("An error occurred during login. Please try again.");
                }
            }
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {serverMessage && (
                <div>
                    {serverMessage}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Enter Email</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"
                    />
                    {clientErrors.email && <div>{clientErrors.email}</div>}
                </div>

                <div>
                    <label htmlFor="password">Enter Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        id="password"
                    />
                    {clientErrors.password && <div>{clientErrors.password}</div>}
                </div>

                <button type="submit">Login</button>
            </form>

            <div>
                <p>
                    Don't have an account?{" "}
                    <Link to="/register">
                        Create an Account
                    </Link>
                </p>
            </div>
        </div>
    );
}
