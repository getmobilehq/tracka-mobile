import React, {
  createContext,
  useContext,
  useMemo,
  useEffect,
  useState,
} from "react";
import ProjectsServices from "../../services/ProjectServices";

const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [projects, setProjects] = useState([]);
  const [pageDetails, setPageDetails] = useState({});

  const fetchPage = async (page = 1) => {
    setLoading(true);
    const response = await ProjectsServices.getProjectsPerPage(page);

    setLoading(false);

    console.log({ page, response });

    setProjects((prevProjects) => [...prevProjects, ...response.projects.data]);

    setPageDetails(response.projects);

    return response;
  };

  useEffect(() => {
    fetchPage();
  }, []);

  const handlePageChange = async (page) => {
    console.log("Setting Page Number", page);

    // console.log(page);
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
        pageDetails,
        currentPage,
        projects,
        loading,
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
      "useProjectsContext should be used within a ProjectsProvider"
    );
  }

  return context;
}
export default ProjectsProvider;
