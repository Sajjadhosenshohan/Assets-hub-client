import { Link, useLocation, useNavigate, } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import toast from 'react-hot-toast'
import useAxiosPublic from '../../Hooks/useAxiosPublic'
import useAuth from '../../Hooks/useAuth'
import { Helmet } from 'react-helmet-async'
import Swal from 'sweetalert2'



const LoginHR = () => {
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const { signIn, signInWithGoogle } = useAuth()

    const handleLogin = async (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        console.log(location)


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

        try {
            await signIn(email, password)
                .then(result => {
                    const user = result.user;
                    console.log(user);

                    const info = {
                        name: result?.user?.displayName,
                        email: result?.user?.email,
                        profileImage: result.user?.photoURL,
                        role: "employee",
                        affiliate: "no",
                        payment: "no"

                    }
                    axiosPublic.post("/users", info)
                        .then(res => {
                            // console.log(res.data)
                            if (res.data.insertedId) {
                                toast.success('successfully login')

                                // navigate('/')
                            }

                            navigate(from);
                        })

                })
        }
        catch (err) {
            toast.error(err.message)
        }
    }

    const googleSignUp = async () => {
        await signInWithGoogle()
            .then(result => {
                console.log(result.user);
                const info = {
                    name: result?.user?.displayName,
                    email: result?.user?.email,
                    profileImage: result.user?.photoURL,
                    role: "employee",
                    affiliate: "no",
                    payment: "no"

                }

                console.log(info)

                axiosPublic.post("/users", info)
                    .then(res => {
                        // console.log(res.data)
                        if (res.data.insertedId) {
                            toast.success('successfully login')
                        }
                        navigate(from);
                    })
            })
            .catch(error => {
                toast.error(error.message)
            })

    }

    return (
        <div className='flex justify-center items-center mb-12 mt-24'>

            <Helmet>
                <title>Login</title>
            </Helmet>

            <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
                <div className='mb-8 text-center'>
                    <h1 className='my-3 text-4xl font-bold'>Log In </h1>
                </div>
                <form
                    onSubmit={handleLogin}
                    className='space-y-6 ng-untouched ng-pristine ng-valid'
                >
                    <div className='space-y-4'>
                        <div>
                            <label htmlFor='email' className='block mb-2 text-sm'>
                                Email address
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
                                autoComplete='current-password'
                                id='password'
                                required
                                placeholder='Enter your password'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary bg-gray-200 text-gray-900'
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type='submit'
                            className='bg-primary w-full rounded-md py-3 text-white'
                        >
                            Continue
                        </button>
                    </div>
                </form>
                {/* <div className='space-y-1'>
                    <button className='text-xs hover:underline hover:text-rose-500 text-gray-400'>
                        Forgot password?
                    </button>
                </div> */}
                <div className='flex items-center pt-4 space-x-1'>
                    <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                    <p className='px-3 text-sm dark:text-gray-400'>
                        Login with social accounts
                    </p>
                    <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                </div>
                <div onClick={googleSignUp} className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'>
                    <FcGoogle size={32} />

                    <p>Continue with Google</p>
                </div>
                <p className='px-6 text-sm text-center text-gray-400'>
                    Don&apos;t have an account yet?{' '}
                    <Link
                        to='/registerEmployee'
                        className='hover:underline hover:text-primary text-gray-600'
                    >
                        Sign up
                    </Link>

                </p>
            </div>
        </div>
    )
}

export default LoginHR