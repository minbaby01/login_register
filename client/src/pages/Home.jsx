import React, { useState, useEffect } from "react";
import axios from "../util/axios.custom";
import { toast } from 'react-hot-toast';

function Home() {
    const [data, setData] = useState({
        name: 'Guest',
        email: '',
    });

    // useEffect(() => {
    //     const getProfile = async () => {
    //         try {
    //             const response = await axios.get('/profile');
    //             setData(response.data);

    //             if (response.data.error) {
    //                 toast.error(response.data.error);
    //             }
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     getProfile();
    // }, []);

    // const fetchData = async () => {
    //     try {
    //       const response = await fetch('https://ap-southeast-1.aws.data.mongodb-api.com/app/data-ohcyzup/endpoint/data/v1/action/find', {
    //         method: 'POST',
    //         headers: {
    //           'apiKey': 'yiXwHa31gLF55OIBBkdZ59t7b50Ii4mStBK2rD1FXsofiHVOOreQcki8QP7BcwF0',
    //           'Content-Type': 'application/json',
    //           'Accept': 'application/json'
    //         },
    //         body: JSON.stringify({
    //           "collection": "products",
    //           "database": "loginRegister",
    //           "dataSource": "Cluster0",
    //           "filter": {}
    //         })
    //       });
      
    //       if (!response.ok) {
    //         throw new Error(`HTTP error! status: ${response.status}`);
    //       }
      
    //       const data = await response.json();
    //       console.log(data);
    //       // Xử lý dữ liệu nhận được ở đây
    //     } catch (error) {
    //       console.error('Error fetching data:', error);
    //     }
    //   };
      
    //   fetchData();
      

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
