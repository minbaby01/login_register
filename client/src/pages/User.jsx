import React, { useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function User() {
    const [usersTable, setUserTable] = useState([]);
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        id: null
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const getAllUsers = async () => {
            try {
                const responseAllUsers = await axios.get('/api/users');
                setUserTable(responseAllUsers.data);
            } catch (error) {
                console.log(error);
            }
        }
        getAllUsers();
    }, []);

    const createUser = async (e) => {
        e.preventDefault();

        const { name, email, password, id } = data;

        try {
            if (id) {
                await axios.put(`/api/users/${id}`, { name, email, password });
                toast.success("user updated successfully");
            } else {
                await axios.post('/api/users', { name, email, password });
                toast.success("user created successfully");
            }

            setData({ name: "", email: "", password: "", id: null });
            setIsEditing(false);

            const responseAllUsers = await axios.get('/api/users');
            setUserTable(responseAllUsers.data);

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    const editUser = async (id) => {
        try {
            const { data: user } = await axios.get(`/api/users/${id}`);
            setData({ ...user, id, password: "" });
            setIsEditing(true);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteUser = async (id) => {
        try {
            await axios.delete(`/api/users/${id}`);
            toast.success("user deleted successfully");
            setUserTable(usersTable.filter(user => user._id !== id));
        } catch (error) {
            console.log(error);
            toast.error("An error occurred");
        }
    }

    return (
        <>
            <form onSubmit={createUser}>
                <label htmlFor="name" className="form-label">Name</label>
                <input
                    type="text"
                    className="form-control"
                    name="name"
                    id="name"
                    placeholder=""
                    value={data.name}
                    onChange={(e) => setData((prev) => ({ ...prev, name: e.target.value }))}
                    required
                />
                <label htmlFor="email" className="form-label">Email</label>
                <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    placeholder=""
                    value={data.email}
                    onChange={(e) => setData((prev) => ({ ...prev, email: e.target.value }))}
                    required
                />
                <label htmlFor="password" className="form-label">Password</label>
                <input
                    type="password"
                    className="form-control"
                    name="description"
                    id="description"
                    placeholder=""
                    value={data.password}
                    onChange={(e) => setData((prev) => ({ ...prev, password: e.target.value }))}
                    required
                />

                <button type="submit">{isEditing ? "Update" : "Create"}</button>
                {isEditing && <button type="button"
                    onClick={() => {
                        setData({ name: "", email: "", password: "", id: null });
                        setIsEditing(false);
                    }
                }>Cancel</button>}
            </form>

            <div>
                <table>
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Password</th>
                            <th scope="col">Create At</th>
                            <th scope="col">Update At</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersTable.map(item => (
                            <tr key={item._id}>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.password}</td>
                                <td>{item.createdAt}</td>
                                <td>{item.updatedAt}</td>
                                <td><button onClick={() => editUser(item._id)}>Edit</button></td>
                                <td><button onClick={() => deleteUser(item._id)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
