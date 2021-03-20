import React from 'react'
import {Link} from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import {cn, buildImageObj} from '../lib/helpers'
import {imageUrlFor} from '../lib/image-url'
import BlockText from './block-text'

import * as styles from './project-preview.module.css'
import {responsiveTitle3} from './typography.module.css'

function ProjectPreview (props) {
  return (
    /*<Link className={styles.root} to={`/project/${props.slug.current}`}>*/
    <div className={styles.root}>
      <div className={styles.leadMediaThumb}>
        {props.mainImage && props.mainImage.asset && (
          /*<img
            src={imageUrlFor(buildImageObj(props.mainImage))
              .width(600)
              .height(Math.floor((9 / 16) * 600))
              .url()}
            alt={props.mainImage.alt}
          />*/
          <GatsbyImage image={props.mainImage.asset.gatsbyImageData} alt={props.mainImage.alt} />
        )}
      </div>
      <h3 className={cn(responsiveTitle3, styles.title)}>{props.title}</h3>
      <p className={styles.dimensions}>{props.dimensions} cm</p>
      <p className={styles.price}>{props.price} &euro;</p>
    </div>
    /*</Link>*/
  )
}

export default ProjectPreview
