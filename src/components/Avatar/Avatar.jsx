import React from 'react';
import './Avatar.css'; // Make sure to create and import the CSS file

function Avatar({user}) {
  const renderAvatar = () => {
    if (user.avatar) {
      return <img src={user.avatar} alt={`${user.name}'s avatar`} className="avatar-img" />;
    } else {
      const firstLetter = user.name.charAt(0).toUpperCase();
      return (
        <div className="avatar-placeholder">
          {firstLetter}
        </div>
      );
    }
  };

  return (
    <div className="avatar-container">
      {renderAvatar()}
    </div>
  );
};

export default Avatar;