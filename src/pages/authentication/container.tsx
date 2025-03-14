import { getUserState } from "@/data/store/user_store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";

export default function Container() {
  const { user } = useSelector(getUserState)
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/archery/dashboard')
    }
  }, [])

  return (
    <Outlet />
  )
}