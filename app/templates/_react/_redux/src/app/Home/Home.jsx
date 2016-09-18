import React        from 'react';
import {connect}    from 'react-redux';
import {setTitle}   from '../actions/home';

function getTitle (id) {
  return new Promise((resolve, reject) => {
    request
    .get(`http://jsonplaceholder.typicode.com/posts/${id}`)
    .end((error, response) => {
      console.log('inside fetch end');
      return resolve(response.body.title);
    });
  });
}

export let initialState = async () => {
  return {
    title: await getTitle(Math.floor(Math.random() * 10)),
    butt: await getTitle(Math.floor(Math.random() * 20))
  };
};

class Home extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className='home__wrapper'>
        <h1>{this.props.title}</h1>
        <h2>{this.props.butt}</h2>
      </div>
    );
  }
}

export default connect(
  (state) => {
    return {
      title: state.home.title,
      butt: state.home.butt
    };
  }
)(Home);
