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

  const callApi = async () => {
    try {
      const response = await axios.get('http://localhost:4000');
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // const callProtectedApi = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:4000/protected');
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const callProtectedApi = async () => {
    const token = await getAccessTokenSilently();
    console.log(token);
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
