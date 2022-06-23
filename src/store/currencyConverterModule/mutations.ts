import { MutationTree } from 'vuex';
import { IState } from './state';
import {ICurrencies} from 'src/models/models';

const mutation: MutationTree<IState> = {
  setCurrencies: (state:IState, payload: ICurrencies[]) => state.currencies = payload,
  setSymbols: (state: IState, payload: string[]) => state.symbols = payload,
  setResult: (state, payload: number) => state.result = payload,
  setTimeSeries: (state, payload: number[]) => state.timeSeries = payload,
  setResultLabels: (state, payload: string[]) => state.resultLabels = payload
};

export default mutation;
