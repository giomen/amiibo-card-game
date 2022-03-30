import * as React from "react"
import * as styles from "./HomeCard.module.scss"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { HomeCardProps } from "./model"
import { Link } from "gatsby"
import { RoutingPagesEnum } from "../../shared/enum/RoutingPages.enum"

const HomeCard = (props: HomeCardProps) => {
  return <Link to={`/${RoutingPagesEnum.GAME}`} id="link-to-game"
               state={{ gameSeries: props.item.name }}>
            <div>
              <div className={styles.HomeCard__wrapper}>
                <GatsbyImage image={getImage(props.item.childImageSharp.gatsbyImageData)}
                             objectFit="contain"
                             alt="Amiibo image" />
                <div className={styles.HomeCard__text}>
                  {props.item.name}
                </div>
              </div>
            </div>
          </Link>
}

export default HomeCard
