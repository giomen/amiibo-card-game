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
import { v4 as uuidv4 } from "uuid"

const Game = ({ location }) => {
  const [error, setError] = useState(null as unknown as string)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [turns, setTurns] = useState<number>(0)
  const [matchedCards, setMatchedCards] = useState<number>(2)
  const [cardImages, setCardImages] = useState<CardImagesInterface[]>([])
  const [randomCards, setRandomCards] = useState<CardImagesInterface[]>([])
  const [firstChoice, setFirstChoice] = useState<CardImagesInterface>(null as unknown as CardImagesInterface)
  const [secondChoice, setSecondChoice] = useState<CardImagesInterface>(null as unknown as CardImagesInterface)
  const [isCardDisabled, setCardDisabled] = useState<boolean>(false)
  const [isModalOpen, setModalVisibility] = useState<boolean>(false)
  /***
   * Creates a randomized list of cards, duplicating the original list of cards
   * and setting the property state.
   * It also set the turn's counter to 0, meaning that the game is beginning
   */
  const randomizeCards = (cards: CardImagesInterface[]): void => {
    setModalVisibility(false)
    if (cardImages.length > 0) {
      cards = [...cardImages]
    }
    const tempCards = reduceCards(cards)

    const randomizedCards = [...tempCards, ...tempCards]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: uuidv4() }))
    setRandomCards(randomizedCards)
    setTurns(0)
    setMatchedCards(2)
  }

  /***
   * returns a subset of cards, because often there are too many card for the game
   * @param cards {CardImagesInterface[]}
   * @return {CardImagesInterface[]}
   */
  const reduceCards = (cards: CardImagesInterface[]): CardImagesInterface[] => {
    const maxValue = cards.length > 15 ? 15 : cards.length
    return cards.slice(0, Math.ceil(getRandomArbitrary(6, maxValue)))
  }

  /***
   *
   * @param min {number}
   * @param max {number}
   */
  const getRandomArbitrary = (min: number, max: number): number => {
    return Math.random() * (max - min) + min
  }

  /***
   *
   * Check at which move the player is
   * @param card {CardImagesInterface} card to check
   */
  const handleChoice = (card: CardImagesInterface): void => {
    firstChoice ? setSecondChoice(card) : setFirstChoice(card)
  }

  /***
   * Every two choices, reset values and increment the turn
   */
  const resetChoices = (): void => {
    setFirstChoice(null as unknown as CardImagesInterface)
    setSecondChoice(null as unknown as CardImagesInterface)
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
    return (card === firstChoice) || (card === secondChoice) || (card.pair)
  }

  /***
   *
   */
  const checkComplete = (): void => {
    if (matchedCards === randomCards.length) {
      setModalVisibility(true)
    }
  }

  useEffect(() => {
    if (firstChoice && secondChoice) {
      setCardDisabled(true)
      if (checkChoices(firstChoice.src, secondChoice.src)) {
        setRandomCards(prevState => {
          return prevState.map((card: CardImagesInterface) => {
            if (card.src === firstChoice.src) {
              setMatchedCards(prevState => prevState + 1)
              return { ...card, pair: true }
            } else {
              return card
            }
          })
        })
        resetChoices()
        checkComplete()
      } else {
        setTimeout(() => resetChoices(), 1000)
      }
    }
  }, [firstChoice, secondChoice])

  useEffect(() => {
    let isMounted = true
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

          randomizeCards(cards)
          setCardImages(cards)
          setIsLoaded(true)
        },
        (error: Error) => {
          setIsLoaded(true)
          setError(error)
        }
      )
      .catch(e => {
        if (isMounted) {
          setError(e)
        }
      })
    return () => {
      isMounted = false
    }
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <Loader />
  } else {
    return (
      <Layout>
        <div className={styles.Game}>
          <div className={styles.Game__heading}>
            <h2>{location.state.gameSeries} Series!</h2>
            <p>Find out all the matching cards!</p>
            <div className={styles.Game__new}
                 onClick={() => randomizeCards(cardImages)}>
              New Game
            </div>
          </div>
          <div className={styles.Game__grid}>
            {
              randomCards.map(item => {
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
               onClose={() => setModalVisibility(false)}>
          <div className={styles.Game__modalComplete}>
            <h1 className={styles.Game__modalText}>
              Congratulations, you found all the matching cards!
            </h1>
            <div className={styles.Game__new}
                 onClick={() => randomizeCards(cardImages)}>
              Play again!
            </div>
          </div>
        </Modal>
      </Layout>
    )
  }
}

export default Game
