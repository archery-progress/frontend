import { useGetStructureQuery } from "@/data/api/structure_api";
import { AppDispatch } from "@/data/store/store";
import { getStructureState, structureActions } from "@/data/store/structure_store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router";
import Loader from "../loader";

export default function StructureMiddleware() {
  const { structureId = '' } = useParams() 
  const dispatch = useDispatch<AppDispatch>()
  const { currentStructure } = useSelector(getStructureState)

  const { data: structure} = useGetStructureQuery(structureId)

  useEffect(() => {
    if (structure) {
      dispatch(structureActions.setCurrentStructure(structure))
    }
  }, [structure])

  if (!currentStructure) {
    return (
      <Loader />
    )
  }

  return (
    <Outlet />
  )
}