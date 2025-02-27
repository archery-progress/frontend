import { Route, Routes } from "react-router";
import Container from "./container";
import PageGeneralFeature from "./feature/page-general-feature";

export default function ProfilRouter () {
  return (
    <Routes>
      <Route element={<Container />}>
        <Route path="general" element={<PageGeneralFeature />} />
      </Route>
    </Routes>
  )
}