import React from 'react'
import './Loader.styles.scss'

const Loader: React.FC = () => {
  return (
    <div className="container">
      {/* Big Grids */}
      <div className="grid-big">
        {Array.from({ length: 25 }).map((_, i) => (
          <div key={`cell-1-${i}`} className="cell-1"></div>
        ))}
      </div>
      <div className="grid-big">
        {Array.from({ length: 25 }).map((_, i) => (
          <div key={`cell-2-${i}`} className="cell-2"></div>
        ))}
      </div>
      <div className="grid-big">
        {Array.from({ length: 25 }).map((_, i) => (
          <div key={`cell-3-${i}`} className="cell-3"></div>
        ))}
      </div>
      <div className="grid-big">
        {Array.from({ length: 25 }).map((_, i) => (
          <div key={`cell-4-${i}`} className="cell-4"></div>
        ))}
      </div>
    </div>
  )
}

export default Loader
