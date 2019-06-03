import React from 'react';
import PropTypes from 'prop-types';

const AsyncRoute = props => {
  const { component } = props;

  const AsyncComponent = require(`pages/${component}/${component}.jsx`).default;

  return <AsyncComponent />;
};

AsyncRoute.propTypes = {
  component: PropTypes.string.isRequired
};

export default AsyncRoute;
