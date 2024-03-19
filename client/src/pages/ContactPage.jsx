import React from 'react';
import '../ContactPagecss.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

const ContactPage = () => {
  return (
    <section class = 'abc'>
    <section class='scontact'>
      <div className="scontact-header">
        <div className="container3">
          <h2>About Us</h2>
          <p>
          The "JIIT Insights" is a comprehensive web-based platform designed to streamline and enhance the organization and participation of events conducted by multiple societies within a college campus. 
          </p>
        </div>
      </div>
      <div className="container3">
        <div className="row3">
          <div className="contact-info">
            <div className="contact-info-item">
            <a href="https://www.google.co.in/maps/place/Jaypee+Institute+of+Information+Technology/@28.5190905,77.3628473,17z/data=!3m1!4b1!4m6!3m5!1s0x390ce63ce7fae835:0x5714a74a5abdf3e6!8m2!3d28.5190905!4d77.3654222!16s%2Fg%2F11csrx8h_7?entry=ttu" target="_blank" rel="noopener noreferrer">
              <div className="contact-info-icon">
              <FontAwesomeIcon icon={faMapMarkerAlt} size="1x"/>
              </div>
              </a>

              <div className="contact-info-content">
                <h4>Address</h4>
                <p>
                Jaypee Wish Town Village<br /> Sector-128 <br />Noida-201304, Uttar Pradesh
                </p>
              </div>
            </div>

            <div className="contact-info-item">
            <a href="https://www.instagram.com/jiitinsights" target="_blank" rel="noopener noreferrer">
              <div className="contact-info-icon">
              <FontAwesomeIcon icon={faInstagram} />
              </div>
              </a>

              <div className="contact-info-content">
                <h4>Instagram</h4>
                <p>@jiitinsights</p>
              </div>
            </div>

            <div className="contact-info-item">
            <a href="https://www.twitter.com/jiitinsights12" target="_blank" rel="noopener noreferrer">
              <div className="contact-info-icon">
              <FontAwesomeIcon icon={faTwitter} />
              </div>
              </a>

              <div className="contact-info-content">
                <h4>Twitter</h4>
                <p>@jiitinsights12</p>
              </div>
            </div>
          </div>

          <div className="contact-form">
            <form action="https://formspree.io/f/xknllwgl" method="POST" id="contact-form">
              <h2>Contact Us</h2>
              <div className="input-box">
                <input name="name" type="text" required={true} placeholder='Full Name'/>
              </div>

              <div className="input-box">
                <input type="email" required={true} name="email" placeholder='john@gmail.com' />
              </div>

              <div className="input-box">
                <input name="mob" type="text" required={true} placeholder='+91 XXXXXXXXXX'/>
              </div>

              <div className="input-box">
                <textarea required={true} name="message" placeholder='Message ....... :)'></textarea>
                
              </div>

              <div className="input-box">
                <input type="submit" value="Send" name="submit" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
    </section>
  );
};

export default ContactPage;
