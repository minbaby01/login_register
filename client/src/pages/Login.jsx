import { useState } from "react";
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { loginAPI } from "../util/api";
import Cookies from "js-cookie";
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
            const response = await loginAPI(email, password);
            if (response.status != 200) {
                toast.error(response.data)
            } else {
                Cookies.set('access_token', response.data.access_token, {
                    path: '/',
                    expires: new Date(Date.now() + 60 * 60 * 1000),
                });
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