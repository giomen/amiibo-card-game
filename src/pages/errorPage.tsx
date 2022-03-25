import * as React from "react"

const styles = {
  display: "flex",
  "flex-direction": "column",
  "align-items": "center",
  height: "100vh",
  "justify-content": "center"
}

function ErrorPage({ location }) {
  return (
    <div style={styles}>
      <h1>Error Occurred!</h1>
      <h3>{location.state.error}</h3>
    </div>
  )
}

export default ErrorPage
