import { Route, Routes } from "react-router";
import Container from "./container";
import PageDashboardFeature from "./feature/page-dashboard-feature";

export default function ArcheryRouter() {

  return (
    <Routes>
      <Route element={<Container />}>
        <Route path="dashboard" element={<PageDashboardFeature />} />
      </Route>
    </Routes>
  )
}
