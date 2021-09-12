import Styles from "./DashboardLayout.module.css";
import Link from "next/link";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import TimelineIcon from "@material-ui/icons/Timeline";
import AutorenewOutlinedIcon from "@material-ui/icons/AutorenewOutlined";
import TuneOutlinedIcon from "@material-ui/icons/TuneOutlined";
import TrendingUpOutlinedIcon from "@material-ui/icons/TrendingUpOutlined";

export default function DashboardLayout({ children }) {
  return (
    <div className={Styles.dashboardLayoutWrapper}>
      <div className={Styles.sidenav}>
        <div className={Styles.sidenavLink}>
          <Link href="/wallet">
            <a>
              <AccountBalanceIcon />
              <span id="lg-screen-only">Wallet</span>
            </a>
          </Link>
        </div>
        <div className={Styles.sidenavLink}>
          <Link href="/transaction-history">
            <a>
              <TimelineIcon />
              <span id="lg-screen-only">History</span>
            </a>
          </Link>
        </div>
        <div className={Styles.sidenavLink}>
          <Link href="/trade">
            <a>
              <AutorenewOutlinedIcon />
              <span id="lg-screen-only">Exchange</span>
            </a>
          </Link>
        </div>
        <div className={Styles.sidenavLink}>
          <Link href="/settings">
            <a>
              <TuneOutlinedIcon />
              <span id="lg-screen-only">Settings</span>
            </a>
          </Link>
        </div>
        <div className={Styles.sidenavLink}>
          <Link href="/dashboard">
            <a>
              <TrendingUpOutlinedIcon />
              <span id="lg-screen-only">Dashboard</span>
            </a>
          </Link>
        </div>
      </div>
      <div
        style={{
          minHeight: "80vh",
          width: "85vw",
          position: "relative",
          marginLeft: "15vw",
        }}
      >
        {children}
      </div>
    </div>
  );
}
