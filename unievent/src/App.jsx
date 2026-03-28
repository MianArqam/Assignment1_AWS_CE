import { useState } from 'react';
import ParticleCanvas from './components/ParticleCanvas';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DiagonalDivider from './components/DiagonalDivider';
import FeaturedEvent from './components/FeaturedEvent';
import EventListings from './components/EventListings';
import MediaGallery from './components/MediaGallery';
import RegistrationModal from './components/RegistrationModal';
import Footer from './components/Footer';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [eventName, setEventName] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  const openRegister = (name) => {
    setEventName(name || '');
    setModalOpen(true);
  };

  return (
    <>
      <ParticleCanvas />
      <Navbar onRegister={() => openRegister('')} />
      <Hero keyword={searchKeyword} onKeywordChange={setSearchKeyword} />
      <DiagonalDivider />
      <FeaturedEvent onRegister={openRegister} />
      <DiagonalDivider fromDark={false} />
      <EventListings onRegister={openRegister} keyword={searchKeyword} />
      <DiagonalDivider fromDark reverse />
      <MediaGallery />
      <Footer />
      <RegistrationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        eventName={eventName}
      />
    </>
  );
}
