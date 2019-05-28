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
    new Promise((resolve, reject) =>
      ['gabriel', 'etolaba'].includes(user)
        ? resolve([{ name: 'partida 1', updatedAt: moment().format('YYYY/MM/DD'), cantMachines: 2 }])
        : reject('error')
    );
}

export default MachineService;

// const setItem = (key, value) => localStorage.setItem(key, JSON.stringify(value))

// const getItem = key => JSON.parse(localStorage.getItem(key))

// const removeItem = key => localStorage.removeItem(key)

// module.exports = {setItem, getItem, removeItem};
