import PropTypes from 'prop-types';

const GalleryItem = ({ id, webformatURL, alt }) => {
  return (
    <li className="gallery-item">
      <img id={id} src={webformatURL} alt={alt} />
    </li>
  );
};

GalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  alt: PropTypes.string,
  id: PropTypes.number,
};

export default GalleryItem;
