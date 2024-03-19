import React from 'react';
import './App.css';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="container1">
        <div className="row1">
          <div className="footer-col">
            <div className="logo">
              <img src="/images/footer.png" alt="footer img" className="w-24 h-24"/>
              <p>JIIT INSIGHTS</p>
            </div>
          </div>
          <div className="footer-col">
            <h4>About</h4>
            <ul>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Stay Tuned!</h4>
            <ul>
              <li><a href="#">Discord</a></li>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">Linkedin</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Follow Us</h4>
            <div className="social-links">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-github"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-linkedin-in"></i></a>

            </div>
          </div>
        </div>

        {/* Horizontal Line */}
        <hr className="footer-line" />

        {/* Copyright Section */}
        <div className="copyright">
          &copy; 2023 JIIT INSIGHTS. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;