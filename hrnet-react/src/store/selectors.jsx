// Va cherche l'id le plus haut dans le store, et retourne ce nombre + 1 pour créer un nouvel id
export const getNewId = (state) => {
  let id = 0;
  state.forEach((employee) => {
    if (employee.id > id) {
      id = employee.id;
    }
  });
  return id + 1;
};
