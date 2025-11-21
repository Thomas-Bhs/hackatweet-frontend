import '../styles/globals.css';
import Head from 'next/head';


//import redux
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from '../reducers/user';

const store = configureStore({
   reducer: { user },
     });


function App({ Component, pageProps }) {
  return (

    <Provider store={store}>
      <Head>
        <title>Mon app hackaton</title>
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;
