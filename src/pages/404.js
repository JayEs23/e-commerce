import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

const ErrorPage = ({ statusCode }) => {
  return (
    <>
      <div className="page-container bg-gray">
        <Header />
        <div className="content font-sm p-4">
          <div className="row">
            <div className="row">
              <div className="col-md-10 col-lg-8 col-xl-6 mx-auto">
                <div className="create-content-box">
                  <div className="section-head-sm">
                    <a href="../../" className="btn-link fw-semibold">
                      <em className="ni ni-arrow-left"></em> Go Back
                    </a>
                    <h1 className="mt-2 mb-3">
                      {statusCode
                        ? `An error occurred: ${statusCode}`
                        : "An error occurred"}
                    </h1>
                    <p> Sorry, something went wrong. Please try again later.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

// ErrorPage.getInitialProps = ({ res, err }) => {
//   const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
//   return { statusCode };
// };

export default ErrorPage;
