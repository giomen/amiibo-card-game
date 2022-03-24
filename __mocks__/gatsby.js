const React = require("react")
const gatsby = jest.requireActual("gatsby")

module.exports = {
  ...gatsby,
  graphql: jest.fn(),
  Link: jest.fn().mockImplementation(
    // these props are invalid for an `a` tag
    ({
       activeClassName,
       activeStyle,
       getProps,
       innerRef,
       partiallyActive,
       ref,
       replace,
       to,
       ...rest
     }) =>
      React.createElement("a", {
        ...rest,
        href: to,
      })
  ),
  StaticQuery: jest.fn(),
  useStaticQuery: jest.fn(),
  GatsbyImageSharp: jest.mock("gatsby-plugin-image", () => {
    const React = require("react")
    const plugin = jest.requireActual("gatsby-plugin-image")

    const mockImage = ({imgClassName, ...props}) =>
      React.createElement("img", {
        ...props,
        className: imgClassName,
      })

    const mockPlugin = {
      ...plugin,
      GatsbyImage: jest.fn().mockImplementation(mockImage),
      StaticImage: jest.fn().mockImplementation(mockImage),
    }

    return mockPlugin
  })
}
