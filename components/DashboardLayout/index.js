import Styles from "./DashboardLayout.module.css";
import NextLink from "next/link";
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
          <NextLink href="/wallet" passHref>
            <a>
              <AccountBalanceIcon />
            </a>
          </NextLink>
        </div>
        <div className={Styles.sidenavLink}>
          <NextLink href="/transaction-history" passHref>
            <a>
              <TimelineIcon />
            </a>
          </NextLink>
        </div>
        <div className={Styles.sidenavLink}>
          <NextLink href="/trade" passHref>
            <a>
              <AutorenewOutlinedIcon />
            </a>
          </NextLink>
        </div>
        <div className={Styles.sidenavLink}>
          <NextLink href="/settings" passHref>
            <a>
              <TuneOutlinedIcon />
            </a>
          </NextLink>
        </div>
        <div className={Styles.sidenavLink}>
          <NextLink href="/dashboard" passHref>
            <a>
              <TrendingUpOutlinedIcon />
            </a>
          </NextLink>
        </div>
      </div>
      <div style={{ minHeight: "90vh", width: "85vw" }}>{children}</div>
    </div>
  );
}
