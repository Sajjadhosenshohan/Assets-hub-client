
const Pagination = ({handlePrevious,pages,currentPage,setCurrentPage,handleItemPerPage,itemsPerPage,handleNext}) => {
    return (
        <div className="flex w-full">
            <div className="pagination justify-center items-center shadow-lg   w-full  inline-flex  rounded-md ">
                <button type="button" onClick={handlePrevious} className="inline-flex items-center px-2 py-2 text-sm font-semibold  rounded-l-md ">
                    <span className="bg-primary px-2 py-2 rounded-md text-white">Previous</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="w-5 h-5">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                </button>


                {
                    pages.map((page, index) => <button
                        className={currentPage === page && 'selected inline-flex items-center px-4 py-2 text-sm font-semibold border'}
                        onClick={() => setCurrentPage(page)}
                        key={index}
                    >{page}</button>)
                }

                <select className="px-2 py-2  text-black capitalize border-primary border-2 rounded-md" onChange={handleItemPerPage} value={itemsPerPage}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                </select>

                <button type="button" onClick={handleNext} className="inline-flex items-center px-2 py-2 text-sm font-semibold rounded-r-md ">
                    <span className="bg-primary px-2 py-2 rounded-md text-white">Next</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="w-5 h-5">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Pagination;