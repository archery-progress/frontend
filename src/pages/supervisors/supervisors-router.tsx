import { Route, Routes } from 'react-router'
import Container from './container'
import PageOverviewFeature from './feature/page-overview-feature'

export default function SupervisorsRouter() {
  return (
    <Routes>
      <Route element={<Container />}>
        <Route path="overview" element={<PageOverviewFeature />} />
      </Route>
    </Routes>
  )
}