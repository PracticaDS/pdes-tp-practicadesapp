export const selectFicha = (id) => {
  return {
    type: 'SELECT',
    id
  };
};

export const resolveFichas = () => {
  return {
    type: 'RESOLVE_FICHAS'
  };
};
