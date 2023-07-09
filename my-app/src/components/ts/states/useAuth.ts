import axios from 'axios';
import { create } from 'zustand';

interface Auth {
  is_authenticated: boolean | undefined;
  loaded: boolean;
  error: string | undefined;
}

export const useAuth = create<Auth>((set) => ({
  loaded: false,
  error: undefined,
  is_authenticated: undefined,
}));

const fetchData = () => {
  useAuth.setState({ loaded: false, error: undefined });

  axios
    .get('/auth')
    .then((response) => {
      console.log(response.data);
      useAuth.setState({
        is_authenticated: response.data.is_authenticated,
        loaded: true,
        error: undefined,
      });
    })
    .catch((error) => {
      useAuth.setState({ error: error.message, loaded: true });
    });
};

// Call fetchData function when you want to fetch the authentication data
fetchData();
