import {ActionTree} from 'vuex';
import {StateInterface} from '../index';
import {IState} from './state';
import {api} from 'boot/axios';
import {ICurrencies} from 'src/models/models';
import { Loading } from 'quasar'
import moment from 'moment';

const actions: ActionTree<IState, StateInterface> = {
  async fetchSymbolsAndCurrencies({commit}) {
    try {
      Loading.show()
      const {data} = await api.get('/symbols')
      const currencies = Object.keys(data.symbols)
        .map<ICurrencies>(key => ({
            value: key,
            label: `${data.symbols[key]} - (${key})`.trim()
          })
        )
      commit('setCurrencies', currencies)
      commit('setSymbols', Object.keys(data.symbols))
    } catch (e) {
      console.log(e)
    } finally {
      Loading.hide()
    }
  },

  async fetchConvert ({commit}, payload) {
    try {
      Loading.show()
      const { data } = await api.get('/convert', {
        params: payload
      })
      commit('setResult', data.result)
      return data.result
    } catch (e) {
      console.log(e)
      return 0
    } finally {
      Loading.hide()
    }
  },

  async fetchTimeSeries ({commit}, payload) {
    try {
      Loading.show()
      const timeSeries: number[] = []
      const labels: string[] = []
      const { data } = await api.get('/timeseries', {
        params: payload
      })
      Object.keys(data.rates).forEach(key => {
        timeSeries.push(data.rates[key][payload.symbols])
        labels.push(moment(key).format('MMM DD, YY'))
      })
      commit('setTimeSeries', timeSeries)
      commit('setResultLabels', labels)
    } catch (e) {
      console.log(e)
    } finally {
      Loading.hide()
    }
  }
};

export default actions;
