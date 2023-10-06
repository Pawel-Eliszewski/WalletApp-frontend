import Media from "react-media";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { Navigation } from "../../components/Navigation/Navigation";
import { Balance } from "../../components/Balance/Balance";
import { ModalAddTransaction } from "../../components/ModalAddTransaction/ModalAddTransaction";
import { Currency } from "../../components/Currency/Currency";
import { ModalLogout } from "../../components/ModalLogout/ModalLogout";
import { ModalEditTransaction } from "../../components/ModalEditTransaction/ModalEditTransaction";
import css from "./DashboardPage.module.css";

const MobileDashboard = () => {
  return (
    <>
      <Header />
      <div className={css.mobileContainer}>
        <Suspense fallback={null}>
          <Navigation />
          <ModalAddTransaction />
          <ModalEditTransaction />
          <ModalLogout />
          <Outlet />
        </Suspense>
      </div>
    </>
  );
};

const TabletDashboard = () => {
  return (
    <>
      <Header />
      <div className={css.tabletContainer}>
        <Suspense fallback={null}>
          <div className={css.tabletWrapper}>
            <div className={css.tabletInnerBox}>
              <Navigation />
              <Balance />
            </div>
            <Currency />
          </div>
          <ModalAddTransaction />
          <ModalEditTransaction />
          <ModalLogout />
          <Outlet />
        </Suspense>
      </div>
    </>
  );
};

const DesktopDashboard = () => {
  return (
    <>
      <Header />
      <div className={css.desktopContainer}>
        <Suspense fallback={null}>
          <div className={css.desktopInnerWrapper}>
            <Navigation />
            <Balance />
            <Currency />
          </div>
          <ModalAddTransaction />
          <ModalEditTransaction />
          <ModalLogout />
          <Outlet />
        </Suspense>
      </div>
    </>
  );
};

export const DashboardPage = () => {
  return (
    <Media
      queries={{
        mobile: "(max-width: 767px)",
        tablet: "(min-width: 768px) and (max-width: 1279px)",
        desktop: "(min-width: 1279px)",
      }}
    >
      {(matches) => (
        <>
          {matches.mobile && <MobileDashboard />}
          {matches.tablet && <TabletDashboard />}
          {matches.desktop && <DesktopDashboard />}
        </>
      )}
    </Media>
  );
};
