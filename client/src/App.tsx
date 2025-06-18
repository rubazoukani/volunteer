import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useAppContext } from "./context/AppProvider";
import Login from "./pages/auth/Login";
import RegisterOrganization from "./pages/auth/RegisterOrganization";
import RegisterVolunteer from "./pages/auth/RegisterVolunteer";
import ForgetPassword from "./pages/auth/ForgetPassword";
import ResetForgottenPassword from "./pages/auth/ResetForgottenPassword";
import AdminProfile from "./pages/admin/Profile";
import Wrapper from "./layouts/Wrapper";
import Volunteers from "./pages/admin/Volunteers";
import VolunteerProfile from "./pages/volunteer/Profile";
import Organizations from "./pages/admin/Organizations";
import PendingOrganizations from "./pages/admin/PendingOrganizations";
import OrganizationProfile from "./pages/organization/Profile";
import OrganizationChances from "./pages/organization/Chances";
import Chance from "./pages/Chance";
import VolunteerChances from "./pages/volunteer/Chances";
import AdminChances from "./pages/admin/Chances";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";

function App() {
  const { isLoggedIn, user } = useAppContext();

  return (
    <div id="App" className="min-h-100vh position-relative">
      <Router>
        <Routes>
          {isLoggedIn ? (
            <>
              {
                user.role === "admin" &&
                <>
                  <Route path="/profile" element={
                    <Wrapper>
                      <AdminProfile />
                    </Wrapper>}
                  />
                  <Route path="/volunteers" element={
                    <Wrapper>
                      <Volunteers />
                    </Wrapper>
                  } />
                  <Route path="/volunteers/:id" element={
                    <Wrapper>
                      <VolunteerProfile />
                    </Wrapper>
                  } />
                  <Route path="/organizations" element={
                    <Wrapper>
                      <Organizations />
                    </Wrapper>
                  } />
                  <Route path="/organizations/:id" element={
                    <Wrapper>
                      <OrganizationProfile />
                    </Wrapper>
                  } />
                  <Route path="/pending-organizations" element={
                    <Wrapper>
                      <PendingOrganizations />
                    </Wrapper>
                  } />
                  <Route path="/chances" element={
                    <Wrapper>
                      <AdminChances />
                    </Wrapper>
                  } />
                </>
              }
              {
                user.role === "volunteer" &&
                <>
                  <Route path="/profile" element={
                    <Wrapper>
                      <VolunteerProfile />
                    </Wrapper>}
                  />
                  <Route path="/chances" element={
                    <Wrapper>
                      <VolunteerChances />
                    </Wrapper>}
                  />
                </>
              }
              {
                user.role === "organization" &&
                <>
                  <Route path="/profile" element={
                    <Wrapper>
                      <OrganizationProfile />
                    </Wrapper>}
                  />
                  <Route path="/chances" element={
                    <Wrapper>
                      <OrganizationChances />
                    </Wrapper>}
                  />
                </>
              }
              <Route path="/chances/:id" element={
                <Wrapper>
                  <Chance />
                </Wrapper>}
              />
            </>
          ) :
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register/organization" element={<RegisterOrganization />} />
              <Route path="/register/volunteer" element={<RegisterVolunteer />} />
              <Route path="/forgot-password" element={<ForgetPassword />} />
              <Route path="/reset-forgotten-password" element={<ResetForgottenPassword />} />
            </>
          }
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
