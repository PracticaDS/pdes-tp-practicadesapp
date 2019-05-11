import empty from '../images/empty.png';

const machines = Array.from({ length: 100 }).map(() => ({
  className: 'dpiece',
  src: empty,
  alt: '1',
  rawMaterials: [],
  typeMachine: -1,
  rawMaterialStarter: -1,
  direction: 'd'
}));
machines[24] = Object.assign({}, machines[24], { className: 'dselected' });

export default machines;
