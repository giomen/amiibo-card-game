import * as React from "react"
import {Link, graphql, useStaticQuery} from "gatsby"

const Navbar = () => {

    const data = useStaticQuery(graphql`
      query siteQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `)

    const {title} = data.site.siteMetadata

    return (
        <nav>
            <h3>{ title }</h3>
            <div className="links">
                <Link to="/">Home</Link>
            </div>
        </nav>
    )
}

export default Navbar
