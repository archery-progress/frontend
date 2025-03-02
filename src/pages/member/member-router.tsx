import { Route, Routes } from 'react-router'
import { PageMembersOverviewFeature } from '@/pages/member/features/page-members-overview-feature.tsx'
import PageMemberViewFeature from '@/pages/member/features/page-member-overview-feature'
import Container from './container'

export default function MemberRouter() {
  return (
    <Routes>
      <Route element={<Container />}>
        <Route path="overview" element={<PageMembersOverviewFeature/>}/>
        <Route path=":memberId/overview" element={<PageMemberViewFeature/>}/>
      </Route>
    </Routes>
  )
}
