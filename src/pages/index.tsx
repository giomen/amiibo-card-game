import * as React from "react"
import '../styles/global.scss'
import * as styles from '../styles/home.module.scss'
import HomeCard from "../components/HomeCard/HomeCard"
import { graphql } from "gatsby"
import { GatsbyImageSharp } from "../components/HomeCard/model"


export default function Home({data}) {
  const title = 'Amiibo Memory Card Game'

  const HomeCardRenderer = (nodes: GatsbyImageSharp[]) =>
        (
          nodes.filter((item: GatsbyImageSharp) => item.relativeDirectory === "cards")
                          .map((image: GatsbyImageSharp) => {
                            return (<HomeCard item={image}
                                      key={image.childImageSharp.id} />)
                          })
        )


  return <div className={styles.home}>
    <h1>{title}</h1>
    <div className={styles.cardContainer}>
      {HomeCardRenderer(data.allFile.nodes)}
    </div>
  </div>
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
    }
`
