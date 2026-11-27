
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
import AuthPage from "./components/AuthPage";
import OnboardingRole from "./components/OnboardingRole";
import CompanyWebsite from "./components/CompanyWebsite";
import AccountReview from "./components/AccountReview";
import AccountWelcome, { OnboardingLoading } from "./components/AccountWelcome";
import EmailSync from "./components/EmailSync";
import AiAssistSetup from "./components/AiAssistSetup";
import AiToolsSetup from "./components/AiToolsSetup";
import AccountDetails from "./components/AccountDetails";
import AccountsDashboard from "./components/AccountsDashboard";
import AccountWorkspace from "./components/AccountWorkspace";
import AccountContact from "./components/AccountContact";

// Companies Page
import Companies from "./components/companies";

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
          path="/about"
          element={
            <>
              <About />
              <Footer />
            </>
          }
        />

        <Route
          path="/About"
          element={<Navigate to="/about" replace />}
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

        <Route path="/signup" element={<AuthPage mode="signup" />} />
        <Route path="/login" element={<AuthPage mode="login" />} />

        <Route path="/account" element={<AccountsDashboard />} />
        <Route path="/account/:accountId" element={<AccountDetails />} />

        <Route
          path="/workspace/:accountNumber"
          element={<AccountWorkspace />}
        />

        <Route
          path="/workspace/:accountNumber/contacts"
          element={<AccountContact />}
        />

        <Route path="/contacts" element={<AccountContact />} />

        {/* Companies Page Route */}
        <Route path="/companies" element={<Companies />} />

        <Route path="/onboarding/role" element={<OnboardingRole />} />
        <Route path="/onboarding/company-website" element={<CompanyWebsite />} />
        <Route path="/onboarding/review" element={<AccountReview />} />
        <Route path="/onboarding/welcome" element={<AccountWelcome />} />
        <Route path="/onboarding/email-sync" element={<EmailSync />} />
        <Route path="/onboarding/ai-loading" element={<OnboardingLoading />} />
        <Route path="/onboarding/ai-assist" element={<AiAssistSetup />} />
        <Route path="/onboarding/ai-tools" element={<AiToolsSetup />} />

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
