import { useGetUserStructuresQuery } from "@/data/api/structure_api"
import { AppDispatch } from "@/data/store/store"
import { getStructureState, structureActions } from "@/data/store/structure_store"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useNavigate } from "react-router"
import Loader from "../loader"

export default function AuthenticatedLayout() {
  const dispatch = useDispatch<AppDispatch>()
  const { structures } = useSelector(getStructureState)
  const navigate = useNavigate()

  const { data: structuresResult, isError } = useGetUserStructuresQuery()

  useEffect(() => {
    if (structuresResult) {
      dispatch(structureActions.setStructures(structuresResult))
    }
  }, [structuresResult, dispatch])

  useEffect(() => {
    if (isError) {
      navigate('/authentication/login')
    }
  }, [isError])

  if (!structures) {
    return <Loader />
  }

  return <Outlet/>
}
