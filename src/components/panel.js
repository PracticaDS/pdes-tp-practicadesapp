import React from 'react'
import empty from '../images/empty.png'

import './panel.css'

export default function Panel() {

  return (
		<div className="panel">
			{ Array.from({ length: 100 }).map(() => <img className="piece" src={empty} />) }
		</div>
	)
}