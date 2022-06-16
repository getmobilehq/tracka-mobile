import React, {
  createContext,
  useContext,
  useMemo,
  useEffect,
  useState,
} from "react";
import AllocationServices from "../../services/AllocationServices";

const AllocationsContext = createContext();

const AllocationsProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState(1);
  const [allocations, setAllocations] = useState([]);
  const [pageDetails, setPageDetails] = useState({});

  const fetchPage = async (page = 1) => {
    setIsLoading(true);
    const response = await AllocationServices.getAllocation(page);

    setIsLoading(false);

    setAllocations((prevAllocations) => [
      ...prevAllocations,
      ...response.data.rows,
    ]);

    setPageDetails({
      ...response.data,
      per_page: response.data.limit,
      total: response.data.count,
      current_page: response.data.page,
    });

    return response;
  };

  useEffect(() => {
    fetchPage();
  }, []);

  const handlePageChange = async (page) => {
    setCurrentPage(page);

    page > pageDetails.current_page && fetchPage(page);
  };

  const pageSize = pageDetails?.per_page;
  const totalCount = pageDetails?.total;

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return allocations.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, pageSize, allocations]);

  return (
    <AllocationsContext.Provider
      value={{
        data: pageDetails,
        currentPage,
        allocations,
        loading: isLoading,
        // refetchData,
        totalCount,
        pageSize,
        currentTableData,
        handlePageChange,
      }}
    >
      {children}
    </AllocationsContext.Provider>
  );
};

export function useAllocationsContext() {
  const context = useContext(AllocationsContext);

  if (context === undefined) {
    throw new Error(
      "useAllocationsContext should be used within a AllocationsProvider"
    );
  }

  return context;
}

export default AllocationsProvider;
