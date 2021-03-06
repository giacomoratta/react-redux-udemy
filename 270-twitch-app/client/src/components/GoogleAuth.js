import React from 'react';
import { connect} from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {

  state = {
    isSignedIn: null
  };

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '301479016041-38c7b6ebnagtdhvqm8eimqq3mlu7l9bb.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();

        // 1) set current state
        this.onAuthChange(this.auth.isSignedIn.get());

        // 2) listen for state changes
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  onAuthChange = (isSignedIn) => {
    // 1) this.auth.currentUser.get().getId(): unique user id from Google

    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  }

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    // change#1: .auth to .props
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon"/>
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon"/>
          Sign In with Google
        </button>
      );
    }
  }

  render() {
    return (
      <div>{ this.renderAuthButton() }</div>
    );
  }
}

export default connect(
  /* mapStateToProps */ (state) => {
    return {
      isSignedIn: state.auth.isSignedIn
    }
  },
  /* mapActionsToProps */ {
    signIn,
    signOut
  }
)(GoogleAuth);