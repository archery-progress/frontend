import { useSelector } from "react-redux";
import PageGeneral from "../ui/page-general";
import { getUserState } from "@/data/store/user_store";

export default function PageGeneralFeature() {
  const { user } = useSelector(getUserState)
  return (
    <PageGeneral 
      user={user!}
    />
  )
}