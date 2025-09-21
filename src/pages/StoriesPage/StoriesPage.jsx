import TravellersStories from '../../components/common/TravellersStories/TravellersStories';
// коли буду робити стилізацію використаю контейнер для стилізації відступів
// import Container from '../../components/Container/Container'; 

const StoriesPage = () => {
  return (
    <main>
      {/* <Container> */}
        <h1>Історії Мандрівників</h1>
        
        <TravellersStories />
      {/* </Container> */}
    </main>
  );
};

export default StoriesPage;