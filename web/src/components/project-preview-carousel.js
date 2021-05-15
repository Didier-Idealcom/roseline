import {Link} from 'gatsby'
import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import ProjectPreview from './project-preview'
import { SRLWrapper, useLightbox } from 'simple-react-lightbox'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import * as styles from './project-preview-carousel.module.css'
import './custom-carousel.css'

function ProjectPreviewCarousel (props) {
  //const { openLightbox, closeLightbox } = useLightbox()

  var j = props.nodes.length,
      chunk = 12,
      nodes_subset = Array()
  for (var i = 0; i < j; i += chunk) {
    nodes_subset.push(props.nodes.slice(i, i + chunk))
  }

  const carouselOptions = {
    autoPlay: false,
    infiniteLoop: true,
    showArrows: false,
    showStatus: false,
    showThumbs: false,
    dynamicHeight: false,
    swipeable: true,
    emulateTouch: true,
    stopOnHover: true,
    swipeScrollTolerance: 80
  }

  const lightboxOptions = {
    buttons: {
      showDownloadButton: false
    }
  }

  return (
    <div className={styles.root}>
      {props.title && <h2 className={styles.headline}>{props.title}</h2>}

      <SRLWrapper options={lightboxOptions}>
        {nodes_subset && nodes_subset.map((subset, index) => (
          <div key={'wrapper_key' + index} className={styles.SRLWrapper}>
            {subset && subset.map(node => (
              <a key={'item' + node.id} href={node.mainImage.asset.gatsbyImageData.images.fallback.src}>
                <GatsbyImage image={node.mainImage.asset.gatsbyImageData} alt={node.mainImage.alt} srl_gallery_image="true" />
              </a>
            ))}
          </div>
        ))}
      </SRLWrapper>

      <Carousel {...carouselOptions}>
        {nodes_subset && nodes_subset.map((subset, index) => (
          <div key={'slide' + index} className={styles.grid}>
            {subset && subset.map((node, index2) => (
              <ProjectPreview key={node.id} {...node} index={index * chunk + index2} />
            ))}
          </div>
        ))}
      </Carousel>

      {props.browseMoreHref && (
        <div className={styles.browseMoreNav}>
          <Link to={props.browseMoreHref}>Browse more</Link>
        </div>
      )}
    </div>
  )
}

ProjectPreviewCarousel.defaultProps = {
  title: '',
  nodes: [],
  browseMoreHref: ''
}

export default ProjectPreviewCarousel
