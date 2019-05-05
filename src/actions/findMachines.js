export const type = 'findMachines';

const findMachines = (selected) => ({
    type,
    payload: selected,
});

export default findMachines;