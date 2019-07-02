import axios from 'axios';

let _machineService = null;

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
};

const port = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001/api';

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

  getMachines = factoryId => axios.get(`${port}/${factoryId}/machines`, {}, config);

  putMachines = machines => axios.put(`${port}/machines`, machines, config);
}

export default MachineService;
