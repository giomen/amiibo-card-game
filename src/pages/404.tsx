import * as React from "react"
import Layout from "../components/layoutComponents/Layout"

const styles = {
  display: "flex",
  "flex-direction": "column",
  "align-items": "center",
  height: "100vh",
  "justify-content": "center"
}

function NotFound() {
  return (
    <Layout>
      <div style={styles}>
        <h1>Page not found</h1>
        <h3>Sorry, page not found!</h3>
      </div>
    </Layout>
  )
}

export default NotFound
