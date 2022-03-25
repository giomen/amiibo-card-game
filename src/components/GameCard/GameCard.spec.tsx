import React from "react";
import { CardImagesInterface } from "../../shared/models/cardImages.interface"
import GameCard from "./GameCard"
import { GameCardProps } from "./models"
import { fireEvent, render } from "@testing-library/react"

const itemImage: CardImagesInterface = {
  src: 'path.png',
  pair: false
}

const mockHandleChoice = jest.fn()

const props: GameCardProps = {
  item: itemImage,
  handleChoice: mockHandleChoice,
  isFlipped: false,
  isDisabled: false
}

describe('Test for Game Card component', () => {
  it('Should create the component', () => {
    const {container} = render(<GameCard {...props}/>)

    expect(container.firstChild).toHaveClass('GameCard')
    expect(container.getElementsByClassName('GameCard--isFlipped').length).toBe(0)
  })
  it('Should test isFlipped class', () => {
    const {container, rerender} = render(<GameCard {...props}/>)

    expect(container.firstChild).toHaveClass('GameCard')
    expect(container.getElementsByClassName('GameCard--isFlipped').length).toBe(0)

    const newPropsFlipped: GameCardProps = {
      ...props,
      isFlipped: true
    }
    rerender(<GameCard {...newPropsFlipped}/>)
    expect(container.firstChild).toHaveClass('GameCard--isFlipped')

    const newPropsPair: GameCardProps = {
      ...props,
      item: {
        ...props.item,
        pair: true
      }
    }
    rerender(<GameCard {...newPropsPair}/>)
    expect(container.firstChild).toHaveClass('GameCard--isFlipped')
  })

  it('Should not call handleChoice if card is disabled', () => {
    const newProps: GameCardProps = {
      ...props,
      isDisabled: true
    }
    const {container} = render(<GameCard {...newProps}/>)
    const element = container.getElementsByClassName('GameCard__card--back')
    fireEvent.click(element[0])
    expect(newProps.handleChoice).toHaveBeenCalledTimes(0)
  })

  it('Should call handleChoice if card is not disabled', () => {
    const {container} = render(<GameCard {...props}/>)
    const element = container.getElementsByClassName('GameCard__card--back')
    fireEvent.click(element[0])
    expect(props.handleChoice).toHaveBeenCalled()
  })
})
