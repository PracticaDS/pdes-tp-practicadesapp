import seller from '../images/seller.png'
import crafter from '../images/crafter.png'
import furnace from '../images/furnace.png'
import starter from '../images/starter.png'
import transporter from '../images/transporter.png'

const machines = [seller, crafter, furnace, starter, transporter];

export default machines.map(src => ({ className: 'machine', src, alt: '1' }));