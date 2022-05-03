import { lazy } from "react";

// use lazy for better code splitting
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Projects = lazy(() => import("../pages/Projects"));
const Allocations = lazy(() => import("../pages/Allocations/index"));
const Administrators = lazy(() => import("../pages/Administrators"));
const Page404 = lazy(() => import("../pages/404"));
const EditProfile = lazy(() => import("../pages/EditProfile"));

const routes = [
  {
    path: "/dashboard",
    component: Dashboard,
  },
  {
    path: "/projects",
    component: Projects,
  },
  {
    path: "/allocations",
    component: Allocations,
  },
  {
    path: "/administrators",
    component: Administrators,
  },
  { path: "/setting", component: EditProfile },
  {
    path: "/404",
    component: Page404,
  },
  {
    path: "/edit-profile",
    component: EditProfile,
  },
];

export default routes;
