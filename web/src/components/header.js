import {Link} from 'gatsby'
import React from 'react'
import Icon from './icon'
import {cn} from '../lib/helpers'
import AnchorLink from 'react-anchor-link-smooth-scroll'

import * as styles from './header.module.css'

const Header = ({onHideNav, onShowNav, showNav, siteTitle}) => (
  <div className={styles.root}>
    <div className={styles.wrapper}>
      {/*<div className={styles.branding}>
        <Link to='/'>{siteTitle}</Link>
      </div>*/}

      <button aria-label="Toggle menu" className={styles.toggleNavButton} onClick={showNav ? onHideNav : onShowNav}>
        <Icon symbol='hamburger' />
      </button>

      <nav className={cn(styles.nav, showNav && styles.showNav)}>
        <ul>
          <li>
            <AnchorLink href='#bandeau' offset='124'>Accueil</AnchorLink>
          </li>
          <li>
            <AnchorLink href='#realisations' offset='124'>Réalisations</AnchorLink>
          </li>
          <li>
            <AnchorLink href='#artiste' offset='124'>L'artiste</AnchorLink>
          </li>
          <li>
            <AnchorLink href='#contact' offset='124'>Contact</AnchorLink>
          </li>
        </ul>
      </nav>
    </div>
  </div>
)

export default Header
