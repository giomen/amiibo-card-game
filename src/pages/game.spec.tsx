import React from "react"
import { fireEvent, getByTestId, render, screen, waitFor } from "@testing-library/react"
import Game from "./game"
import { act } from "react-dom/test-utils"


jest.mock("../components/layoutComponents/Layout", () => {
  return function DummyLayout(props) {
    return (
      <div data-testid="layout">
        {props.children}
      </div>)
  }
})

describe("Game Page test", () => {

  it("Should test the component", async () => {

    const location = {
      state: {
        gameSeries: "Pokemon"
      }
    }
    await act(async () => {
      const { container, getByTestId } = render(<Game location={location} />)
      const loader = getByTestId("loader")

      expect(container.firstChild).toContainElement(loader)

      await waitFor(() => screen.getByTestId("game-series-title"))
      const elem = container.getElementsByTagName("h2")
      expect(elem[0]).toHaveTextContent(`${location.state.gameSeries} Series!`)

      const grid = screen.getByTestId("card-grid")
      console.log("grid: ", grid)
      expect(grid).toBeInTheDocument()
    })

  })

})

