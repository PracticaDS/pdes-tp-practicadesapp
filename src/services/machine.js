import axios from 'axios';
import moment from 'moment';

let _machineService = null;

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
};

const port = 'http://localhost:8080';

class MachineService {
  constructor() {
    if (!_machineService) {
      _machineService = this;
    } else {
      return _machineService;
    }
  }

  // getFactories = user =>
  //   axios
  //     .get(`${port}/${user}/factories`, {}, config)
  //     .then(factories => factories)
  //     .catch(console.log);

  getFactories = user =>
    new Promise(resolve =>
      resolve(
        ['gabriel', 'etolaba'].includes(user)
          ? [{ name: 'partida 1', updatedAt: moment().format('YYYY/MM/DD'), cantMachines: 2 }]
          : []
      )
    );
}

export default MachineService;
