import React, { useEffect, useState } from "react";
import { toast } from 'react-hot-toast';
import { validateEmail, validatePassword } from "../util/validation";
import { getAllUsersAPI, getUserAPI, createUserAPI, updateUserAPI, deleteUserAPI } from "../util/api";

export default function User() {
    const roleNames = {
        0: "Admin",
        1: "User",
        2: "Staff"
    };

    const [usersTable, setUserTable] = useState([]);
    const [data, setData] = useState({
        id: null,
        name: "",
        email: "",
        password: "",
        role: "1"
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const getAllUsers = async () => {
            try {
                const response = await getAllUsersAPI();
                setUserTable(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        getAllUsers();
    }, []);


    const formUser = async (e) => {
        e.preventDefault();

        const { id, name, email, password, role } = data;

        if (!validateEmail(email)) {
            return toast.error("Invalid email");
        }

        // if (!validatePassword(password)) {
        //     return toast.error("Invalid password");
        // }

        try {
            if (id) {
                await updateUserAPI(id, name, email, password, role);
                toast.success("user updated successfully");
            } else {
                await createUserAPI(name, email, password, role);
                toast.success("user created successfully");
            }

            setData({ id: null, name: "", email: "", password: ""});
            setIsEditing(false);

            const response = await getAllUsersAPI();
            setUserTable(response.data);

        } catch (error) {
            console.log(error);
            toast.error(error.response.data);
        }
    }

    const editUser = async (id) => {
        try {
            const { data: user } = await getUserAPI(id);
            setData({ ...user, id, password: "" });
            setIsEditing(true);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteUser = async (id) => {
        try {
            await deleteUserAPI(id);
            toast.success("user deleted successfully");
            setUserTable(usersTable.filter(user => user._id !== id));
        } catch (error) {
            console.log(error);
            toast.error("An error occurred");
        }
    }

    return (
        <>
            <form onSubmit={formUser}>
                <label htmlFor="name" className="form-label">Name</label>
                <input
                    type="text"
                    className="form-control"
                    name="name"
                    id="name"
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
                    value={data.email}
                    onChange={(e) => setData((prev) => ({ ...prev, email: e.target.value }))}
                    required
                />
                <label htmlFor="password" className="form-label">Password</label>
                <input
                    type="password"
                    className="form-control"
                    name="password"
                    id="password"
                    value={data.password}
                    onChange={(e) => setData((prev) => ({ ...prev, password: e.target.value }))}
                    required={!isEditing}
                />
                <label htmlFor="role" className="form-label">Role</label>
                <select
                    name="role"
                    id="role"
                    value={data.role}
                    onChange={(e) => setData((prev) => ({ ...prev, role: e.target.value }))}
                >
                    <option value="0">Admin</option>
                    <option value="1">User</option>
                </select>

                <button type="submit">{isEditing ? "Update" : "Create"}</button>
                {isEditing && <button type="button"
                    onClick={() => {
                        setData({ name: "", email: "", password: "", id: null, role: "" });
                        setIsEditing(false);
                    }
                    }>Cancel</button>}
            </form>

            <div>
                <table>
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                            <th scope="col">Create At</th>
                            <th scope="col">Update At</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersTable.map(user => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{roleNames[user.role]}</td>
                                <td>{user.createdAt}</td>
                                <td>{user.updatedAt}</td>
                                <td><button onClick={() => editUser(user._id)}>Edit</button></td>
                                <td><button onClick={() => deleteUser(user._id)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
