import React from 'react';

export default React.createClass({
  render () {
    return (
      <div className='app__wrapper'>
        {this.props.children}
      </div>
    );
  }
});
