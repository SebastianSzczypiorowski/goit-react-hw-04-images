import React from 'react';
import axios from 'axios';
import { Component } from 'react';
import ImageGallery from './ImageGallery/imageGallery';
import SearchBar from './ImageGallery/searchbar';
import Button from './ImageGallery/button';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import Modal from './ImageGallery/modal';

const KEY = '33093349-e102244caac5b98b45f0118bc';

class App extends Component {
  state = {
    galleryItems: [],
    query: '',
    currentPage: 0,
    isModalShown: false,
  };

  componentDidUpdate() {
    Loading.remove();
  }

  handleSubmit = async event => {
    Loading.standard({ svgColor: '#3f51b5' });
    event.preventDefault();
    const page = 1;
    const input = event.target[1]['value'];
    const URL = `https://pixabay.com/api/?q=${input}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;
    const response = await axios.get(URL);
    const pictures = response.data.hits;
    console.log(pictures);
    this.setState({
      galleryItems: pictures,
      query: input,
      currentPage: page,
      modalSrc: '',
      modalAlt: '',
    });
  };

  handleLoadMore = async () => {
    Loading.standard({ svgColor: '#3f51b5' });
    const page = this.state.currentPage + 1;
    const input = this.state.query;
    const URL = `https://pixabay.com/api/?q=${input}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;
    const newResponse = await axios.get(URL);
    const newPictures = newResponse.data.hits;
    const currentGalleryItems = this.state.galleryItems;
    console.log(newPictures);
    this.setState({
      galleryItems: [...currentGalleryItems, ...newPictures],
      currentPage: page,
    });
  };

  handleImageClick = event => {
    const id = event.target.id;
    const pictureObject = this.state.galleryItems.filter(
      element => element.id === Number(id)
    )[0];
    this.setState({
      isModalShown: true,
      modalSrc: pictureObject.largeImageURL,
    });
  };

  escKeyDown = event => {
    if (event.key === 'Escape') {
      this.setState({
        isModalShown: false,
      });
    }
  };

  handleOverlayClick = event => {
    if (event.target.classList.contains('overlay')) {
      this.setState({
        isModalShown: false,
      });
    }
  };

  render() {
    const { galleryItems, isModalShown, modalSrc, modalAlt } = this.state;

    const isGalleryItemsShown = galleryItems['length'] === 0 ? false : true;

    return (
      <>
        {isModalShown ? (
          <Modal
            src={modalSrc}
            alt={modalAlt}
            handleOverlayClick={this.handleOverlayClick}
            escFunc={this.escKeyDown}
          />
        ) : (
          <></>
        )}

        <SearchBar handleSubmit={this.handleSubmit} />
        <ImageGallery
          galleryItems={galleryItems}
          handleImageClick={this.handleImageClick}
        />
        {isGalleryItemsShown ? (
          <Button handleLoadMore={this.handleLoadMore} />
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default App;
