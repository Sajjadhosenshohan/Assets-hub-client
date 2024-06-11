import Heading from "../../Components/Heading";
const img = "https://i.ibb.co/YtNpft2/2151003713.jpg";
const NewsLetter = () => {
    const NewsLetter = true;
    return (
        <div className="rounded-md pt-12 my-24" style={{ backgroundImage: `url(${img})` }}>
            <Heading heading="Newsletter" NewsLetter={NewsLetter}></Heading>
            <section className="flex  flex-col  mx-auto overflow-hidden text-black rounded-lg shadow-lg  md:flex-row md:h-48">
                <div className="md:flex md:items-center md:justify-center md:w-1/2 w-1/2 mx-auto text-center">
                    <div className="px-2 py-6 md:px-8 md:py-0">
                        <h2 className="text-2xl text-slate-300 font-bold ">Sign Up For <span className="text-primary">Project</span> Updates</h2>

                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 md:text-gray-400">Stay with us . please subscribe to be updated</p>
                    </div>
                </div>

                <div className="flex items-center justify-center pb-6 md:py-0 md:w-1/2">
                    <form>
                        <div className=" flex flex-col p-1.5 overflow-hidden border rounded-lg dark:border-gray-600 lg:flex-row focus-within:ring focus-within:ring-opacity-40 focus-within:border-primary focus-within:ring-primary">
                            <input className="rounded-md md:rounded-r-none px-6 py-2 text-gray-700 placeholder-gray-500 bg-gray-100 outline-none  focus:placeholder-transparent dark:focus:placeholder-transparent" type="text" name="email" placeholder="Enter your email" aria-label="Enter your email" />

                            <button className="md:px-4 md:py-3  tracking-wider   transition-colors duration-300 transform   focus:bg-gray-600 focus:outline-none md:text-2xl p-2 text-center rounded-lg md:rounded-l-none  font-bold bg-primary hover:bg-green-800 text-white">Subscribe</button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default NewsLetter;