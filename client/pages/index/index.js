import React from 'react';
import withRedux from 'next-redux-wrapper';
import { searchUser, searchUserSuccess } from '../../redux/modules/user';
import configureStore from '../../redux';

class Index extends React.Component {
  static async getInitialProps({ req, store }) {
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
    store.dispatch(searchUserSuccess({
      data: userAgent
    }))
  }
  handleClick() {
    this.props.dispatch(searchUser({
      data: 'pcd'
    }));
  }
  render() {
    return (
      <div>
        <button onClick={() => this.handleClick()}>click</button>
        <p>Hello World {this.props.user.data}</p>
      </div>
    )
  }
}

export default withRedux(
  configureStore,
  state => {
    return {
      user: state.user,
    };
  }
)(Index);
