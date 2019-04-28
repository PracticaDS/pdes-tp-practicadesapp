import React from 'react'

import './machine.css'

const images = {
  seller: <img className="machine" src={require('../images/seller.png')} />
}

export default function Machine({ image }) {
  return images[image]
}