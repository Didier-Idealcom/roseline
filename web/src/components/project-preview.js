import React from 'react'
import {Link} from 'gatsby'
import { useLightbox } from 'simple-react-lightbox'
import { GatsbyImage } from 'gatsby-plugin-image'
import {cn, buildImageObj} from '../lib/helpers'
import {imageUrlFor} from '../lib/image-url'
import BlockText from './block-text'

import * as styles from './project-preview.module.css'
import {responsiveTitle3} from './typography.module.css'

function ProjectPreview (props) {
  const { openLightbox, closeLightbox } = useLightbox()

  return (
    /*<Link className={styles.root} to={`/project/${props.slug.current}`}>*/
    <div className={styles.root}>
      <div className={styles.leadMediaThumb}>
        {props.mainImage && props.mainImage.asset && (
          <a onClick={() => openLightbox(props.index)} attrindex={props.index}>
            <GatsbyImage image={props.mainImage.asset.gatsbyImageData} alt={props.mainImage.alt} srl_gallery_image="true" />
          </a>
        )}
      </div>
      <h3 className={cn(responsiveTitle3, styles.title)}>{props.numero} - {props.title}</h3>
      <p className={styles.dimensions}>{props.dimensions}</p>
      <p className={styles.price}>{props.price} &euro;</p>
    </div>
    /*</Link>*/
  )
}

export default ProjectPreview
