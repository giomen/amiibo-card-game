import * as React from "react"
import { useEffect, useState } from "react"
import { AppConstants } from "../shared/app-constants"
import { PARTIAL_API_PATHS } from "../shared/api-path"
import { Amiibo } from "../shared/models/gameSeries.interface"
import { CardImagesInterface } from "../shared/models/cardImages.interface"
import * as styles from "../styles/game.module.scss"
import GameCard from "../components/GameCard/GameCard"
import Loader from "../components/Loader/Loader"
import Layout from "../components/layoutComponents/Layout"
import Modal from "../components/Modal/Modal"

const Game = ({ location }) => {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [turns, setTurns] = useState<number>(0)
  const [cardImages, setCardImages] = useState<CardImagesInterface[]>([])
  const [randomImages, setRandomCardImages] = useState<CardImagesInterface[]>([])
  const [choiceOne, setChoiceOne] = useState<CardImagesInterface>(null as unknown as CardImagesInterface)
  const [choiceTwo, setChoiceTwo] = useState<CardImagesInterface>(null as unknown as CardImagesInterface)
  const [isCardDisabled, setCardDisabled] = useState<boolean>(false)
  const [isModalOpen, setModalVisibility] = useState<boolean>(false)
  /***
   * Creates a randomized list of cards, duplicating the original list of cards
   * and setting the property state.
   * It also set the turn's counter to 0, meaning that the game is beginning
   */
  const randomCards = (cards: CardImagesInterface[]): void => {
    if(cardImages.length > 0) {
      cards = [...cardImages]
    }
    const tempCards = reduceCards(cards)

    const randomizedCards = [...tempCards, ...tempCards]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random().toString() }))
    setRandomCardImages(randomizedCards)
    setTurns(0)
  }

  /***
   *
   *
   */
  const reduceCards = (cards: CardImagesInterface[]): CardImagesInterface[] => {
    return cards.slice(0, Math.ceil(getRandomArbitrary(6, cards.length - 1)))
  }

  /***
   *
   * @param min {number}
   * @param max {number}
   */
  const getRandomArbitrary = (min: number, max: number): number => {
    return Math.random() * (max - min) + min;
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
    setChoiceOne(null as unknown as CardImagesInterface)
    setChoiceTwo(null as unknown as CardImagesInterface)
    setTurns(prevState => prevState + 1)
    setCardDisabled(false)
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
      setCardDisabled(true)
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
        setTimeout(() => resetChoices(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  useEffect(() => {
    fetch(`${AppConstants.API_PATHS.BASE_URL}${PARTIAL_API_PATHS.GAME_SERIES}${location.state.gameSeries}`)
      .then(res => {
        if (!res.ok) {
          throw new Error("Sorry, could not fetch data from the server")
        }
        return res.json()
      })
      .then(
        (result: Amiibo) => {
          let cards = result.amiibo.map(item => {
            return { src: item.image, pair: false }
          })

          randomCards(cards)
          setCardImages(cards)
          setIsLoaded(true)
        },
        (error) => {
          setIsLoaded(true)
          setError(error)
        }
      )
      .catch(e => setError(e))
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <Loader />
  } else {
    return (
      <Layout>
        <div className={styles.Game}>
          <div>
            <h2>{location.state.gameSeries} Series!</h2>
            <p>Find out all the matching cards!</p>
            <div className={styles.Game__new}
                 onClick={() => randomCards(cardImages)}>
              New Game
            </div>
          </div>
          <div className={styles.Game__grid}>
            {
              randomImages.map(item => {
                return (
                  <div className={styles.Game__grid}
                       key={item.id}>
                    <GameCard
                      isFlipped={isCardFlipped(item)}
                      handleChoice={handleChoice}
                      isDisabled={isCardDisabled}
                      item={item} />
                  </div>
                )
              })
            }
          </div>
        </div>
        <Modal isOpen={isModalOpen}
               onClose={() => setModalVisibility(false)}
               title="Titolo modale"/>
      </Layout>
    )
  }
}

export default Game
