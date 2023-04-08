import PropTypes from 'prop-types';
import { useEffect } from 'react';

function Modal(props) {
  const { escFunc, src, alt, handleOverlayClick } = props;

  useEffect(() => {
    const overlay = document.querySelector('.overlay');
    overlay.addEventListener('click', handleOverlayClick);
    document.addEventListener('keydown', escFunc);

    return () => {
      overlay.removeEventListener('click', handleOverlayClick);
      document.removeEventListener('keydown', escFunc);
    };
  }, [escFunc, handleOverlayClick]);

  return (
    <div className="overlay">
      <div className="modal">
        <img src={src} alt={alt} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  escFunc: PropTypes.func,
  src: PropTypes.string,
  alt: PropTypes.string,
  handleOverlayClick: PropTypes.func,
};

export default Modal;
