// @flow
import * as React from "react"
import { GameCardProps } from "./models"
import './GameCard.scss'
import { StaticImage } from "gatsby-plugin-image"


const GameCard = (props: GameCardProps) => {

  const handleClick = () => {
    if(!props.isFlipped) {
      props.handleChoice(props.item)
    }
  }

  const checkFlipped = (): boolean => {
    return props.isFlipped || props.item.pair
  }

  const classMap = (): string => {
    return `GameCard ${checkFlipped() ? 'GameCard--isFlipped' : ''}`
  }

  return (
    <div className={classMap()}>
      <div className="GameCard__wrapper">
        <div className="GameCard__card--front">
          <picture>
            <source srcSet={props.item.src} />
            <img src={props.item.src}
                 alt="image" />
          </picture>
        </div>
        <div className="GameCard__card--back"
             onClick={handleClick}>
          <StaticImage src="../../images/amiibo-logo.png"
                       alt="car back" />
        </div>
      </div>
    </div>
  )
}

export default GameCard
