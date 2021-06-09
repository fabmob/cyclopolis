import Image from "next/image";
import Head from "next/head";
import Layout from "../components/layout";

export default function Apropos() {
  return (
    <Layout>
      <div>
        <Head>
          <title>À propos</title>
        </Head>
        <h1>A propos</h1>

        <Image
          src="/images/logo-villes-territoires-cyclables.png" // Route of the image file
          height={144} // Desired size with correct aspect ratio
          width={144} // Desired size with correct aspect ratio
          alt="Your Name"
        />
      </div>
    </Layout>
  );
}
