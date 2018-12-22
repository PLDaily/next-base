import * as React from 'react';
import styles from './style.scss';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { searchUser, searchUserSuccess } from '../../redux/modules/user';
import { State } from '../../redux/modules';

interface IndexProps {
  user: {
    status: string;
  };
  dispatch: Dispatch;
}

class Index extends React.Component<IndexProps, any> {
  static async getInitialProps({ req, store }) {
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
    store.dispatch(searchUserSuccess({
      status: userAgent
    }));
  }
  handleClick(): void {
    this.props.dispatch(searchUser({
      status: 'Hello World'
    }));
  }
  render() {
    return (
      <div className={styles.container}>
        <button onClick={() => this.handleClick()}>dispatch</button>
        <p>{this.props.user.status}</p>
      </div>
    );
  }
}

export default connect(
  (state: State) => {
    return {
      user: state.user,
    };
  }
)(Index);
