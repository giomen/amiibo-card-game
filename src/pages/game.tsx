import * as React from "react"
import { useCallback, useEffect, useState } from "react"
import { AppConstants } from "../shared/app-constants"
import { PARTIAL_API_PATHS } from "../shared/api-path"
import { Amiibo } from "../shared/models/gameSeries.interface"
import { CardImagesInterface } from "../shared/models/cardImages.interface"
import * as styles from "../styles/game.module.scss"
import GameCard from "../components/GameCard/GameCard"
import Loader from "../components/Loader/Loader"

const Game = ({ location }) => {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [turns, setTurns] = useState<number>(0)
  const [cardImages, setCardImages] = useState<CardImagesInterface[]>([])
  const [randomImages, setRandomCardImages] = useState<CardImagesInterface[]>([])
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)

  /***
   * Creates a randomized list of cards, duplicating the original list of cards
   * and setting the property state.
   * It also set the turn's counter to 0, meaning that the game is beginning
   */
  const randomCards = (cards: CardImagesInterface[]) => {
      const randomizedCards = [...cards, ...cards]
        .sort(() => Math.random() - 0.5)
        .map(card => ({ ...card, id: Math.random().toString() }))
      setRandomCardImages(randomizedCards)
      setTurns(0)
  }

  /***
   *
   * Check at which move the player is
   * @param card {CardImagesInterface} card to check
   */
  const handleChoice = (card: CardImagesInterface): void => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  /***
   * Every two choices, reset values and increment the turn
   */
  const resetChoices = (): void => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevState => prevState + 1)
  }

  /***
   *
   * @param src1 {string} card to compare
   * @param src2 {string} second card to compare
   * @return {boolean} returns true if the cards are the same
   */
  const checkChoices = (src1: string, src2: string): boolean => {
    return src1 === src2
  }

  /***
   *
   * @param card {CardImagesInterface} card to check
   * @return {boolean} returns true if the card is clicked for the first/second
   * choice or if is pair
   */
  const isCardFlipped = (card: CardImagesInterface): boolean => {
    return (card === choiceOne) || (card === choiceTwo) || (card.pair)
  }

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (checkChoices(choiceOne.src, choiceTwo.src)) {
        setRandomCardImages(prevState => {
          return prevState.map((card: CardImagesInterface) => {
            if (card.src === choiceOne.src) {
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

          let cards = result.amiibo.map(item => {
            return { src: item.image, pair: false }
          }).splice(0, Math.floor(Math.random() * result.amiibo.length))

          randomCards(cards)
          setCardImages(cards)
          setIsLoaded(true)
        },
        (error) => {
          setIsLoaded(true)
          setError(error)
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <Loader />
  } else {
    return (
      <div className={styles.Game}>
        <div className={styles.Game__new}
             onClick={() => randomCards(cardImages)}>
          Nuova partita
        </div>
        <div className={styles.Game__grid}>
          {
            randomImages.map(item => {
              console.log("item: ", item)
              return (
                <div className={styles.Game__grid}
                     key={item.id}>
                  <GameCard
                    isFlipped={isCardFlipped(item)}
                    handleChoice={handleChoice}
                    item={item} />
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default Game
