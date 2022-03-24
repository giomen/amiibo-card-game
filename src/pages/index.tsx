import * as React from "react"
import "../styles/global.scss"
import * as styles from "../styles/home.module.scss"
import HomeCard from "../components/HomeCard/HomeCard"
import { graphql } from "gatsby"
import { GatsbyImageSharp } from "../components/HomeCard/model"
import Layout from "../components/layoutComponents/Layout"

export default function Home({ data }) {

  const HomeCardRenderer = (nodes: GatsbyImageSharp[]) =>
    (
      nodes.filter((item: GatsbyImageSharp) => item.relativeDirectory === "cards")
        .map((image: GatsbyImageSharp) => {
          return (<HomeCard item={image}
                            key={image.childImageSharp.id} />)
        })
    )

  return (
    <>
      <Layout>
        <div className={styles.home}>
          <h1>{data.site.siteMetadata.title}</h1>
          <div className={styles.cardContainer}>
            {HomeCardRenderer(data.allFile.nodes)}
          </div>
        </div>
      </Layout>
    </>
  )
}

export const query = graphql`
    query HomeCardImageQuery {
        allFile {
            nodes {
                childImageSharp {
                    gatsbyImageData
                }
                relativeDirectory
                name
            }
        }
        site {
            siteMetadata {
                contact
                copyright
                description
                title
            }
        }
    }
`
