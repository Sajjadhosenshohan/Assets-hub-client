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


    if (loading && isHRLoading || loading && isEmployeeLoading) return <Spinner></Spinner>
    // console.log(user)
    return (
        <div className="my-24">
            <section className="dark:bg-secondary text-black">
                <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
                    <form onSubmit={handleUpdate} className="w-full max-w-md">
                        <div className="flex items-center flex-col justify-center">
                            <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt="" />

                            <h1 className="mt-3 text-2xl font-semibold text-black capitalize sm:text-3xl ">Update Your Profile</h1>
                        </div>

                        <div className=" flex flex-col gap-5">
                            <input type="email" name="email" className="bg-slate-500" defaultValue={user?.email} id="" />
                            <input type="text" name="name" className="bg-slate-500" defaultValue={Hr_data?.name || user?.displayName} id="" />
                        </div>

                        <div className="mt-6">
                            <button type="submit" className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
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