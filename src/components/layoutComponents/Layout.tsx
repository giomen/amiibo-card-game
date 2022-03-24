import * as React from "react"
import Navbar from "./Navbar"
import '../../styles/global.scss'
import {graphql, useStaticQuery} from "gatsby";

const Layout = ({children}) => {

    const data = useStaticQuery(graphql`
            query ContactQuery {
              site {
                siteMetadata {
                  copyright
                }
              }
            }
        `
    )

    const {copyright} = data.site.siteMetadata

    return (
        <div className="Layout">
            <Navbar/>
            <div className="Layout__content">
                {children}
            </div>
            <footer>
                <p>{copyright}</p>
            </footer>
        </div>
    )
}

export default Layout
