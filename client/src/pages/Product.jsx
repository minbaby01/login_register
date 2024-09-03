import React, { useEffect, useState } from "react";
import { toast } from 'react-hot-toast';
import { getAllProductsAPI, getProductAPI, createProductAPI, updateProductAPI, deleteProductAPI } from "../util/api.js";

export default function Product() {
    const [productsTable, setProductTable] = useState([]);
    const [data, setData] = useState({
        id: null,
        name: "",
        price: "",
        quantity: "",
        description: ""
    });
    const [isEditing, setIsEditing] = useState(false);

    const getAllProducts = async () => {
        try {
            const response = await getAllProductsAPI();
            if (response.status != 200) {
                toast.error(response.data.message)
            } else {
                setProductTable(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllProducts();
    }, []);

    const createProduct = async (e) => {
        e.preventDefault();

        const { name, price, quantity, description, id } = data;

        try {
            if (id) {
                await updateProductAPI(id, name, price, quantity, description);
                toast.success("Product updated successfully");
            } else {
                await createProductAPI(name, price, quantity, description);
                toast.success("Product created successfully");
            }

            setData({id: null,  name: "", price: "", quantity: "", description: ""});
            setIsEditing(false);

            getAllProducts();

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    const editProduct = async (id) => {
        try {
            const { data: product } = await getProductAPI(id);
            setData({ ...product, id });
            setIsEditing(true);
        } catch (error) {
            console.log(error);
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
            <form onSubmit={createProduct}>
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
                <label htmlFor="price" className="form-label">Price</label>
                <input
                    type="number"
                    className="form-control"
                    name="price"
                    id="price"
                    placeholder=""
                    value={data.price}
                    onChange={(e) => setData((prev) => ({ ...prev, price: e.target.value }))}
                    required
                />
                <label htmlFor="quantity" className="form-label">Quantity</label>
                <input
                    type="number"
                    className="form-control"
                    name="quantity"
                    id="quantity"
                    placeholder=""
                    value={data.quantity}
                    onChange={(e) => setData((prev) => ({ ...prev, quantity: e.target.value }))}
                    required
                />
                <label htmlFor="description" className="form-label">Description</label>
                <input
                    type="text"
                    className="form-control"
                    name="description"
                    id="description"
                    placeholder=""
                    value={data.description}
                    onChange={(e) => setData((prev) => ({ ...prev, description: e.target.value }))}
                    required
                />

                <button type="submit">{isEditing ? "Update" : "Create"}</button>
                {isEditing && <button type="button"
                    onClick={() => {
                        setData({ name: "", price: "", quantity: "", description: "", id: null });
                        setIsEditing(false);
                    }
                    }>Cancel</button>}
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
                                <td><button onClick={() => editProduct(item._id)}>Edit</button></td>
                                <td><button onClick={() => deleteProduct(item._id)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
