import React from 'react'
import seller from '../../images/seller.png'
import crafter from '../../images/crafter.png'
import furnace from '../../images/furnace.png'
import starter from '../../images/starter.png'
import transporter from '../../images/transporter.png'

import './machines.css'

export default function Machines() {
  return (
    <div className="machines">

      <img className="machine" src={starter} />
      <img className="machine" src={seller} />
      <img className="machine" src={furnace} />
      <img className="machine" src={crafter} />
      <img className="machine" src={transporter} />

    </div>
  )
}