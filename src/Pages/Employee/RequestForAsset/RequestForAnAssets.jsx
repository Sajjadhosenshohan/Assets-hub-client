import { RiArrowDropDownLine } from "react-icons/ri";

const RequestForAnAssets = () => {


    const handleSearch = () => {
        console.log("filter")
    }
    const handleFilter = () => {
        console.log("filter")
    }

    return (
        <div className="mt-12 mb-24">
            <h2 className="text-3xl mb-10 text-center text-primary">Request For An Asset</h2>

            {/* button  */}

            <div className="mt-8 mb-10 flex items-center gap-10 justify-center">


                <form onSubmit={handleSearch} className="flex">
                    <label className="input border-2 border-green-500 flex items-center gap-2">
                        <input type="text" name="search" className="grow" placeholder="Search items by it’s names" />

                    </label>
                    <button type="submit" className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transhtmlForm bg-green-500 rounded-md -ml-1 hover:bg-green-800 focus:outline-none focus:bg-green-800">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className=" w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                    </button>
                </form>

                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn m-1 font-bold text-white  bg-[#23BE0A]">
                        <h2>Filter Assets:</h2>
                        <RiArrowDropDownLine />
                    </div>


                    <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                    >

                        <li onClick={() => handleFilter('Available')}><a>Available</a></li>
                        <li onClick={() => handleFilter('Out-of-stock')}><a>Out-of-stock</a></li>
                        <li onClick={() => handleFilter('Returnable')}><a>Returnable</a></li>
                        <li onClick={() => handleFilter('Non-returnable')}><a>Non-returnable</a></li>
                    </ul>

                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Asset Name</th>
                            <th>Asset Type</th>
                            <th>Availability</th>
                            <th>Action</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        <tr>
                            <th>1</th>
                            <th>brush</th>
                            <th>non-returnable</th>
                            <td>out-of-stock</td>
                    
                            <td><button className="btn btn-error">Request</button></td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RequestForAnAssets;