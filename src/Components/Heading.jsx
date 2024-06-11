
const Heading = ({heading, count}) => {
    return (
        <div className="w-3/5 mx-auto">
            <h2 className="text-3xl mt-12 uppercase font-bold mb-10 text-center text-primary">---{heading}---
                {
                    count && `(${count})`
                }
            </h2>
        </div>
    );
};

export default Heading;