import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import css from "./Dashboard.module.css";
import { Header } from "../Header/Header";
import Media from "react-media";

const MobileDashboard = () => {
  return (
    <>
      <Header />
      <div className={css.mobileWrapper}>
        <Navigation />
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
};

const OthersDashboard = () => {
  return (
    <>
      <Header />
      <div className={css.othersWrapper}>
        <Navigation />
        <Balance />
        {/* <Currency /> */}
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
};

export const Dashboard = () => {
  return (
    <Media
      queries={{
        mobile: "(max-width: 767px)",
        others: "(min-width: 768px)",
      }}
    >
      {(matches) => (
        <>
          {matches.mobile && <MobileDashboard />}
          {matches.others && <OthersDashboard />}
        </>
      )}
    </Media>
  );
};
