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
import receta1 from '../images/receta1.jpeg';
import receta2 from '../images/receta2.jpg';

const machines = [
  { src: seller, typeMachine: 'seller' },
  { src: crafter, typeMachine: 'crafter' },
  { src: furnace, typeMachine: 'furnace' },
  { src: starter, typeMachine: 'starter', rawMaterialStarter: 1 },
  { src: transporter, typeMachine: 'transporter' },
  { src: girar, typeMachine: 'girar' },
  { src: move, typeMachine: 'move', className: 'selected' },
  { src: remove, typeMachine: 'remove' },
  { src: oro, typeMachine: 'oro', value: 100 },
  { src: hierro, typeMachine: 'hierro', value: 70 },
  { src: cobre, typeMachine: 'cobre', value: 50 },
  { src: receta1, typeMachine: 'receta1', crafterMaterials: [100, 50], crafterReturn: 70 },
  { src: receta2, typeMachine: 'receta2', crafterMaterials: [60, 50], crafterReturn: 100 }
];

export default machines.map(
  ({
    src,
    className = 'machine',
    typeMachine,
    rawMaterialStarter = -1,
    value = -1,
    crafterMaterials = [],
    crafterReturn = -1
  }) => ({
    className,
    src,
    alt: '1',
    rawMaterials: [],
    typeMachine,
    rawMaterialStarter,
    direction: 'd',
    value,
    crafterMaterials,
    crafterReturn
  })
);
