import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"


function Mainlayouts() {
  return (
    <>
        <Navbar />
        <Outlet />
    </>
  )
}

export default Mainlayouts