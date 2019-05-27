export const type = 'updateMachines';

const updateMachines = machinesToUpdate => ({
  type,
  machinesToUpdate
});

export default updateMachines;
