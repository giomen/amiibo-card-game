import React from "react"
import HomeCard from "./HomeCard"
import { gatsbyImageStub } from "../../../__mocks__/gatsby-image.js"
import { render, screen } from "@testing-library/react"

describe('Test for Home Card component', () => {
  it('Should create the component', () => {
    const {container} = render(<HomeCard item={gatsbyImageStub} />)

    expect(container).toBeTruthy()
  })
  it('Should have correct text in HomeCard__text', () => {
    render(<HomeCard item={gatsbyImageStub} />)

    const divElement = screen.getByText(/Animal Crossing/i)
    expect(divElement).toBeInTheDocument()
  })
})
