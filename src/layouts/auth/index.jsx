import Footer from "components/footer/FooterAuthDefault";
import { Link, Routes, Route, Navigate, useLocation } from "react-router-dom";
import routes from "routes.js";
import FixedPlugin from "components/fixedPlugin/FixedPlugin";

export default function Auth() {
  // Get Routes
  const location = useLocation();
  const getRoutes = (routes) => {
    return routes.map((prop, index) => {
      if (prop.layout === "/auth") {
        return (
          <Route path={`/${prop.path}`} element={prop.component} key={index} />
        );
      } else {
        return null;
      }
    });
  };

  // document.documentElement.dir = "ltr";
  return (
    <div className="flex  flex-col items-center justify-center bg-white dark:bg-navy-900">
      <FixedPlugin />
      <div className="relative flex">
        <div className="mx-auto flex  w-full flex-col justify-start pt-4 ">
          <div className="mb-auto flex flex-col pl-5 pr-5 md:pr-0 md:pl-12 lg:max-w-[48%] lg:pl-0 xl:max-w-full">
            {/* Directing User to Home */}
            {location.pathname === "/auth/sign-in" ? (
              <Link to="/admin" className="mt-0 w-max lg:pt-10">
                <div className="mx-auto flex h-fit w-fit items-center hover:cursor-pointer">
                  <svg
                    width="8"
                    height="12"
                    viewBox="0 0 8 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.70994 2.11997L2.82994 5.99997L6.70994 9.87997C7.09994 10.27 7.09994 10.9 6.70994 11.29C6.31994 11.68 5.68994 11.68 5.29994 11.29L0.709941 6.69997C0.319941 6.30997 0.319941 5.67997 0.709941 5.28997L5.29994 0.699971C5.68994 0.309971 6.31994 0.309971 6.70994 0.699971C7.08994 1.08997 7.09994 1.72997 6.70994 2.11997V2.11997Z"
                      fill="#A3AED0"
                    />
                  </svg>
                  {/* Adjusted condition to show "Back to Dashboard" */}
                  {routes.find((route) => route.name === "Sign In") && (
                    <p className="ml-3 text-sm text-gray-600">
                      Back to Dashboard
                    </p>
                  )}
                </div>
              </Link>
            ) : (
              <Link to="/auth/sign-in" className="mt-0 w-max lg:pt-10">
                <div className="mx-auto flex h-fit w-fit items-center hover:cursor-pointer">
                  <svg
                    width="8"
                    height="12"
                    viewBox="0 0 8 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.70994 2.11997L2.82994 5.99997L6.70994 9.87997C7.09994 10.27 7.09994 10.9 6.70994 11.29C6.31994 11.68 5.68994 11.68 5.29994 11.29L0.709941 6.69997C0.319941 6.30997 0.319941 5.67997 0.709941 5.28997L5.29994 0.699971C5.68994 0.309971 6.31994 0.309971 6.70994 0.699971C7.08994 1.08997 7.09994 1.72997 6.70994 2.11997V2.11997Z"
                      fill="#A3AED0"
                    />
                  </svg>
                  {/* Adjusted condition to show "Back to Sign In" */}
                  {routes.find((route) => route.name === "Create Account") && (
                    <p className="ml-3 text-sm text-gray-600">
                      Back to Sign In
                    </p>
                  )}
                </div>
              </Link>
            )}
            <Routes>
              {getRoutes(routes)}
              <Route
                path="/"
                element={<Navigate to="/auth/sign-in" replace />}
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
