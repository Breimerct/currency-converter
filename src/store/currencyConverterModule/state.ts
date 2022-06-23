import {ICurrencies} from 'src/models/models';

export interface IState {
  symbols: string[];
  currencies: ICurrencies[],
  result: number,
  timeSeries: number[],
  resultLabels: string[]
}

function state(): IState {
  return {
    symbols: [],
    currencies: [],
    result: 0,
    timeSeries: [],
    resultLabels: []
  };
}

export default state;
