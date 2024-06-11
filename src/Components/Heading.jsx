
const Heading = ({heading, count,NewsLetter}) => {
    return (
        <div className=" md:w-3/5 mx-auto">
            <h2 className={`text-lg md:text-3xl  mt-12 uppercase font-bold mb-10 text-center ${NewsLetter ? "text-slate-200" : "text-primary"} `}>---{heading}---
                {
                    count && `(${count})`
                }
            </h2>
        </div>
    );
};

export default Heading;