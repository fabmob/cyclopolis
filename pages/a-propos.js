import Image from 'next/image'
import Head from 'next/head'
import Layout from '../components/layout'

export default function Apropos() {
  return (
    <Layout noAbout>
      <About />
    </Layout>
  )
}

export const LittleAbout = () => (
  <div>
    <Images />
    <p>
      Lancée en septembre 2021, la plateforme Comment ça roule présente 8
      indicateurs sur la circulation des vélos dans plusieurs territoires de
      France.
    </p>
    <p>
      Cette plateforme est développée par le Club des villes et territoires
      cyclables (CVTC), dans le cadre d’un partenariat avec Geovelo.
    </p>
    <p>
      Les données affichées pour chacun des territoires sont calculées sur la
      base des utilisateur.rice.s Geovelo qui enregistrent leurs trajets avec
      l’application.
    </p>
    <p>
      Elles permettent d’aider les collectivités territoriales à mieux
      comprendre les déplacements à vélo sur leurs territoires.
    </p>
    <h3>Une question ? </h3>

    <p>
      N’hésitez pas à nous contacter à cette adresse : info@villes-cyclables.org
    </p>
  </div>
)

const Images = () => (
  <div className="about-images">
    <Image
      src="/images/logo-villes-territoires-cyclables.png" // Route of the image file
      height={100} // Desired size with correct aspect ratio
      width={80} // Desired size with correct aspect ratio
      alt="Logo du club des villes et territoires cyclables"
    />
    <Image
      src="/images/logo-geovelo.jpg" // Route of the image file
      height={80} // Desired size with correct aspect ratio
      width={100} // Desired size with correct aspect ratio
      alt="Logo de Geovelo"
    />
  </div>
)
export const About = () => (
  <div>
    <Head>
      <title>Comment ça roule - À propos</title>
    </Head>
    <h1>À propos</h1>

    <Images />
    <p>
      Lancée en septembre 2021, la plateforme Comment ça roule présente 8
      indicateurs sur la circulation des vélos dans plusieurs territoires de
      France.
    </p>
    <p>
      Cette plateforme est développée par le Club des villes et territoires
      cyclables (CVTC), dans le cadre d’un partenariat avec Geovelo.
    </p>

    <p>
      Les données affichées pour chacun des territoires sont calculées sur la
      base des utilisateur.rice.s Geovelo qui enregistrent leurs trajets avec
      l’application.
    </p>
    <p>
      Elles permettent d’aider les collectivités territoriales à mieux
      comprendre les déplacements à vélo sur leurs territoires.
    </p>

    <p>
      Les données sont calculées sur des moyennes trimestrielles, et les
      indicateurs Comment ça roule ? seront mis à jour tous les trois mois.
    </p>

    <p>
      La plateforme a vocation à aider les collectivités et le grand public à
      disposer d’indicateurs concrets pour mieux suivre et comprendre
      l’évolution de la pratique du vélo.
    </p>

    <p>
      Pour chacun des territoires couverts, les indicateurs présentés sont :
    </p>

    <ul css="list-style-type: disc; padding-left: 2rem">
      <li>La vitesse moyenne à vélo (variant de 13 à 19km/h)</li>

      <li>La distance moyenne des trajets effectués (de 6,5km à 26km)</li>

      <li>La durée moyenne des trajets (de 25min à 1h16)</li>

      <li>temps d’arrêt moyen par kilomètre parcouru (de 25sec à 1min20)</li>
    </ul>

    <p>
      Ces données sont calculées sur la base des trajets enregistrés localement
      avec l’application Geovelo. Plus le nombre d’utilisateurs sera important,
      plus les données affichées seront fiables. Un indice de confiance est donc
      présenté pour voir dans quelle mesure la donnée affichée est précise. Cet
      indice de confiance va de A (niveau de confiance élevé), à E (indice de
      confiance faible). Il sera ré-évalué à chaque mise à jour en fonction de
      l’évolution de l’usage constaté sur chaque territoire.
    </p>

    <h2>Méthodologie</h2>

    <p>
      Chaque jour, plusieurs milliers de trajets sont enregistrés avec
      l’application Geovelo. Les trajets enregistrés sont ceux :
    </p>
    <ul css="list-style-type: disc; padding-left: 2rem">
      <li>réalisés avec la fonctionnalité Navigation</li>

      <li>enregistrés manuellement grâce au bouton dédié</li>

      <li>
        enregistrés automatiquement grâce à la fonctionnalité “détection
        d’activité”
      </li>
    </ul>

    <p>
      Après anonymisation et agrégation des données issues de ces trajets, et
      grâce à un travail conjoint avec l’IFPEN, Geovelo met à disposition des
      collectivités des outils d’analyse sur la mobilité vélo.
    </p>

    <p>
      Les indicateurs présentés dans Comment ça roule ? sont donc issus de ces
      analyses. Plus l’usage de l’application est développé sur un territoire,
      plus la fiabilité des données présentées sera grande.
    </p>
    <h2>Code</h2>
    <p>
      Le code est open source, il est hébergé par la Fabrique des Mobilités sur{' '}
      <a href="https://github.com/fabmob/cyclopolis">Github</a>.
    </p>
  </div>
)
