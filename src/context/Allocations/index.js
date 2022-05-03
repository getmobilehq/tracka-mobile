import React, {
  createContext,
  useContext,
  useMemo,
  useEffect,
  useState,
} from "react";
import ProjectsServices from "../../services/ProjectServices";

const ProjectsContext = createContext();

const AllocationsProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState(1);
  const [projects, setProjects] = useState([]);
  const [pageDetails, setPageDetails] = useState({});

  const fetchPage = async (page = 1) => {
    setIsLoading(true);
    const response = await ProjectsServices.getAllocationsPerPage(page);

    setIsLoading(false);

    setProjects((prevProjects) => [
      ...prevProjects,
      ...response.allocations.data,
    ]);

    setPageDetails(response.allocations);

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
    return projects.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, pageSize, projects]);

  return (
    <ProjectsContext.Provider
      value={{
        data: pageDetails,
        currentPage,
        projects,
        loading: isLoading,
        // refetchData,
        totalCount,
        pageSize,
        currentTableData,
        handlePageChange,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export function useProjectsContext() {
  const context = useContext(ProjectsContext);

  if (context === undefined) {
    throw new Error(
      "useAllocationsContext should be used within a AllocationsProvider"
    );
  }

  return context;
}
export default AllocationsProvider;
