import * as React from "react"
import { useEffect, useState } from "react"
import { AppConstants } from "../shared/app-constants"
import { PARTIAL_API_PATHS } from "../shared/api-path"
import { Amiibo } from "../shared/models/gameSeries.interface"
import { CardImagesInterface } from "../shared/models/cardImages.interface"
import * as styles from "../styles/game.module.scss"
import { GameCard } from "../components/GameCard/GameCard"

const Game = ({ location }) => {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [turns, setTurns] = useState<number>(0)
  const [cardImages, setCardImages] = useState<CardImagesInterface[]>([])
  const [randomImages, setRandomCardImages] = useState<CardImagesInterface[]>([])
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)

  const randomCards = () => {
    const randomizedCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random().toString() }))
    setRandomCardImages(randomizedCards)
    setTurns(0)
  }

  const handleChoice = (item: CardImagesInterface) => {
    if(choiceOne) {
      /***
       *  If user clicked twice on a same card
       *  simply set again choiceOne
       *  otherwise set the second choice
       */
        setChoiceTwo(item)
      } else {
        setChoiceOne(item)
      }
  }

  /***
   * Every two choices, reset values and increment the turn
   */
  const resetChoices = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevState => prevState + 1)
  }

  const checkChoices = (src1: string, src2: string) => {
    return src1 === src2
  }

  useEffect(() => {
     if (choiceOne && choiceTwo) {
      if(checkChoices(choiceOne.src, choiceTwo.src)) {
        setCardImages(prevState => {
          return prevState.map((card: CardImagesInterface) => {
            if(card.src === choiceOne.src) {
              return { ...card, pair: true }
            } else {
              return card
            }
          })
        })
        resetChoices()
      } else {
        resetChoices()
      }
    }
  }, [choiceOne, choiceTwo])

  useEffect(() => {
    fetch(`${AppConstants.API_PATHS.BASE_URL}${PARTIAL_API_PATHS.GAME_SERIES}${location.state.gameSeries}`)
      .then(res => {
        return res.json()
      })
      .then(
        (result: Amiibo) => {
          //non serve
          //setItems(result.amiibo)
          setCardImages(result.amiibo.map(item => {
            return { src: item.image, id: '', pair: false }
          }))
          randomCards()
          setIsLoaded(true)
        },
        (error) => {
          setIsLoaded(true)
          setError(error)
        }
      )
  }, [isLoaded])


  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    return (
      <div className={styles.Game}>
        <div className={styles.Game__new}
             onClick={randomCards}>
          Nuova partita
        </div>
        <div className={styles.Game__grid}>
          {
            randomImages.map(item => (
              <div className={styles.Game__grid}
                   key={item.id}>
                <GameCard
                  handleChoice={handleChoice}
                  item={item} />
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default Game
