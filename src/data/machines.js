import empty from '../images/empty.png';

const machines = Array.from({ length: 100 }).map((_, position) => ({
  className: 'dpiece',
  src: empty,
  alt: '1',
  position,
  rawMaterials: [],
  typeMachine: -1,
  rawMaterialStarter: -1,
  direction: 'd',
  value: -1,
  crafterMaterials: [],
  crafterReturn: -1
}));
machines[24] = Object.assign({}, machines[24], { className: 'dselected' });

export default machines;
