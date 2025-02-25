import { Route, Routes } from 'react-router'
import { PageMembersOverviewFeature } from '@/pages/member/features/page-members-overview-feature.tsx'
import PageMemberViewFeature from '@/pages/member/features/page-member-view-feature.tsx'

export default function MemberRouter() {
  return (
    <Routes>
      <Route path="overview" element={<PageMembersOverviewFeature/>}/>
      <Route path=":memberId/view" element={<PageMemberViewFeature/>}/>
    </Routes>
  )
}
