import * as React from "react"
import * as styles from './HomeCard.module.scss'
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import { GatsbyImageSharp } from "./model"
import { Link } from "gatsby"

type Props = {
  item: GatsbyImageSharp
}

const HomeCard = (props: Props) => {

  return <Link to="/game" state={{ gameSeries: props.item.name }}>
            <div>
              <div className={styles.HomeCard__wrapper}>
                <GatsbyImage image={getImage(props.item.childImageSharp.gatsbyImageData)}
                             alt="Amiibo image" />
                <div className={styles.HomeCard__text}>
                  {props.item.name}
                </div>
              </div>
            </div>
          </Link>
}

export default HomeCard
