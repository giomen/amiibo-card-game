import * as React from "react"
import {Link, graphql, StaticQuery} from "gatsby"
import {RoutingPagesEnum} from '../../shared/enum/RoutingPages.enum'

export const Navigation = ({data}) => (
  <nav>
    <h3>{ data.site.siteMetadata.title }</h3>
    <div className="links">
      <Link to="/">{RoutingPagesEnum.HOME}</Link>
    </div>
  </nav>
)

const Navbar = () => {

    return (
      <StaticQuery query={graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }`
      } render={data => <Navigation data={data} />} />
    )
}

export default Navbar
