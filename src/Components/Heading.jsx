
const Heading = ({heading, count}) => {
    return (
        <div>
            <h2 className="text-3xl font-bold mb-10 text-center text-primary">---{heading}---
                {
                    count && `(${count})`
                }
            </h2>
        </div>
    );
};

export default Heading;