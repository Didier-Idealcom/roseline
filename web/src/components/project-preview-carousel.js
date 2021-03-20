import {Link} from 'gatsby'
import React from 'react'
import ProjectPreview from './project-preview'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import * as styles from './project-preview-carousel.module.css'
import './custom-carousel.css'

function ProjectPreviewCarousel (props) {
  var j = props.nodes.length,
      chunk = 3,
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
    stopOnHover: true
  }

  return (
    <div className={styles.root}>
      {props.title && <h2 className={styles.headline}>{props.title}</h2>}

      <Carousel {...carouselOptions}>
        {nodes_subset && nodes_subset.map((subset, index) => (
          <div key={'slide' + index} className={styles.grid}>
            {subset && subset.map(node => (
              <ProjectPreview key={node.id} {...node} />
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
