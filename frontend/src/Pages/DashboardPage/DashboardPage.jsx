import Media from "react-media";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { Navigation } from "../../components/Navigation/Navigation";
import { Balance } from "../../components/Balance/Balance";
import { ButtonAddTransaction } from "../../components/ButtonAddTransaction/ButtonAddTransaction";
import { ModalAddTransaction } from "../../components/ModalAddTransaction/ModalAddTransaction";
import { Currency } from "../../components/Currency/Currency";
import { ModalLogout } from "../../components/ModalLogout/ModalLogout";
import css from "./DashboardPage.module.css";
import { ModalEditTransaction } from "../../components/ModalEditTransaction/ModalEditTransaction";
import { selectIsModalEditTransactionOpen } from "../../redux/global/selectors";
import { useSelector } from "react-redux";

const MobileDashboard = () => {
  const modalEditOpen = useSelector(selectIsModalEditTransactionOpen);

  return (
    <>
      <Header />
      <div className={css.mobileContainer}>
        <Suspense fallback={null}>
          <Navigation />
          <Balance />
          <ButtonAddTransaction />
          <ModalAddTransaction />
          {modalEditOpen === true ? <ModalEditTransaction /> : null}
          <ModalLogout />
          <Outlet />
        </Suspense>
      </div>
    </>
  );
};

const TabletDashboard = () => {
  const modalEditOpen = useSelector(selectIsModalEditTransactionOpen);
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
          <ButtonAddTransaction />
          <ModalAddTransaction />
          {modalEditOpen === true ? <ModalEditTransaction /> : null}
          <ModalLogout />
          <Outlet />
        </Suspense>
      </div>
    </>
  );
};

const DesktopDashboard = () => {
  const modalEditOpen = useSelector(selectIsModalEditTransactionOpen);

  return (
    <>
      <Header />
      <div className={css.desktopContainer}>
        <Suspense fallback={null}>
          <div className={css.innerWrapper}>
            <Navigation />
            <Balance />
            <Currency />
          </div>
          <ButtonAddTransaction />
          <ModalAddTransaction />
          {modalEditOpen === true ? <ModalEditTransaction /> : null}
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
