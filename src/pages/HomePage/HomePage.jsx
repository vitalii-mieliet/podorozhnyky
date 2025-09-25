import About from '../../components/About/About';
import Hero from '../../components/Hero/Hero';
import Join from '../../components/Join/Join';
import OurTravellers from '../../components/OurTravellers/OurTravellers';
import Popular from '../../components/common/Popular/Popular';
import AddStoryForm from '../../components/AddStoryForm/AddStoryForm';

const HomePage = () => {
  return (
    <>
      <Hero />
      <AddStoryForm />
      <About />
      <Popular />
      <OurTravellers />
      <Join />
    </>
  );
};

export default HomePage;


