import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Courses from '../components/Courses';
import HowItWorks from '../components/HowItWorks';
import FreeTrial from '../components/FreeTrial';
import Teachers from '../components/Teachers';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';

const Home = () => {
  return (
    <main>
      <Hero />
      <About />
      <Courses />
      <HowItWorks />
      <FreeTrial />
      <Teachers />
      <Testimonials />
      <FAQ />
    </main>
  );
};

export default Home;
