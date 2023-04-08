import PropTypes from 'prop-types';

const Button = ({ handleLoadMore }) => {
  return (
    <div className="button-container">
      <button
        className="loadMore-button"
        type="button"
        onClick={() => handleLoadMore()}
      >
        Load More
      </button>
    </div>
  );
};

Button.propTypes = {
  handleLoadMore: PropTypes.func,
};

export default Button;
