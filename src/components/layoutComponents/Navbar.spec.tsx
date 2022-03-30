import React from "react"
import { Navigation as Navbar } from "./Navbar"
import renderer from "react-test-renderer"
import { StaticQuery } from "gatsby"

beforeEach(() => {
  StaticQuery.mockImplementationOnce(({ render }) =>
    render({
      site: {
        siteMetadata: {
          title: `Default Starter`,
        },
      },
    })
  )
})

describe('Test for Navbar component', () => {
  it('Should create the component', () => {
    const data = {
      site: {
        siteMetadata: {
          title: "Gatsby Starter Blog",
        },
      },
    }
    const tree = renderer.create(<Navbar data={data} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
