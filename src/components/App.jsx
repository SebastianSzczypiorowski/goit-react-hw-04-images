import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageGallery from './ImageGallery/imageGallery';
import SearchBar from './ImageGallery/searchbar';
import Button from './ImageGallery/button';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import Modal from './ImageGallery/modal';

const KEY = '33093349-e102244caac5b98b45f0118bc';

const App = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalShown, setIsModalShown] = useState(false);
  const [modalSrc, setModalSrc] = useState('');
  const [modalAlt, setModalAlt] = useState('');

  useEffect(() => {
    Loading.remove();
  }, []);

  const handleSubmit = async event => {
    Loading.standard({ svgColor: '#3f51b5' });
    event.preventDefault();
    const page = 1;
    const input = event.target[1]['value'];
    const URL = `https://pixabay.com/api/?q=${input}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;
    const response = await axios.get(URL);
    const pictures = response.data.hits;
    Loading.remove();
    setGalleryItems(pictures);
    setQuery(input);
    setCurrentPage(page);
    setModalSrc('');
    setModalAlt('');
  };

  const handleLoadMore = async () => {
    Loading.standard({ svgColor: '#3f51b5' });
    const page = currentPage + 1;
    const input = query;
    const URL = `https://pixabay.com/api/?q=${input}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;
    const newResponse = await axios.get(URL);
    const newPictures = newResponse.data.hits;
    const currentGalleryItems = galleryItems;
    Loading.remove();
    setGalleryItems([...currentGalleryItems, ...newPictures]);
    setCurrentPage(page);
  };

  const handleImageClick = event => {
    const id = event.target.id;
    const pictureObject = galleryItems.filter(
      element => element.id === Number(id)
    )[0];
    setIsModalShown(true);
    setModalSrc(pictureObject.largeImageURL);
  };

  const escKeyDown = event => {
    if (event.key === 'Escape') {
      setIsModalShown(false);
    }
  };

  const handleOverlayClick = event => {
    if (event.target.classList.contains('overlay')) {
      setIsModalShown(false);
    }
  };

  const isGalleryItemsShown = galleryItems.length === 0 ? false : true;

  return (
    <>
      {isModalShown && (
        <Modal
          src={modalSrc}
          alt={modalAlt}
          handleOverlayClick={handleOverlayClick}
          escFunc={escKeyDown}
        />
      )}
      <SearchBar handleSubmit={handleSubmit} />
      <ImageGallery
        galleryItems={galleryItems}
        handleImageClick={handleImageClick}
      />
      {isGalleryItemsShown && <Button handleLoadMore={handleLoadMore} />}
    </>
  );
};

export default App;
