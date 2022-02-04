import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HeaderLayout from "components/layouts/headerLayout";

import {
  HOME_ROUTE,
  NOT_FOUND_ROUTE,
  COINS_ROUTE,
  MARKETCAPOF_ROUTE,
} from "./constants";
import NotFound from "screens/errors/index";

const Home = lazy(() => import("screens/home"));
const Coins = lazy(() => import("components/layouts/coinsLayout"));
const MarketCapOf = lazy(() => import("components/layouts/marketCapOfLayout"));
export function MainRouter() {
  return (
    <BrowserRouter>
      <HeaderLayout />
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path={HOME_ROUTE} exact element={<Home />} />
          <Route path={COINS_ROUTE} element={<Coins />} />
          {/* <Route path={MARKETCAPOF_ROUTE} element={<MarketCapOf />} /> */}
          <Route path={NOT_FOUND_ROUTE} element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default MainRouter;
