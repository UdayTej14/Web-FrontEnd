import React, {useContext, useState, useEffect} from 'react'
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

export const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}){
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true);

   // Initialize user state from the token in localStorage
   useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token)
    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            // Check if the token has expired
            if (decodedToken.exp * 1000 > Date.now()) {
                setUser({
                    id: decodedToken.id,
                    email: decodedToken.email,
                    name: decodedToken.name, // Add any fields you encoded in the token
                });
            } else {
                localStorage.removeItem('token'); // Remove expired token
            }
        } catch (err) {
            console.error('Error decoding token:', err);
            localStorage.removeItem('token'); // Remove invalid token
        }
    }

    setLoading(false); // Mark initialization as complete
}, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:5010/api/auth/login', {
                email,
                password,
              });
    
              setUser(response.data.user)
              // Store the JWT token in local storage
          localStorage.setItem('token', response.data.token);
        } catch(error)
        {
            console.error(error.message)
        }
    }

    const logout = () => {
        setUser()
        localStorage.removeItem('token');
    }

    const value = {
        login, user,logout
    }

    return <AuthContext.Provider value={value}>
    {!loading && children}
</AuthContext.Provider>
}