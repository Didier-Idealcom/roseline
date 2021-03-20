import React from 'react'
import {graphql} from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from '../lib/helpers'
import './index.css'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import ProjectPreviewCarousel from '../components/project-preview-carousel'
import SEO from '../components/seo'
import Layout from '../containers/layout'

export const query = graphql`
  query IndexPageQuery {
    bandeau: file(relativePath: { eq: "bandeau_signature.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, formats: [AUTO, WEBP, AVIF])
      }
    }
    illustration_artiste: file(relativePath: { eq: "illustration_artiste.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 600, formats: [AUTO, WEBP, AVIF])
      }
    }
    galerie1: file(relativePath: { eq: "galerie1.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 400, formats: [AUTO, WEBP, AVIF])
      }
    }
    galerie2: file(relativePath: { eq: "galerie2.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 400, formats: [AUTO, WEBP, AVIF])
      }
    }
    galerie3: file(relativePath: { eq: "galerie3.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 400, formats: [AUTO, WEBP, AVIF])
      }
    }
    galerie4: file(relativePath: { eq: "galerie4.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 400, formats: [AUTO, WEBP, AVIF])
      }
    }
    site: sanitySiteSettings(_id: {regex: "/(drafts.|)siteSettings/"}) {
      title
      description
      keywords
    }
    projects: allSanitySampleProject(
      limit: 6
      sort: {fields: [publishedAt], order: DESC}
      filter: {slug: {current: {ne: null}}, publishedAt: {ne: null}}
    ) {
      edges {
        node {
          id
          mainImage {
            crop {
              _key
              _type
              top
              bottom
              left
              right
            }
            hotspot {
              _key
              _type
              x
              y
              height
              width
            }
            asset {
              _id
              gatsbyImageData(width: 600, height: 480, formats: [WEBP, AVIF])
            }
            alt
          }
          title
          slug {
            current
          }
          dimensions
          price
        }
      }
    }
  }
`

const IndexPage = props => {
  const {data, errors} = props

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const site = (data || {}).site
  const projectNodes = (data || {}).projects
    ? mapEdgesToNodes(data.projects)
      .filter(filterOutDocsWithoutSlugs)
      .filter(filterOutDocsPublishedInTheFuture)
    : []

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    )
  }

  return (
    <Layout>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />

      <div id="bandeau" className="bandeau">
        <GatsbyImage image={data.bandeau.childImageSharp.gatsbyImageData} fadeIn alt="Bandeau Rose-Line" />
      </div>

      <div className="section section_intro">
        <Container>
          <h1 hidden>{site.title}</h1>
          <p className="text-center">Rose-Line était d’origine Gardoise (Uzès) mais en se mariant à un Antibois, elle a très vite adopté la Ville d’Antibes où elle a passé le reste de sa vie.</p>
        </Container>
      </div>

      <div id="realisations" className="section section_realisations">
        <Container>
          <p className="section_titre"><span>Réalisations</span></p>

          {projectNodes && (
            <ProjectPreviewCarousel
              nodes={projectNodes}
            />
          )}
        </Container>
      </div>

      <div id="artiste" className="section section_artiste">
        <Container>
          <p className="section_titre"><span>L'artiste</span></p>

          <div className="artiste_row1">
            <div className="artiste_row1_left">
              <GatsbyImage image={data.illustration_artiste.childImageSharp.gatsbyImageData} fadeIn alt="Illustration artiste" />
            </div>
            <div className="artiste_row1_right">
              <p>
                Rose-Line était une femme, mais aussi une mère de famille, une sœur et une grand mère aimante, souriante et généreuse, toujours là pour les autres mais également un véritable rayon de soleil pour son entourage : où qu’elle aille la bonne humeur était au rendez-vous.
              </p>
              <p>
                Un rayon de soleil qu’elle aimait retranscrire dans ses peintures de paysages de Provence.<br />
                Elle s’est découvert ce talent pour la peinture au moment de sa retraite et cela est devenu pour elle une véritable passion.<br />
                Pouvoir peindre les paysages qui l’ont émerveillé tout au long de sa vie lui procurait beaucoup de plaisir et rythmait son quotidien.
              </p>
            </div>
          </div>
          <div className="artiste_row2">
            <div className="artiste_row2_left">
              <p>
                Elle se faisait une joie d’exposer ses réalisations, ce qui lui permettait de faire des rencontres, mais également de partager son expérience. Elle a pu faire quelques petites expositions à Gourdon, Antibes, dans le Vaucluse, etc...
              </p>
              <p>
                Cette année cela fera 10 ans que le ciel l’a emporté, mais elle nous a laissé en souvenir ses précieuses peintures.
              </p>
            </div>
            <div className="artiste_row2_right">
              <div className="galerie">
                <GatsbyImage image={data.galerie1.childImageSharp.gatsbyImageData} fadeIn alt="Galerie 1" />
                <GatsbyImage image={data.galerie2.childImageSharp.gatsbyImageData} fadeIn alt="Galerie 2" />
                <GatsbyImage image={data.galerie3.childImageSharp.gatsbyImageData} fadeIn alt="Galerie 3" />
                <GatsbyImage image={data.galerie4.childImageSharp.gatsbyImageData} fadeIn alt="Galerie 4" />
              </div>
            </div>
          </div>
        </Container>
      </div>

      <div id="contact" className="section section_contact">
        <Container>
          <p className="section_titre"><span>Contact</span></p>

          <p className="text-center">
            Vous êtes intéressé ? Vous souhaitez plus d’informations ? Nous vous recontacterons.
          </p>
          <br />

          <form className="form_common" name="contact" action="/" method="POST" data-netlify="true">
            <input type="hidden" name="form-name" value="contact" />

            <div className="form_row">
              <div className="form_group form_group_vertical">
                <label htmlFor="nom">Nom</label>
                <input type="text" name="nom" id="nom" required />
              </div>
            </div>
            <div className="form_row">
              <div className="form_group form_group_vertical">
                <label htmlFor="prenom">Prénom</label>
                <input type="text" name="prenom" id="prenom" required />
              </div>
            </div>
            <div className="form_row">
              <div className="form_group form_group_vertical">
                <label htmlFor="email">E-mail</label>
                <input type="email" name="email" id="email" required />
              </div>
            </div>
            <div className="form_row">
              <div className="form_group form_group_vertical">
                <label htmlFor="telephone">Téléphone</label>
                <input type="text" name="telephone" id="telephone" required />
              </div>
            </div>
            <div className="form_row">
              <div className="form_group form_group_vertical">
                <label htmlFor="message">Message</label>
                <textarea name="message" id="message"></textarea>
              </div>
            </div>
            <div className="form_row">
              <div className="form_group">
                <button type="submit">Envoyer</button>
              </div>
            </div>
          </form>
        </Container>
      </div>
    </Layout>
  )
}

export default IndexPage
