import seller from '../images/seller.png';
import crafter from '../images/crafter.png';
import furnace from '../images/furnace.png';
import starter from '../images/starter.png';
import transporter from '../images/transporter.png';
import girar from '../images/girar.jpg';
import oro from '../images/oro.jpeg';
import hierro from '../images/hierro.jpg';
import cobre from '../images/cobre.jpg';
import move from '../images/move.png';
import remove from '../images/delete.png';

const machines = [
  { src: seller, typeMachine: 'seller', rawMaterialStarter: -1 },
  { src: crafter, typeMachine: 'crafter', rawMaterialStarter: -1 },
  { src: furnace, typeMachine: 'furnace', rawMaterialStarter: -1 },
  { src: starter, typeMachine: 'starter', rawMaterialStarter: 1 },
  { src: transporter, typeMachine: 'transporter', rawMaterialStarter: -1 },
  { src: girar, typeMachine: 'girar', rawMaterialStarter: -1 },
  { src: move, typeMachine: 'move', rawMaterialStarter: -1 },
  { src: remove, typeMachine: 'remove', rawMaterialStarter: -1 },
  { src: oro, typeMachine: 'oro', rawMaterialStarter: -1, value: 100 },
  { src: hierro, typeMachine: 'hierro', rawMaterialStarter: -1, value: 70 },
  { src: cobre, typeMachine: 'cobre', rawMaterialStarter: -1, value: 50 }
];

export default machines.map(({ src, typeMachine, rawMaterialStarter, value = -1 }) => ({
  className: 'machine',
  src,
  alt: '1',
  rawMaterials: [],
  typeMachine,
  rawMaterialStarter,
  direction: 'd',
  value
}));
