import React from "react"
import { fireEvent, render, RenderOptions, screen } from "@testing-library/react"
import Game from "./game"
import { amiiboResponse } from "../../__mocks__/amiibo-response.stub.js"
import { act } from "react-dom/test-utils"
import { unmountComponentAtNode } from "react-dom"

jest.mock("../components/layoutComponents/Layout", () => {
  return function DummyLayout(props) {
    return (
      <div data-testid="layout">
      { props.children }
      </div>)
  }
})

describe("Game Page test", () => {
  it("Should create the component", async () => {

    const location = {
      state: {
        gameSeries: "Pokemon"
      }
    }
    global["fetch"] = jest.fn().mockImplementation(async () =>
      Promise.resolve({
        json: () => Promise.resolve(amiiboResponse),
      }),
    )

    await act(async () => {
      const {container} = render(<Game location={location} />)
      expect(container).toBeInTheDocument()
    })

    // @ts-ignore
    global.fetch.mockRestore()
  })
})
