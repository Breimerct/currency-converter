import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { IState } from './state';

const getters: GetterTree<IState, StateInterface> = {
  getCurrencies: state => state.currencies,
  getSymbols: state => state.symbols,
  getResult: state => state.result,
  getTimeSeries: state => state.timeSeries,
  getResultLabels: state => state.resultLabels
};

export default getters;
