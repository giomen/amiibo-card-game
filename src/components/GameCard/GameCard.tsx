// @flow
import * as React from "react"
import { GameCardProps } from "./models"
import * as styles from './GameCard.module.scss'
import { StaticImage } from "gatsby-plugin-image"

export const GameCard = (props: GameCardProps) => {

  const handleClick = () => {
    props.handleChoice(props.item)
  }

  return (
    <div className={styles.GameCard}>
      <div className={styles.GameCard__wrapper}>
        <div className={styles.GameCard__cardFront}>
          <picture>
            <source srcSet={props.item.src} />
            <img src={props.item.src}
                 alt="image" />
          </picture>
        </div>
        <div className={styles.GameCard__cardBack}
             onClick={handleClick}>
          <StaticImage src="../../images/amiibo-logo.png"
                       alt="car back" />
        </div>
      </div>
    </div>
  )
}
