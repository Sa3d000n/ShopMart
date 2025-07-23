import { Outlet } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./Applayout.module.css";
function Applayout() {
  return (
    <>
      <Navbar/>
      <Outlet/>
    </>
  );
}

export default Applayout;
