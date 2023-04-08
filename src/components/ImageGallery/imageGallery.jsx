import PropTypes from 'prop-types';
import GalleryItem from './imageGalleryItem';

function ImageGallery(props) {
  return (
    <ul className="image-gallery" onClick={props.handleImageClick}>
      {props.galleryItems.map(image => (
        <GalleryItem
          id={image.id}
          key={image.id}
          webformatURL={image.webformatURL}
          alt={image.tags}
        />
      ))}
    </ul>
  );
}

ImageGallery.defaultProps = {
  galleryItems: [],
  currentPage: 0,
};

ImageGallery.propTypes = {
  galleryItems: PropTypes.array,
  currentPage: PropTypes.number,
};

export default ImageGallery;
