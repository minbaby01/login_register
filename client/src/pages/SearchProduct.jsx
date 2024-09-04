import React, { useEffect, useState } from "react";
import { toast } from 'react-hot-toast';
import { deleteProductAPI, searchProductAPI } from "../util/api.js";

export default function SearchProduct() {
    const [productsTable, setProductTable] = useState([]);
    const [data, setData] = useState({
        name: "",
        category: "",
        minPrice: "",
        maxPrice: ""
    });

    const searchProduct = async (e) => {
        e.preventDefault();

        const { name, category, minPrice, maxPrice } = data;

        if (maxPrice && minPrice > maxPrice == false) {
            toast.error("WRONG max PRICE");
            return;
        }

        try {
            const response = await searchProductAPI(name, category, minPrice, maxPrice);

            if (response.status != 200) {
                toast.error(response.data.message)
            } else {
                setProductTable(response.data);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    const deleteProduct = async (id) => {
        try {
            await deleteProductAPI(id);
            toast.success("Product deleted successfully");
            setProductTable(productsTable.filter(product => product._id !== id));
        } catch (error) {
            console.log(error);
            toast.error("An error occurred");
        }
    }

    return (
        <>
            <form onSubmit={searchProduct}>
                <label htmlFor="name" className="form-label">Name</label>
                <input
                    type="text"
                    className="form-control"
                    name="name"
                    id="name"
                    placeholder=""
                    value={data.name}
                    onChange={(e) => setData((prev) => ({ ...prev, name: e.target.value }))}
                />
                <label htmlFor="minPrice" className="form-label">minPrice</label>
                <input
                    type="number"
                    className="form-control"
                    name="minPrice"
                    id="minPrice"
                    placeholder=""
                    value={data.minPrice}
                    onChange={(e) => setData((prev) => ({ ...prev, minPrice: e.target.value }))}
                />
                <label htmlFor="maxPrice" className="form-label">maxPrice</label>
                <input
                    type="number"
                    className="form-control"
                    name="maxPrice"
                    id="maxPrice"
                    placeholder=""
                    value={data.maxPrice}
                    onChange={(e) => setData((prev) => ({ ...prev, maxPrice: e.target.value }))}
                />

                <button type="submit">Search</button>
            </form>

            <div>
                <table>
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Description</th>
                            <th scope="col">Create At</th>
                            <th scope="col">Update At</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productsTable.map(item => (
                            <tr key={item._id}>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.quantity}</td>
                                <td>{item.description}</td>
                                <td>{item.createdAt}</td>
                                <td>{item.updatedAt}</td>
                                <td><button onClick={() => deleteProduct(item._id)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
