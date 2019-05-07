import empty from '../images/empty.png'

const machines = Array.from({ length: 100 }).map(() => ({ className: 'piece', src: empty, alt: '1' }));
machines[24] = Object.assign({}, machines[24], { className: 'selected' });

export default machines;