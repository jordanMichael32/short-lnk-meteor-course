import React from 'react';
import { Accounts } from 'meteor/accounts-base';

//Since we need to access props you must create and give the function a name unlike when
//we defined the stateless functional component in Link.js
const PrivateHeader = (props) => {
  return (
    <div className="header">
      <div className="header__content">
        <h1 className="header__title">{props.title}</h1>
        <button className="button button--link-text" onClick={() => Accounts.logout()}>Logout</button>
      </div>
    </div>
  );
};

PrivateHeader.propTypes = {
  title: React.PropTypes.string.isRequired
};

export default PrivateHeader;
