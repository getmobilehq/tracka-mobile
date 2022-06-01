import React, {
  useState,
  useEffect,
  useMemo,
  createContext,
  useContext,
} from "react";
import CommunityServices from "../../services/CommunityServices";

const CommunityContext = createContext();

const CommunityProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [communityNeeds, setCommunityNeeds] = useState([]);
  const [pageDetails, setPageDetails] = useState({});

  const fetchCommunityNeeds = async (limit = 10, page = 1) => {
    setLoading(true);
    const response = await CommunityServices.getAllCommunityNeeds(limit, page);

    setLoading(false);

    console.log({ page, response });

    setCommunityNeeds((prevNeeds) => [...prevNeeds, ...response.data.rows]);

    setPageDetails(response.data);

    return response;
  };

  useEffect(() => {
    fetchCommunityNeeds();
  }, []);

  const handlePageChange = async (page) => {
    console.log("Setting Page Number", page);

    // console.log(page);
    setCurrentPage(page);

    page > pageDetails.current_page && fetchCommunityNeeds(10, page);
  };

  const pageSize = pageDetails?.limit;
  const totalCount = pageDetails?.count;

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return communityNeeds.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, pageSize, communityNeeds]);

  return (
    <CommunityContext.Provider
      value={{
        pageDetails,
        currentPage,
        communityNeeds,
        loading,
        // refetchData,
        totalCount,
        pageSize,
        currentTableData,
        handlePageChange,
      }}
    >
      {children}
    </CommunityContext.Provider>
  );
};

export function useCommunityContext() {
  const context = useContext(CommunityContext);

  if (context === undefined) {
    throw new Error(
      "useCommunityContext should be used within a CommunityProvider"
    );
  }

  return context;
}
export default CommunityProvider;
