import { ChallegensProvider } from '../contexts/ChallegensContext';
import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  return (
    <ChallegensProvider>
      <Component {...pageProps} />
    </ChallegensProvider>
  )
}

export default MyApp
