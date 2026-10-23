import "./App.css";
function About(){
    return(
      <>
       <section className="hero">
              <div className="hero-content">
                  <h1>About DSA College</h1>
                  <p>Empowering students with knowledge, skills,creativity, and confidence to build a better future.</p>
                  <a href="#about" className="hero-button">Explore Our College</a>
              </div>
          </section>
          <section className="about-section" id="about">
              <div className="container">
                  <h2 className="section-title">About Us</h2>
                  <div className="title-line"></div>
                  <p className="about-text">DSA College is committed to providing quality education that empowers students with knowledge, skills, and confidence to succeed in a rapidly changing world. Our institution focuses on creating a supportive and engaging learning environment where students can discover their potential and achieve their goals.</p>
                  <p className="about-text">At DSA, we believe that education goes beyond textbooks and examinations. We encourage students to develop critical thinking, creativity, technical skills, leadership qualities, and strong ethical values. Through experienced faculty, modern learning practices, practical training, and various academic activities, we prepare our students for higher education, professional careers and future challenges.</p>
              </div>
          </section>
          <section className="cards-section">
              <div className="container">
                  <h2 className="section-title">Our Vision & Mission</h2>
                  <div className="title-line"></div>
                  <div className="cards">
                      <div className="card">
                          <div className="card-icon">🎯</div>
                          <h2>Our Mission</h2>
                          <p>To become a center of excellence in education by nurturing knowledgeable, innovative, responsible and future-ready professionals.</p>
                      </div>
                      <div className="card">
                          <div className="card-icon">🚀</div>
                          <h2>Our Mission</h2>
                          <ul>
                              <li>To provide quality and value-based education.</li>
                              <li>To develop technical, analytical and communication skills.</li>
                              <li>To encourage innovation, creativity and research.</li>
                              <li>To provide students with practical learning opportunities.</li>
                              <li>To build confidence, leadership and professional skills.</li>
                              <li>To prepare students to contribute positively to society.</li>
                          </ul>
                      </div>
                  </div>
              </div>
          </section>
          <section className="why-section">
              <div className="container">
                  <h2 className="section-title">Why Choose DSA</h2>
                  <div className="title-line"></div>
                  <div className="why-grid">
                      <div className="why-box">
                          <h3>Quality Education</h3>
                          <p>Focus on strong academic foundations and practical knowledge.</p>
                      </div>
                      <div className="why-box">
                          <h3>Experienced Faculty</h3>
                          <p>Supportive faculty members who guide students throughout their education.</p>
                      </div>
                      <div className="why-box">
                          <h3>Practical Learning</h3>
                          <p>Students gain hands-on experience through laboratories and activities.</p>
                      </div>
                      <div className="why-box">
                          <h3>Innovation</h3>
                          <p>Encouraging creativity, innovation, research and new ideas.</p>
                      </div>
                      <div className="why-box">
                          <h3>Leadership</h3>
                          <p>Opportunities to develop confidence, teamwork and leadership skills.</p>
                      </div>
                      <div className="why-box">
                          <h3>Future Ready</h3>
                          <p>Preparing students for higher education, careers and future challenges.</p>
                      </div>
                  </div>
              </div>
          </section>
          <footer>
              <h2>DSA College</h2>
              <p> Learn • Innovate • Excel</p>
              <p>&copy;2026 DSA College. All Rights Reserved.</p>
          </footer>
          <button id="topButton" /*onClick={gototop()}*/>⬆️</button>
      </>
    )
  }
  export default About;