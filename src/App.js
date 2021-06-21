import React from 'react';
import './App.css';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

function App() {
  const {
    loginWithPopup,
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();

  //this is the route when using node as back end protected route
  // const callProtectedApi = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:4000/protected');
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const callApi = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:4000');
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // this is the route when using node as back end sending the token
  // const callProtectedApi = async () => {
  //   try {
  //     const token = await getAccessTokenSilently();
  //     const response = await axios.get('http://localhost:4000/protected', {
  //       headers: {
  //         authorization: `Bearer ${token}`,
  //       },
  //     });
  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(error.messsage);
  //   }
  // };

  const callApi = async () => {
    try {
      const response = await axios.get('http://localhost:5000');
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const callProtectedApi = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.get('http://localhost:5000/private', {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log(error.messsage);
    }
  };
  return (
    <div className="App">
      <h1>Auth0 authentication</h1>
      <ul>
        <li>
          <button onClick={loginWithPopup}>Login with Popup</button>
          <button onClick={loginWithRedirect}>Login with Redicrect</button>
          <button onClick={logout}>Logout</button>
        </li>
      </ul>
      <h3>User is {isAuthenticated ? 'Logged in' : 'Not logged in'}</h3>
      <ul>
        <li>
          <button onClick={callApi}>Call API</button>
        </li>
        <li>
          <button onClick={callProtectedApi}>Call Proteced API route </button>
        </li>
      </ul>
      <pre style={{ textAlign: 'start' }}>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}

export default App;
