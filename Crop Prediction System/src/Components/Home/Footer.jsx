import React from 'react'
import './Footer.scss'

import {
    Link
  } from "react-router-dom";

function Footer() {
    return (
        <div className="section footerSection">
            <p>This website provides farmers with an essential decision support tool providing recommended crops and fertilizers for their soil using Data Science and Machine learning techniques.</p>
            {/* <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum quisquam fuga laudantium at tempore temporibus magni voluptatem quos ipsa dicta veritatis officiis quas ullam ratione quae nihil possimus, aliquam distinctio?</p> */}

            <div className="footerLinksDiv">
                <Link to="#section1">Home</Link>
                <Link to="#section2">Try it out</Link>
                <Link to="#section3">About</Link>
            </div>
        </div>
    )
}

export default Footer
