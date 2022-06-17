import {Provider as StoreProvider} from 'react-redux';
import '../styles/globals.css'
import 'semantic-ui-css/semantic.min.css'
import type { AppProps } from 'next/app'
import configureStore from '../redux/store';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider store={configureStore}>
      <Component {...pageProps} />
    </StoreProvider>
  )
}

export default MyApp
