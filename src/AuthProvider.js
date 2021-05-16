import React, { Component, createContext } from "react";
import { auth, firestore } from "./firebase";
import firebase from "firebase/app";
import config from "./config.json";

export const UserContext = createContext({
  user: null,
  initialized: false,
  login: undefined,
  logout: undefined,
  signup: undefined,
  updateUser: undefined,
});

export const addAuth = (ChildComponent) => (props) =>
  (
    <UserContext.Consumer>
      {(authInfo) => <ChildComponent {...props} authInfo={authInfo} />}
    </UserContext.Consumer>
  );

export class AuthProvider extends Component {
  authUnsubscriber = null;
  userDocUnsubscriber = null;

  state = {
    initialized: false,
    user: null,
  };

  componentDidMount() {
    this.authUnsubscriber = auth.onAuthStateChanged((user) => {
      // If user changed, unsubscribe from document of previous user
      if (this.state.user?.uid !== user?.uid) {
        if (this.userDocUnsubscriber) {
          this.userDocUnsubscriber();
          this.userDocUnsubscriber = null;
        }
      }

      if (user) {
        this.userDocUnsubscriber = firestore
          .collection("users")
          .doc(user.uid)
          .onSnapshot((snapshot) => {
            if (snapshot.exists) {
              this.setState({
                user: snapshot.data(),
                initialized: true,
              });
            }
          });
      } else {
        this.setState({
          user: null,
          initialized: true,
        });
      }
    });
  }

  componentWillUnmount() {
    if (this.authUnsubscriber) this.authUnsubscriber();
    if (this.userDocUnsubscriber) this.userDocUnsubscriber();
  }

  login = async (email, password, rememberMe) => {
    if (rememberMe) {
      await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    } else {
      await auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
    }
    await auth.signInWithEmailAndPassword(email, password);
  };

  signup = async (userInfo) => {
    const token = await auth.currentUser.getIdToken();
    const res = await fetch(`${config.api_url}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userInfo, token }),
    });
    if (res.status < 200 || res.status >= 300) throw await res.json();
  };

  updateUser = async (userId, userInfo) => {
    const token = await auth.currentUser.getIdToken();
    const res = await fetch(`${config.api_url}/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userInfo, token }),
    });
    if (res.status < 200 || res.status >= 300) throw await res.json();
  };

  logout = async () => {
    await auth.signOut();
  };

  render() {
    const value = {
      initialized: this.state.initialized,
      user: this.state.user,
      login: this.login,
      logout: this.logout,
      signup: this.signup,
      updateUser: this.updateUser,
    };
    return (
      <UserContext.Provider value={value}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default AuthProvider;
