import React from 'react'

import './Footer.scss'

const Footer = () => {
  return (
    <>
      <div className="my_footer">
        <div className="footer_main">
          <h4>Get in Touch</h4>
          <p>
            My&nbsp;website:&nbsp;<a href="https://dthung.com" target="_blank" rel="noopener noreferrer">dthung.com</a> |
            LinkedIn:&nbsp;<a href="https://linkedin.com/in/dthung" target="_blank" rel="noopener noreferrer">linkedin.com/in/dthung</a> |
            GitHub:&nbsp;<a href="https://github.com/dthung99" target="_blank" rel="noopener noreferrer">github.com/dthung99</a>
          </p>
          <p>
            Email: <a href="mailto:the_hung.dang@kcl.ac.uk">the_hung.dang@kcl.ac.uk</a>, <a href="mailto:dthung.y17@gmail.com">dthung.y17@gmail.com</a> | London, United Kingdom
          </p>
        </div>
        <img src='/seal_idea.svg' alt='Under Development' className='logo_icon' />
      </div>
    </>
  )
}

export default Footer