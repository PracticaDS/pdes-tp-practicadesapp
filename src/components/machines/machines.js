import React from 'react'
import machines from '../../data/machinesSelector'

import './machines.css'

export default function Machines() {
  return (
    <div className="machines">

      { machines.map(({ className, src, alt }, i) => <img key={i} className={className} src={src} alt={alt} onClick={() => {}} />) }

    </div>
  )
}