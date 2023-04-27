import PropTypes from 'prop-types';

const propTypes = {
  selectedPageSize: PropTypes.number.isRequired,
  onPageSizeItemClick: PropTypes.func.isRequired
};

const PageSizeSelector = ({ selectedPageSize, onPageSizeItemClick }) => {
  // **********************************************************************
  // * constants

  const pageSizeOptions = [15, 25, 50, 75];

  // **********************************************************************
  // * component vars

  // **********************************************************************
  // * functions

  const createSelectorItem = ({ key, label, isActive, isDisabled }) => {
    const activeClass = isActive ? ' active' : '';
    const disabledClass = isDisabled ? ' disabled' : '';
    const buttonClass = `list-group-item list-group-item-action${activeClass}${disabledClass}`;
    const onClick = isDisabled ? null : () => onPageSizeItemClick(label);

    return (
      <button key={key} type="button" className={buttonClass} onClick={onClick}>
        {label}
      </button>
    );
  };

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <div className="page-size-selector">
      <div className="list-group list-group-horizontal">
        {createSelectorItem({ label: 'Page Size', isDisabled: true })}

        {pageSizeOptions.map((pageSize, index) =>
          createSelectorItem({
            key: index,
            label: pageSize,
            isActive: pageSize === selectedPageSize,
            isDisabled: pageSize === selectedPageSize
          })
        )}
      </div>
    </div>
  );
};

PageSizeSelector.propTypes = propTypes;

export default PageSizeSelector;
