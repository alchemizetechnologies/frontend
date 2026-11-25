import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Dashboard from "./components/dashboard";
import About from "./components/About";
import Contact from "./components/Contact";
import Pricing from "./components/Pricing";
import MarketingPlus from "./components/MarketingPlus";
import SmartCrm from "./components/SmartCrm";
import SalesHub from "./components/SalesHub";
import ServiceHub from "./components/ServiceHub";
import ContentHub from "./components/ContentHub";
import Bundle from "./components/Bundle";
import SitePage from "./components/SitePage";
import Footer from "./components/footer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/dashboard" replace />}
        />

        <Route
          path="/dashboard"
          element={
            <>
              <Dashboard />
              <Footer />
            </>
          }
        />

        <Route
          path="/About"
          element={
            <>
              <About />
              <Footer />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <Contact />
              <Footer />
            </>
          }
        />
        <Route
          path="/pricing"
          element={
            <>
              <Pricing />
              <Footer />
            </>
          }
        />
        <Route
          path="/pricing/marketing-plus"
          element={
            <>
              <MarketingPlus />
              <Footer />
            </>
          }
        />
        <Route
          path="/pricing/smart-crm"
          element={
            <>
              <SmartCrm />
              <Footer />
            </>
          }
        />
        <Route
          path="/pricing/sales"
          element={
            <>
              <SalesHub />
              <Footer />
            </>
          }
        />
        <Route
          path="/pricing/service"
          element={
            <>
              <ServiceHub />
              <Footer />
            </>
          }
        />
        <Route
          path="/pricing/content"
          element={
            <>
              <ContentHub />
              <Footer />
            </>
          }
        />
        <Route
          path="/pricing/bundle"
          element={
            <>
              <Bundle />
              <Footer />
            </>
          }
        />
        <Route
          path="*"
          element={
            <>
              <SitePage />
              <Footer />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;