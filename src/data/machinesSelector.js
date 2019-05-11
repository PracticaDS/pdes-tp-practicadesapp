import seller from '../images/seller.png';
import crafter from '../images/crafter.png';
import furnace from '../images/furnace.png';
import starter from '../images/starter.png';
import transporter from '../images/transporter.png';

const machines = [
  { src: seller, typeMachine: 'seller', rawMaterialStarter: -1 },
  { src: crafter, typeMachine: 'crafter', rawMaterialStarter: -1 },
  { src: furnace, typeMachine: 'furnace', rawMaterialStarter: -1 },
  { src: starter, typeMachine: 'starter', rawMaterialStarter: 1 },
  { src: transporter, typeMachine: 'transporter', rawMaterialStarter: -1 }
];

export default machines.map(({ src, typeMachine, rawMaterialStarter }) => ({
  className: 'machine',
  src,
  alt: '1',
  rawMaterials: [],
  typeMachine,
  rawMaterialStarter,
  direction: 'down'
}));
