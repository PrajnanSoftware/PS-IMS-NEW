// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import validator from 'validator';
// import Swal from 'sweetalert2';
// import './Register.css';

// export default function Register() {
//     const navigate = useNavigate();
//     const [username, setUsername] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [role, setRole] = useState("");
//     const [clientErrors, setClientErrors] = useState({});

//     // Validation logic
//     const runValidations = () => {
//         const errors = {};
//         if (username.trim().length === 0) {
//             errors.username = 'Username is required';
//         }
//         if (email.trim().length === 0) {
//             errors.email = 'Email is required';
//         } else if (!validator.isEmail(email)) {
//             errors.email = 'Invalid email format';
//         }
//         if (password.trim().length === 0) {
//             errors.password = 'Password is required';
//         } else if (password.trim().length < 8 || password.trim().length > 128) {
//             errors.password = 'Password should be between 8 - 128 characters';
//         }
//         if (role.trim().length === 0) {
//             errors.role = 'Role is required';
//         } else if (!['admin', 'manager', 'user'].includes(role)) {
//             errors.role = 'Role should be either admin or manager or user';
//         }
//         setClientErrors(errors);
//         return Object.keys(errors).length === 0;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const isValid = runValidations();

//         if (isValid) {
//             const formData = { username, email, password, role };

//             try {
//                 const response = await axios.post('http://localhost:8080/api/users/register', formData);
//                 console.log('Registration successful:', response.data);

//                 setUsername("");
//                 setEmail("");
//                 setPassword("");
//                 setRole("");

//                 // Show success alert
//                 Swal.fire({
//                     title: 'Success!',
//                     text: 'Registration has been successfully completed.',
//                     icon: 'success',
//                     confirmButtonText: 'OK'
//                 });

//                 navigate("/success");
//             } catch (error) {
//                 if (error.response) {
//                     console.error('Error during registration:', error.response.data);
//                     const serverErrors = error.response.data.errors;
//                     if (serverErrors.some(err => err.msg === 'Email is already exists')) {
//                         Swal.fire({
//                             title: 'Error!',
//                             text: 'Email already exists. Please use a different email.',
//                             icon: 'error',
//                             confirmButtonText: 'OK'
//                         });
//                     }
//                 } else {
//                     console.error('Error during registration:', error.message);
//                 }
//             }
//         }
//     };

//     return (
//         <div>
//             <h2>Register</h2>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Username</label>
//                     <input
//                         type="text"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                     />
//                     {clientErrors.username && <p>{clientErrors.username}</p>}
//                 </div>

//                 <div>
//                     <label>Email</label>
//                     <input
//                         type="text"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                     />
//                     {clientErrors.email && <p>{clientErrors.email}</p>}
//                 </div>

//                 <div>
//                     <label>Password</label>
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                     {clientErrors.password && <p>{clientErrors.password}</p>}
//                 </div>

//                 <div>
//                     <label>Select Role</label>
//                     <div>
//                         <input
//                             type="radio"
//                             value="admin"
//                             onChange={(e) => setRole(e.target.value)}
//                             checked={role === 'admin'}
//                         />
//                         <label>Admin</label>
//                     </div>
//                     <div>
//                         <input
//                             type="radio"
//                             value="manager"
//                             onChange={(e) => setRole(e.target.value)}
//                             checked={role === 'manager'}
//                         />
//                         <label>Manager</label>
//                     </div>
//                     <div>
//                         <input
//                             type="radio"
//                             value="user"
//                             onChange={(e) => setRole(e.target.value)}
//                             checked={role === 'user'}
//                         />
//                         <label>User</label>
//                     </div>
//                     {clientErrors.role && <p>{clientErrors.role}</p>}
//                 </div>

//                 <button type="submit">Submit</button>
//             </form>
//         </div>
//     );
// }
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import validator from 'validator';
import Swal from 'sweetalert2';
import worker from '../assets/worker.png';
import './Register.css';

export default function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [clientErrors, setClientErrors] = useState({});

    // Validation logic
    const runValidations = () => {
        const errors = {};
        if (username.trim().length === 0) {
            errors.username = 'Username is required';
        }
        if (email.trim().length === 0) {
            errors.email = 'Email is required';
        } else if (!validator.isEmail(email)) {
            errors.email = 'Invalid email format';
        }
        if (password.trim().length === 0) {
            errors.password = 'Password is required';
        } else if (password.trim().length < 8 || password.trim().length > 128) {
            errors.password = 'Password should be between 8 - 128 characters';
        }
        if (role.trim().length === 0) {
            errors.role = 'Role is required';
        } else if (!['admin', 'manager', 'user'].includes(role)) {
            errors.role = 'Role should be either admin or manager or user';
        }
        setClientErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = runValidations();

        if (isValid) {
            const formData = { username, email, password, role };

            try {
                const response = await axios.post('http://localhost:8080/api/users/register', formData);
                console.log('Registration successful:', response.data);

                setUsername("");
                setEmail("");
                setPassword("");
                setRole("");

                
                Swal.fire({
                    title: 'Success!',
                    text: 'Registration has been successfully completed.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });

                navigate("/success");
            } catch (error) {
                if (error.response) {
                    console.error('Error during registration:', error.response.data);
                    const serverErrors = error.response.data.errors;
                    if (serverErrors.some(err => err.msg === 'Email is already exists')) {
                        Swal.fire({
                            title: 'Error!',
                            text: 'Email already exists. Please use a different email.',
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                    }
                } else {
                    console.error('Error during registration:', error.message);
                }
            }
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    {clientErrors.username && <p>{clientErrors.username}</p>}
                </div>

                <div>
                    <label>Email</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {clientErrors.email && <p>{clientErrors.email}</p>}
                </div>

                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {clientErrors.password && <p>{clientErrors.password}</p>}
                </div>

                <div>
                    <label>Select Role</label>
                    <div>
                        
                        <input
                            type="radio"
                            value="admin"
                            onChange={(e) => setRole(e.target.value)}
                            checked={role === 'admin'}
                        />
                        <label>Admin</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            value="manager"
                            onChange={(e) => setRole(e.target.value)}
                            checked={role === 'manager'}
                        />
                        <label>Manager</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            value="user"
                            onChange={(e) => setRole(e.target.value)}
                            checked={role === 'user'}
                        />
                        <label>User</label>
                        
                    </div>
                    
                    {clientErrors.role && <p>{clientErrors.role}</p>}
                    
                </div>

                <button type="submit">Submit</button>
            </form>
            <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
    );
}
