import React            from 'react';
import { connect } from 'react-redux';
import { setTitle } from '../actions/blog';

class Blog extends React.Component {
  constructor (props) {
    super(props);
  }

  componentWillMount () { }

  render () {
    let title = this.props.title;
    return (
      <div className='blog__wrapper'>
        <h1>{title}</h1>
      </div>
    );
  }
}

export default connect(
  state => {
    return ({ title: state.blog.title });
  },
  { setTitle }
)(Blog);
