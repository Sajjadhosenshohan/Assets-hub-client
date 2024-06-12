import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom'
const ErrorPage = () => {
    const navigate = useNavigate()
    return (
        <section className='bg-white '>
            <Helmet>
                <title>Error Found</title>
            </Helmet>
            <div className='container flex items-center min-h-screen px-6 py-12 mx-auto'>
                <div className='flex flex-col items-center max-w-sm mx-auto text-center'>
                    <p className=''>

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-40 h-40 dark:text-gray-400">
                            <path fill="currentColor" d="M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z"></path>
                            <rect width="176" height="32" x="168" y="320" fill="currentColor"></rect>
                            <polygon fill="currentColor" points="210.63 228.042 186.588 206.671 207.958 182.63 184.042 161.37 162.671 185.412 138.63 164.042 117.37 187.958 141.412 209.329 120.042 233.37 143.958 254.63 165.329 230.588 189.37 251.958 210.63 228.042"></polygon>
                            <polygon fill="currentColor" points="383.958 182.63 360.042 161.37 338.671 185.412 314.63 164.042 293.37 187.958 317.412 209.329 296.042 233.37 319.958 254.63 341.329 230.588 365.37 251.958 386.63 228.042 362.588 206.671 383.958 182.63"></polygon>
                        </svg>

                    </p>
                    <h1 className='mt-3 text-2xl font-semibold text-gray-800  md:text-3xl'>
                    404
                    </h1>
                    <h1 className='mt-3 text-2xl font-semibold text-gray-800  md:text-3xl'>
                    Sorry, we could not find this page.
                    </h1>
                    <p className='mt-4 text-gray-500 '>Here are some helpful links:</p>

                    <div className='flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto'>
                        <button
                            onClick={() => navigate(-1 || '/')}
                            className='flex items-center justify-center font-bold text-white text-xl py-4 px-6 rounded-lg bg-[#23BE0A]'
                        >
                            <svg 
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth='1.5'
                                stroke='currentColor'
                                className='w-6 h-6 rtl:rotate-180 text-white mr-2'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18'
                                />
                            </svg>

                            <span>Go back</span>
                        </button>

                        <button onClick={() => navigate('/')} className='bg-violet-500  flex items-center justify-center font-bold text-white text-xl py-4 px-6 rounded-lg '>Back Home</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ErrorPage;