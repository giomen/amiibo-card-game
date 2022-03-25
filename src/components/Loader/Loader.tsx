import * as React from "react"
import * as styles from "./Loader.module.scss"

const Loader = () => {
  return (
    <div data-testid="loader" className={styles.Loader}>
      <div className={styles.Loader__circle}>
        <svg viewBox="25 25 50 50">
          <circle className="path"
                  cx="50"
                  cy="50"
                  r="20"
                  fill="none"
                  strokeWidth="2"
                  strokeMiterlimit="10" />
        </svg>
      </div>
    </div>
  )
}

export default Loader
