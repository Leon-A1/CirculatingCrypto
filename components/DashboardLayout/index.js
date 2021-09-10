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
            </a>
          </Link>
        </div>
        <div className={Styles.sidenavLink}>
          <Link href="/transaction-history">
            <a>
              <TimelineIcon />
            </a>
          </Link>
        </div>
        <div className={Styles.sidenavLink}>
          <Link href="/trade">
            <a>
              <AutorenewOutlinedIcon />
            </a>
          </Link>
        </div>
        <div className={Styles.sidenavLink}>
          <Link href="/settings">
            <a>
              <TuneOutlinedIcon />
            </a>
          </Link>
        </div>
        <div className={Styles.sidenavLink}>
          <Link href="/dashboard">
            <a>
              <TrendingUpOutlinedIcon />
            </a>
          </Link>
        </div>
      </div>
      <div style={{ minHeight: "90vh", width: "85vw" }}>{children}</div>
    </div>
  );
}
