import React from 'react';
import Header from './Header';
import PropertyList from './PropertyList';
import CTASection from './CTASection';
import Footer from './Footer';

export default function Homepage() {
  return (
    <>
      <Header />
      <PropertyList />
      <CTASection />
      <Footer />
    </>
  );
}
