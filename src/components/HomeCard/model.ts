import { ImageDataLike } from "gatsby-plugin-image"
import * as React from "react"

export interface GatsbyImageSharp {
  childImageSharp: {
    gatsbyImageData: ImageDataLike;
    id: React.Key | null | undefined
  }
  relativeDirectory: string;
  name: string;
}
