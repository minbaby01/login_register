import React, { useState, useEffect } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';

function Home() {
    const [data, setData] = useState({
        name: 'Guest',
        email: '',
    });

    useEffect(() => {
        const getProfile = async () => {
            try {
                const response = await axios.get('/profile');
                setData(response.data);

                if (response.data.error) {
                    toast.error(response.data.error);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        getProfile();
    }, []);

    return (
        <div>
            <h1>Home</h1>
            <div>
                <div>
                    <p><strong>Name:</strong> {data.name}</p>
                    <p><strong>Email:</strong> {data.email}</p>
                </div>
            </div>
        </div>
    );
}

export default Home;
