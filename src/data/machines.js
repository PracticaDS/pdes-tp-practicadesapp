import empty from '../images/empty.png'

export default Array.from({ length: 100 }).map(() => ({ className: 'piece', src: empty, alt: '1' }));