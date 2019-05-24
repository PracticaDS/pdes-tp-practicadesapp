import axios from 'axios';

let _machineService = null;

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
};

const port = 'http://localhost:3001/api';

class MachineService {
  constructor() {
    if (!_machineService) {
      _machineService = this;
    } else {
      return _machineService;
    }
  }

  getFactories = user => axios.get(`${port}/factories`, {}, config);

  // getFactories = user =>
  //   new Promise(resolve =>
  //     resolve(
  //       ['gabriel', 'etolaba'].includes(user)
  //         ? { data: [{ name: 'partida 1', updatedAt: '2010/06/02', cantMachines: 2 }] }
  //         : { data: [] }
  //     )
  //   );
}

export default MachineService;
