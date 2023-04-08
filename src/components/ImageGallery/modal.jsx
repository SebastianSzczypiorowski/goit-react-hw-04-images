import { Component } from 'react';
import PropTypes from 'prop-types';

class Modal extends Component {
  staticPropTypes = {
    escFunc: PropTypes.func,
    src: PropTypes.string,
    alt: PropTypes.string,
  };
  componentDidMount() {
    const overlay = document.querySelector('.overlay');
    overlay.addEventListener('click', this.props.handleOverlayClick);
    document.addEventListener('keydown', this.props.escFunc);
  }
  componentWillUnmount() {
    const overlay = document.querySelector('.overlay');
    overlay.removeEventListener('click', this.props.handleOverlayClick);
    window.removeEventListener('click', this.props.escFunc);
  }

  render() {
    return (
      <div className="overlay">
        <div className="modal">
          <img src={this.props.src} alt={this.props.alt} />
        </div>
      </div>
    );
  }
}

export default Modal;
