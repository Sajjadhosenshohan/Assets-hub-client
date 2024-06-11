import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useEmployeeData from "../../Hooks/useEmployeeData";
import useUserData from "../../Hooks/useHRData";
import Spinner from "../../Components/Spinner";

const UpdateProfile = () => {
    const { user, loading, setUser, updateUserProfile } = useAuth();
    const axiosSecure = useAxiosSecure()
    // hr hook
    const { userData: Hr_data, isLoading: isHRLoading, refetchHR } = useUserData();
    // employee hook
    const { userDataEmployee, isLoading: isEmployeeLoading, refetchEmployee } = useEmployeeData();

    const handleUpdate = async (e) => {
        e.preventDefault()
        const name = e.target.name.value;
        console.log(name)
        await updateUserProfile(name);
        await setUser((user) => {
            return { ...user, name: Hr_data?.name || userDataEmployee?.name };
        });

        // change user info in db too
        const { user } = await axiosSecure.patch(`/users_update/${Hr_data?.email || userDataEmployee?.email}`, { name: name })

        // console.log(data)
        if (user?.data?.modifiedCount > 0) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: `updated successfully`,
                showConfirmButton: false,
                timer: 1500
            });
        }
        refetchEmployee()
        refetchHR()


    }
    console.log(Hr_data)


    if (loading && isHRLoading || loading && isEmployeeLoading) return <Spinner></Spinner>
    // console.log(user)
    return (
        <div>
            <section className=" text-black mb-12 mt-24">
                <div className="container flex items-center justify-center  px-6 mx-auto">
                    <form onSubmit={handleUpdate} className="w-full max-w-md  p-6 drop-shadow-xl rounded-xl sm:px-12 bg-[#f2f2f2]">

                        <div className="flex items-center flex-col justify-center">
                            <div className="avatar online">
                                <div className="w-24 rounded-full">
                                    <img className="" src={user?.photoURL || Hr_data?.profileImage || userDataEmployee?.profileImage} alt="" />
                                </div>
                            </div>

                            <h1 className="my-5 text-lg bg-primary px-10 py-1  rounded-full font-semibold text-white capitalize "> {userDataEmployee?.role || Hr_data?.role}</h1>
                        </div>



                        <div className=" flex flex-col gap-5">
                            <input type="email" name="email" className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-primary focus:ring-primary focus:ring-opacity-40  focus:outline-none focus:ring' defaultValue={user?.email} id="" />


                            <input type="text" name="name" className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-primary focus:ring-primary focus:ring-opacity-40  focus:outline-none focus:ring' defaultValue={Hr_data?.name || user?.displayName} id="" />
                        </div>

                        <div className="mt-6">
                            <button type="submit" className='w-full px-8 py-2.5 leading-5 text-white transition-colors duration-300 transhtmlForm bg-primary rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600'>
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default UpdateProfile;