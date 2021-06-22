import React, { useState } from 'react';
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

  const callApinode = async () => {
    try {
      const response = await axios.get('http://localhost:4000');
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // this is the route when using node as back end sending the token
  const callProtectedApinode = async () => {
    try {
      const token = await getAccessTokenSilently();
      console.log(token);
      const response = await axios.get('http://localhost:4000/protected', {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

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

  const sendinfo = async () => {
    try {
      const response = await axios.post('http://localhost:5000');
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const [name, setName] = useState('');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    sendinfo();
  };
  const changeName = (e) => {
    setName(e.target.value);
  };

  return (
    <div className="App">
      <h1>Auth0 authentication with NodeJs as backend</h1>
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
          <button onClick={callApinode}>Call API</button>
        </li>
        <li>
          <button onClick={callProtectedApinode}>
            Call Proteced API route{' '}
          </button>
        </li>
      </ul>
      <pre style={{ textAlign: 'start' }}>{JSON.stringify(user, null, 2)}</pre>

      <h1>Auth0 authentication with Rails as backend</h1>
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

      <form onSubmit={handleSubmit}>
        <br />
        <br />
        <label>
          Frirst Name:
          <input type="text" value={name} onChange={changeName} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default App;
