import API from '../../utils/API';


const CityhallService = {
  async createCityhall(req){
    return  await API.post('/Cityhall',  req);
  }
};

export default CityhallService;
