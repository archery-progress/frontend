import { Route, Routes } from "react-router";
import Container from "./container";
import PageLoginFeature from "./feature/page-login-feature";
import PageCallbackFeature from "./feature/page-callback-feature";

export default function PageAuth() {
  return (
    <Routes>
      <Route element={<Container />}>
        <Route path="login" element={<PageLoginFeature />} />
        <Route path="callback" element={<PageCallbackFeature />} />
      </Route>
    </Routes>
  )
}