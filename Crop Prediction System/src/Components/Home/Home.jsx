import React from 'react'
import './Home.scss'
import LandingSection from './LandingSection'
import Footer from './Footer'
import TrialSection from './TrialSection'
import TrialSection2 from './TrialSection2'

function Home() {
    return (
        <div className="container">
            <section id="section1">
                <LandingSection/>
            </section>
            <section id="section2">
                <TrialSection/>
            </section>
            <section id="section2">
                <TrialSection2/>
            </section>
            <section id="section3">
                <Footer/>
            </section>
        </div>
    )
}

export default Home
