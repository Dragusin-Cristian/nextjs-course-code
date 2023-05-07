import '../styles/globals.css'
import Layout from '../components/layout/Layout'

// Here is where the magic happens:
// Component represents the screen that we currently render
// pageProps are the props we inject through getStaticProps, getStaticPaths, getServerSideProps 
function MyApp({ Component, pageProps }) {
  return <Layout><Component {...pageProps} /></Layout>
}

export default MyApp
