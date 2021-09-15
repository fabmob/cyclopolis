import Image from 'next/image'
import Head from 'next/head'
import Layout from '../components/layout'

export default function Apropos() {
  return (
    <Layout>
      <About />
    </Layout>
  )
}

export const About = () => (
  <div>
    <Head>
      <title>À propos</title>
    </Head>
    <h1>À propos</h1>

    <Image
      src="/images/logo-villes-territoires-cyclables.png" // Route of the image file
      height={100} // Desired size with correct aspect ratio
      width={80} // Desired size with correct aspect ratio
      alt="Your Name"
    />
    <p>Blablabla</p>
    <h2>D'où viennent les données</h2>
    <p>Blablabla</p>
    <h2>A propos de ce site</h2>
    <p>Le code est open source, FabMob</p>
  </div>
)
