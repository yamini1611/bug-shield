import React from "react";

const Footer = () => {
    return(
    <div>
 
<footer className="text-center  text-lg-start  text-muted" id="footer">
  <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
    
    <div className="me-5 d-none d-lg-block">
      <span className="text-light">Get connected with us on social networks:</span>
    </div>
   
    <div className="text-light">
      <a href="/" className="me-4 link-secondary">
        <i className="fab fa-facebook-f"></i>
      </a>
      <a href="/" className="me-4 link-secondary">
        <i className="fab fa-twitter"></i>
      </a>
      <a href="/" className="me-4 link-secondary">
        <i className="fab fa-google"></i>
      </a>
      <a href="/" className="me-4 link-secondary">
        <i className="fab fa-instagram"></i>
      </a>
      <a href="/" className="me-4 link-secondary">
        <i className="fab fa-linkedin"></i>
      </a>
      <a href="/" className="me-4 link-secondary">
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
    Leading IT company specializing in software solutions, IT services, and exports. Dedicated to client success.
  </p>
</div>

       
        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
        
          <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
          <p><i className="fas fa-home me-3 text-secondary"></i> Coimbatore, TN , India</p>
          <p>
            <i className="fas fa-envelope me-3 text-secondary"></i>
            cgvak@gmail.com
          </p>
          <p><i className="fas fa-phone me-3 text-secondary"></i> + 01 234 567 88</p>
          <p><i className="fas fa-print me-3 text-secondary"></i> + 01 234 567 89</p>
        </div>
   
      </div>
    </div>
  </section>
  
  <div className="text-center p-4" style={{backgroundColor:"white",color:"black"}}>
    © 2023 Copyright:
    <a className="text-reset fw-bold ms-2" href="/">Bugshield.com</a>
  </div>

</footer>

    </div>
    )
}

export default Footer;