import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="text-center  text-lg-start  text-muted" id="footer">
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">

          <div className="me-5 d-none d-lg-block">
            <span className="text-light">Get connected with us on social networks:</span>
          </div>

          <div className="text-light">
            <a href="https://www.facebook.com/cgvakindia?mibextid=LQQJ4d" className="me-4 link-secondary">
              <i className="fab fa-facebook-f"></i>
            </a>
           
            <a href="https://www.cgvakindia.com/" className="me-4 link-secondary">
              <i className="fab fa-google"></i>
            </a>
            <a href="https://r.search.yahoo.com/_ylt=Awr1TajDCSBlWjMSyGa7HAx.;_ylu=Y29sbwNzZzMEcG9zAzEEdnRpZAMEc2VjA3Ny/RV=2/RE=1696627267/RO=10/RU=https%3a%2f%2fwww.instagram.com%2fcgvak%2f/RK=2/RS=Ms2slw4sht1rzIZOkZr_QSyd9C4-" className="me-4 link-secondary">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://in.linkedin.com/company/cg-vak-software-&-exports-ltd" className="me-4 link-secondary">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://github.com/yamini1611" className="me-4 link-secondary">
              <i className="fab fa-github"></i>
            </a>
          </div>
        </section>

        <section className="text-light">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <i className="fas fa-gem me-3 text-secondary"></i>CG-VAK SOFTWARE AND EXPORTS
                </h6>
                <p>
                  It  is known for its expertise in software solutions, IT services, and global exports. they deliver innovative technology solutions tailored to clients' unique needs, ensuring business growth and excellence. </p>
              </div>
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <i className="fas fa-gem me-3 text-secondary"></i>Our Office India
                </h6>
                <p>
                  171, Mettupalayam Road ,</p>
                <p>Coimbatore   641 043, India,
                </p>
                <p>  E-Fax (US): +1 (732) 210-0304  </p>
                <p>
                  Unit - II
                  Vellakinar Pirivu,
                  Coimbatore 641029, India.
                </p>
              </div>
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <i className="fas fa-gem me-3 text-secondary"></i> US California
                </h6>
                <p>
                  1661, Tice Valley Blvd,</p>
                 <p> Suite # 101, Walnut Creek,</p>
                 <p> CA 94595, USA,
                  Tel: +1 (925) 262-8211,</p><p>
                  Mobile: +1 (925) 487-5119,  </p>
              </div>
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p><i className="fas fa-home me-1 text-secondary"></i> Coimbatore, TN , India</p>
                <p>
                  <i className="fas fa-envelope me-1 text-secondary"></i>
                  cgvak@gmail.com
                </p>
                <p><i className="fas fa-phone me-1 text-secondary"></i> + 01 234 567 88</p>
                <p><i className="fas fa-print me-1 text-secondary"></i> + 01 234 567 89</p>
              </div>

            </div>
          </div>
        </section>
        <div className="text-center p-4" style={{ backgroundColor: "white", color: "black" }}>
          © 2023 Copyright:
          <a className="text-reset fw-bold ms-2" href="/">Bugshield.com</a>
        </div>
      </footer>
    </div>
  )
}

export default Footer;