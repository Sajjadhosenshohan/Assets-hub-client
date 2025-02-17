import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useState } from "react";
import Swal from "sweetalert2";
import { useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const UpdateAsset = () => {
    const { _id,product_name, product_quantity, product_type, date_added: loadDate } = useLoaderData();
    // console.log(data)

    const axiosSecure = useAxiosSecure()
    const [startDate, setStartDate] = useState(new Date());

    const handleUpdate = async (e) => {
        e.preventDefault()
        console.log("submit")

        const form = e.target;
        const product_name = form.product_name.value;
        const product_quantity = form.product_quantity.value;
        const product_type = form.product_type.value;
        const date_added = startDate;

        const createData = {
            product_name,
            product_quantity,
            product_type,
            date_added
        }

        console.log(createData)
        try {
            
            // 
            const asset_update = await axiosSecure.patch(`/update/${_id}`, createData);
            console.log(asset_update.data)
            if (asset_update.data.modifiedCount > 0) {
                // show success popup
                // reset();
                // console.log(product_name)
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `${createData?.product_name} is updated to the menu.`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            // form.reset()
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div>
            <h2 className="text-3xl mt-12 mb-10 text-center text-primary">Update Asset</h2>
            <Helmet>
                <title>Asset Update</title>
            </Helmet>
            <div className='flex justify-center items-start min-h-[calc(100vh-306px)] w-full '>
                <section className='mb-24 w-full border-primary border-2 p-2 md:p-6 mx-auto  rounded-md shadow-md bg-secondary'>


                    <form onSubmit={handleUpdate}>
                        <div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'>

                            {/* product name */}
                            <div>
                                <label className='text-gray-700 ' htmlFor='product_name'>
                                    Product Name
                                </label>
                                <input
                                    name='product_name'
                                    defaultValue={product_name}
                                    type='text'
                                    required
                                    className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                                />
                            </div>




                            {/* Product Quantity*/}
                            <div>
                                <label className='text-gray-700 ' htmlFor='Product_quantity'>
                                    Product Quantity
                                </label>
                                <input
                                    name='product_quantity'
                                    type='number'
                                    defaultValue={product_quantity}
                                    required
                                    className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                                />
                            </div>


                            {/* Product Type */}
                            <div className='flex flex-col gap-2 '>
                                <label className='text-gray-700 '>
                                    Product Type
                                </label>
                                <select
                                    name='product_type'
                                    defaultValue={product_type}
                                    required
                                    className='border p-2 rounded-md'
                                >
                                    <option value='Returnable'>Returnable</option>
                                    <option value='Non-returnable'>Non-returnable</option>

                                </select>
                            </div>

                            <div className='flex flex-col gap-2 w-full'>
                                <label className='text-gray-700'>Date Added</label>
                                <DatePicker
                                    className='border p-2 rounded-md w-full'
                                    defaultValue={loadDate}
                                    selected={startDate}
                                    required
                                    onChange={date => setStartDate(date)}
                                />
                            </div>
                        </div>
                        <div className='mt-6'>
                            <button className='w-full px-8 py-2.5 leading-5 text-white transition-colors duration-300 transhtmlForm bg-primary rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600'>
                                Update
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default UpdateAsset;