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

  getFactories = user => axios.get(`${port}/${user}/factories`, {}, config);

  postFactory = (user, body) => axios.post(`${port}/${user}/factory`, body, config);

  deleteFactory = factoryId => axios.delete(`${port}/${factoryId}/factory`, {}, config);
}

export default MachineService;
