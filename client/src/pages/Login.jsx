import { useState } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { loginAPI } from "../util/api";

function Login() {

    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const login = async (e) => {
        e.preventDefault();

        const { email, password } = data;

        try {
            const { data } = await loginAPI(email, password);
            if (data.error) {
                toast.error(data.error);
            } else {
                localStorage.setItem("access_token", data.access_token);
                toast.success("Login successfully");
                navigate('/');
            }

        } catch (error) {
            console.log(error);
        }
        
    }

    return (
        <form onSubmit={login}>
            <label>Email</label>
            <input type="email" placeholder="Enter your email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />

            <label>Password</label>
            <input type="password" placeholder="Enter your password" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />

            <button type="submit">Login</button>

        </form>
    )
}

export default Login