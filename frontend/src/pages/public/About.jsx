import React from 'react'

import './About.scss'

const About = () => {
  return (
    <>
      <div className="about-container">
        <div className="about-section">
          <div className="about-title">About</div>
        </div>

        <div className="about-section">
          <div className="about-sub-title">Purpose</div>
          <div className="about-text-normal">
            Welcome to Seal Idea! This project started after one of those "I told you so" moments. I thought it would be great to have a place where I could post my ideas or predictions without worrying about others knowing them. That way, I could tell my friends, "Aha! I came up with this first - just check it out! It's not hindsight bias!". Although it might seem like a silly idea, but I've learned a ton while developing it.
          </div>
        </div>

        <div className="about-section">
          <div className="about-sub-title">Encryption Protocol</div>
          <ul className="about_ul">
            <li className="about_li">The keys used in the community page is technically called password.</li>
            <li className="about_li">A random salt is generated and stored for each post.</li>
            <li className="about_li">The password and salt create a 256-bit key using a Password-Based Key Derivation Function (<a href="https://en.wikipedia.org/wiki/PBKDF2" target="_blank" rel="noopener noreferrer">PBKDF2</a>).</li>
            <li className="about_li">This key is used for encryption and decryption via the <a href="https://www.kiteworks.com/risk-compliance-glossary/aes-256-encryption/" target="_blank" rel="noopener noreferrer">AES-256 standard</a>.</li>
          </ul>
        </div>

        <div className="about-section">
          <div className="about-sub-title">Use Cases</div>
          <div className="about-text-normal">Here are a few suggestions for using the website:</div>
          <ul className="about_ul">
            <li className="about_li">
              Create fun team-building games using simple keys like "Congratulations!" Give your friends riddles to figure out the key, and they can enter it here for the next step!
            </li>
            <li className="about_li">
              Mark your original ideas by posting them here. If you ever want to revisit or prove your idea, just use your keys!
            </li>
            <li className="about_li">
              Store predictions—like the outcome of a football match or stock trends. Bet with your friends and reveal your predictions after the results come in.
            </li>
            <li className="about_li">
              Use it as an example for learning basic cybersecurity concepts.
            </li>
            <li className="about_li">
              I’m also planning to add a feature for storing encrypted files, so you can save drafts or proposals to prove your originality.
            </li>
            <li className="about_li">
              There are tons of potential uses for this app—go ahead and explore!
            </li>
          </ul>
        </div>
        <div className="about-section">
          <div className="about-sub-title">Disclaimer</div>
          <br />
          <div className="about-text-normal">
            I'm currently using AWS's free service to host this website, so I can't guarantee that the server will be maintained forever if there aren't any users. If you think this site is useful or have suggestions for new features, feel free to reach out! With more users, I might be able to turn it into a proper website!
          </div>
        </div>
        <div className="about-section">
          <div className="about-sub-title">Shameless Self-Promotion!</div>
          <br />
          <div className="about-text-normal">
            TLDR:
          </div>
          <ul className="about_ul">
            <li className="about_li">
              Websire architecture: Postgres &lt;-&gt; Spring Boot (Java) &lt;-&gt; React (JavaScript)
            </li>
            <li className="about_li">
              CI-CD pipelines: Github -&gt; Docker -&gt; AWS
            </li>
            <li className="about_li">
              Others: HTTPS/SSL setup, development and deployment variables are handled automatically by the CICD pipeline
            </li>
          </ul>
          <br />
          <div className="about-text-normal">
            While I believe the concept and use cases of this project may not be groundbreaking, I have learned a tremendous amount about software development!
          </div>
          <br />
          <div className="about-text-normal">
            The website is built following a basic distributed architecture (Model-View-Controller). An Nginx server serves the React UI to users and proxies client requests to a Tomcat server (developed using the Spring Boot framework). Spring Boot perform CRUD operations to a PostgreSQL database via a JPA interface.
          </div>
          <br />
          <div className="about-text-normal">
            I've also implemented two CI/CD pipelines for the back end and front end that are triggered automatically whenever code is pushed to GitHub. After testing the codes, they inject different sets of variables for deployment, build Docker containers, and push them to Docker Hub. After that, the pipelines access the AWS EC2 instances via remote SSH, clean the old environment, pull the new containers, and start new services. Additionally, it also automates the set-up of SSL certificates for secure HTTPS connections.
          </div>
          <br />
          <div className="about-text-normal">
            What’s remarkable is that I had no prior experience with PostgreSQL, Java, Spring Boot, JavaScript, React, CI/CD, Docker, AWS, or HTTPS before embarking on this project—just some basic coding knowledge and Linux skills. I completed everything in three intense weeks (a truly crazy three weeks, to be honest). As a self-taught software engineer without a CS background, I find it challenging to secure a software job today. As a fresh graduate, I have limited professional experience and am open to any opportunities.
          </div>
          <br />
          <div className="about-text-normal">
            If you find my work impressive or have any opportunities available, please consider me!
          </div>
          <br />
          <div className="about-text-normal">
            Have a look at my source code: <a href='https://github.com/dthung99/Seal_Idea'>GitHub</a>
          </div>
          <br />
          <div className="about-text-normal">
            Thank you for visiting!
          </div>
          <div className="about-text-normal">
            Best wishes,
          </div>
          <div className="about-text-normal">
            Hung
          </div>
        </div>
      </div>
    </>
  );
}

export const InfoAbout = () => {
  return (
    <>
      <div className="info_panel_big_text">Words from the Developer</div>
      <div className="info_panel_normal_text">
        This is just a simple information page without any functional features. Thank you for visiting!
      </div>
    </>
  );
}

export default About