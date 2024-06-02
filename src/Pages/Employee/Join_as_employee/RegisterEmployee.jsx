import { Link, useNavigate, } from 'react-router-dom'
import useAxiosPublic from '../../../Hooks/useAxiosPublic'
import { FcGoogle } from 'react-icons/fc'
import useAuth from '../../../Hooks/useAuth'
import toast from 'react-hot-toast'

const RegisterEmployee = () => {

    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()

    const { createUser, signInWithGoogle } = useAuth()

    const handleSignUp = e => {
        e.preventDefault();
        const form = e.target
        const email = form.email.value
        const name = form.fullName.value
        const password = form.password.value
        const date_of_birth = form.date_of_birth.value

        console.log(email, password, name, date_of_birth)

        createUser(email, password)
            .then(res => {
                console.log(res.user)

                const info = {
                    name,
                    email,
                    role: "employee",
                    affiliate: false,
                    
                }
                // updateUserProfile(name, PhotoURL)
                //     .then(() => {
                //         console.log("user update")

                //         const info = {
                //             name,
                //             email
                //         }
                //         axiosPublic.post("/users", info)
                //             .then(res => {
                //                 // console.log(res.data)
                //                 if (res.data.insertedId) {
                //                     Swal.fire({
                //                         title: "User updated successfully",
                //                         showClass: {
                //                             popup: `
                //                         animate__animated
                //                         animate__fadeInUp
                //                         animate__faster
                //                       `
                //                         },
                //                         hideClass: {
                //                             popup: `
                //                         animate__animated
                //                         animate__fadeOutDown
                //                         animate__faster
                //                       `
                //                         }
                //                     });
                //                 }
                //                 navigate("/")
                //             })
                //     })
                //     .catch((error) => {
                //         console.log(error.message)
                //     });
                axiosPublic.post("/users", info)
                    .then(res => {
                        // console.log(res.data)
                        if (res.data.insertedId) {
                            toast.success('user added to db successfully')
                        }
                        navigate("/")
                    })
            })
            .catch(error => console.log(error.message))
    }

    const googleSignUp = async () => {
        await signInWithGoogle()
            .then(result => {
                console.log(result.user);
                const info = {
                    name: result?.user?.displayName,
                    email: result?.user?.email,
                    role: "employee",
                    affiliate: false,
                }

                axiosPublic.post("/users", info)
                    .then(res => {
                        // console.log(res.data)
                        if (res.data.insertedId) {
                            toast.success('user added to db successfully')
                            navigate('/')
                        }
                    })
            })
            .catch(error => {
                // console.error(error)
                toast.error(error.message)
            })

    }

    return (
        <div className='flex justify-center items-center my-24'>
            <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
                <div className='mb-8 text-center'>
                    <h1 className='my-3 text-4xl font-bold'>Sign Up for Employee</h1>
                    <p className='text-sm text-gray-400'>Join as Employee</p>
                </div>
                <form onSubmit={handleSignUp}
                    className='space-y-6 ng-untouched ng-pristine ng-valid'
                >
                    <div className='space-y-4'>
                        <div>
                            <label htmlFor='email' className='block mb-2 text-sm'>
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
                                placeholder='*******'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary bg-gray-200 text-gray-900'
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor='Date of birth' className='block mb-2 text-sm'>
                            Date of birth
                        </label>
                        <input
                            type="date"
                            name='date_of_birth'

                            required
                            placeholder='Enter Your Email Here'
                            className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary bg-gray-200 text-gray-900'
                            data-temp-mail-org='0'
                        />
                    </div>
                    <div>
                        <button
                            type='submit'
                            className='bg-primary w-full rounded-md py-3 text-white'
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
                <div className='flex items-center pt-4 space-x-1'>
                    <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                    <p className='px-3 text-sm dark:text-gray-400'>
                        Sign up with social accounts
                    </p>
                    <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                </div>
                <div onClick={googleSignUp} className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'>
                    <FcGoogle size={32} />

                    <p>Continue with Google</p>
                </div>
                <p className='px-6 text-sm text-center text-gray-400'>
                    Already have an account?{' '}
                    <Link
                        to='/login'
                        className='hover:underline hover:text-rose-500 text-gray-600'
                    >
                        Login
                    </Link>
                    .
                </p>
            </div>
        </div>
    )
}

export default RegisterEmployee