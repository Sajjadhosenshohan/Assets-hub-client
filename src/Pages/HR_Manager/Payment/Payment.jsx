
const Payment = () => {
    return (
        <div className="mb-24">
            <h2 className="text-3xl mt-12 mb-10 text-center text-primary">Payment here</h2>
            <div className='flex  justify-center items-start '>
                {/* Product Type */}
                <div className='flex flex-col w-1/2'>
                    <select
                        name='product_type'
                        required
                        className='border p-2  border-primary input input-bordered input-success'
                    >
                        <option disabled>Our packages</option>
                        <option value='Returnable'>5 members for $5</option>
                        <option value='Non-returnable'>10 members for $8</option>
                        <option value='Non-returnable'>20 members for $15</option>

                    </select>
                </div>
            </div>
            <div className="flex justify-center mt-3">
                <button className=" font-medium text-white text-base md:text-xl md:pb-2 md:px-4 py-1 px-1 rounded-lg bg-primary text-center">
                    Pay now
                </button>
            </div>
        </div>

    );
};

export default Payment;