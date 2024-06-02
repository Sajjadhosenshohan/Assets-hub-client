import { Puff } from 'react-loader-spinner';
const Spinner = () => {
    return (
        <div
            className={`h-[70vh]
          flex 
          flex-col 
          justify-center 
          items-center `}
        >
            <Puff
                visible={true}
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="puff-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    )
};

export default Spinner;