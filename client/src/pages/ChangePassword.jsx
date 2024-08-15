import React, { useState } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

function ChangePassword() {

    const navigate = useNavigate();

    const [input, setInput] = useState({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    });

    const [error, setError] = useState({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    })

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));
        validateInput(e);
    };

    const validateInput = (e) => {
        let { name, value } = e.target;
        setError((prev) => {
            const stateObj = { ...prev, [name]: '' };

            switch (name) {
                case 'oldPassword':
                    if (!value) {
                        stateObj[name] = 'Please enter old password.';
                    }
                    break;

                case 'newPassword':
                    if (!value) {
                        stateObj[name] = 'Please enter new Password.';
                    } else if (input.confirmNewPassword && value !== input.confirmNewPassword) {
                        stateObj['confirmNewPassword'] =
                            'New Password and Confirm Password does not match.';
                    } else {
                        stateObj['confirmNewPassword'] = input.confirmNewPassword
                            ? ''
                            : error.confirmNewPassword;
                    }
                    break;

                case 'confirmNewPassword':
                    if (!value) {
                        stateObj[name] = 'Please enter Confirm Password.';
                    } else if (input.newPassword && value !== input.newPassword) {
                        stateObj[name] = 'New password and Confirm Password does not match.';
                    }
                    break;

                default:
                    break;
            }

            return stateObj;
        });
    };


    const changePassword = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get('/profile');

            const { data } = await axios.post('/changepassword', {
                _id: response.data.user,
                oldPassword: input.oldPassword,
                newPassword: input.newPassword
            });

            toast.success("successfully");
            navigate('/');

        } catch (error) {
            if (error.response) {
                const errorMessage = error.response.data.error || "An error occurred";
                toast.error(errorMessage);
            } else {
                toast.error("An error occurred");
            }
        }
    }

    return (
        <form onSubmit={changePassword}>
            <label>Old password</label>
            <input type="password" placeholder="Enter your old password" name="oldPassword" value={input.oldPassword} onChange={onInputChange} onBlur={validateInput} />
            {error.oldPassword && <span className='err'>{error.oldPassword}</span>}

            <br />

            <label>New password</label>
            <input type="password" placeholder="Enter your new password" name="newPassword" value={input.newPassword} onChange={onInputChange} onBlur={validateInput} />
            {error.newPassword && <span className='err'>{error.newPassword}</span>}

            <br />

            <label>Confirm password</label>
            <input type="password" placeholder="Confirm new password" name="confirmNewPassword" value={input.confirmNewPassword} onChange={onInputChange} onBlur={validateInput} />
            {error.confirmNewPassword && <span className='err'>{error.confirmNewPassword}</span>}

            <br />
            <button type="submit">Change password</button>
        </form>
    )
}

export default ChangePassword