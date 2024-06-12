import { Link, useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import useAxiosPublic from '../../Hooks/useAxiosPublic'
import useAuth from '../../Hooks/useAuth'
import axios from 'axios'
import Spinner from '../../Components/Spinner'
import { Helmet } from 'react-helmet-async'
import Swal from 'sweetalert2'

const RegisterHR = () => {
    const axiosPublic = useAxiosPublic()
    // const navigate = useNavigate()
    const navigate = useNavigate();
    const location = useLocation();
    const { createUser, setLoading, loading } = useAuth()

    const handleSignUp = async (e) => {
        setLoading(true)
        e.preventDefault();
        const form = e.target
        const email = form.email.value
        const name = form.fullName.value
        const password = form.password.value
        const Member_category = form.category.value
        const category = parseInt(Member_category);
        const date_of_birth = form.date_of_birth.value
        const companyName = form.companyName.value

        // Validation
        if (password.length < 6) {
            Swal.fire({
                icon: "error",
                title: "Please Enter A Password Of At Least 6 Characters",
            });
            return;
        } else if (!/[A-Z]/.test(password)) {
            Swal.fire({
                icon: "error",
                title: "Please Enter A Password Of At Least 1 Uppercase Character",
            });
            return;
        } else if (!/[a-z]/.test(password)) {
            Swal.fire({
                icon: "error",
                title: "Please Enter A Password Of At Least 1 Lowercase Character",
            });
            return;
        }
        // for company logo
        const companyLogo = form.image.files[0]
        const formData = new FormData()
        formData.append('image', companyLogo)

        // for profile pic
        const profileImage = form.profileImage.files[0]
        const formData2 = new FormData()
        formData2.append('image', profileImage)

        console.log(import.meta.env.VITE_IMGBB_API_KEY_Three)

        try {
            setLoading(true)
            const { data: logoData } = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
                formData
            )

            const { data: profileData } = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY_Three}`,
                formData2
            )

            // create user
            await createUser(email, password)
                .then(res => {
                    console.log(res.user)

                    const info = {
                        name,
                        email,
                        date_of_birth,
                        category,
                        companyName,
                        companyLogo: logoData?.data.display_url,
                        profileImage: profileData?.data.display_url,
                        role: "hr",
                        payment: "no"
                    }

                    axiosPublic.post("/users", info)
                        .then(res => {
                            if (res.data.insertedId) {
                                toast.success('Successfully register')
                            }
                            navigate(location?.state?.from || "/");
                            // navigate("/payment")
                            // setLoading(false)
                        })
                })

        } catch (err) {
            toast.error(err.message)
            setLoading(false)
        }
    }

    if (loading) return <Spinner />

    return (
        <div className='flex justify-center items-center mb-12 mt-24'>

            <Helmet>
                <title>Register Hr</title>
            </Helmet>
            <div className='flex flex-col p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
                <div className='mb-8 text-center'>
                    <h1 className='my-3 text-4xl font-bold'>Sign Up for HR</h1>
                </div>
                <form onSubmit={handleSignUp} className='space-y-6'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                        <div>
                            <label htmlFor='fullName' className='block mb-2 text-sm'>
                                Full Name
                            </label>
                            <input
                                type='text'
                                name='fullName'
                                placeholder='Enter Your Name Here'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary bg-gray-200 text-gray-900'
                                data-temp-mail-org='0'
                            />
                        </div>

                        <div>
                            <label htmlFor='companyName' className='block mb-2 text-sm'>
                                Company Name
                            </label>
                            <input
                                type='text'
                                name='companyName'
                                placeholder='Enter Your Company Name Here'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary bg-gray-200 text-gray-900'
                                data-temp-mail-org='0'
                            />
                        </div>

                        <div>
                            <label htmlFor='image' className='block mb-2 text-sm'>
                                Company Logo
                            </label>
                            <input
                                type='file'
                                name='image'
                                placeholder='Enter Your Company Logo Here'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary bg-gray-200 text-gray-900'
                                data-temp-mail-org='0'
                            />
                        </div>

                        <div>
                            <label htmlFor='profileImage' className='block mb-2 text-sm'>
                                Profile Picture
                            </label>
                            <input
                                type='file'
                                name='profileImage'
                                placeholder='Enter Your Profile Picture Here'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary bg-gray-200 text-gray-900'
                                data-temp-mail-org='0'
                            />
                        </div>

                        <div>
                            <label htmlFor='email' className='block mb-2 text-sm'>
                                Email
                            </label>
                            <input
                                type='email'
                                name='email'
                                required
                                placeholder='Enter Your Email Here'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary bg-gray-200 text-gray-900'
                                data-temp-mail-org='0'
                            />
                        </div>

                        <div>
                            <div className='flex justify-between'>
                                <label htmlFor='password' className='text-sm mb-2'>
                                    Password
                                </label>
                            </div>
                            <input
                                type='password'
                                name='password'
                                autoComplete='new-password'
                                required
                                placeholder='Enter your password'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary bg-gray-200 text-gray-900'
                            />
                        </div>

                        <div>
                            <label htmlFor='date_of_birth' className='block mb-2 text-sm'>
                                Date of Birth
                            </label>
                            <input
                                type="date"
                                name='date_of_birth'
                                required
                                placeholder='Enter Your Date of Birth Here'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary bg-gray-200 text-gray-900'
                                data-temp-mail-org='0'
                            />
                        </div>

                        <div>
                            <label htmlFor='category' className='block mb-2 text-sm'>
                                Category
                            </label>
                            <select defaultValue="default" name='category' className="select select-bordered w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary bg-gray-200 text-gray-900">
                                <option disabled value="default">Select a category</option>
                                <option value={5}>5 Members for $5</option>
                                <option value={8}>10 Members for $8</option>
                                <option value={15}>20 Members for $15</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <button type='submit' className='bg-primary w-full rounded-md py-3 text-white'>
                            Sign Up
                        </button>
                    </div>
                </form>

                <p className='px-6 py-5 text-sm text-center text-gray-400'>
                    Already have an account?{' '}
                    <Link to='/login' className='hover:underline hover:text-primary text-gray-600'>
                        Login
                    </Link>.
                </p>
            </div>
        </div>
    )
}

export default RegisterHR
