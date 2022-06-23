import {store} from 'quasar/wrappers'
import {InjectionKey} from 'vue'
import {createStore, Store as VuexStore, useStore as vuexUseStore,} from 'vuex'
import currencyConverterModule from 'src/store/currencyConverterModule';

export interface StateInterface {
  example: unknown
}

// provide typings for `this.$store`
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: VuexStore<StateInterface>
  }
}

export const storeKey: InjectionKey<VuexStore<StateInterface>> = Symbol('vuex-key')

export default store(function () {
  return createStore<StateInterface>({
    modules: {
      currencyConverterModule
    },
    strict: !!process.env.DEBUGGING
  });
})

export function useStore() {
  return vuexUseStore(storeKey)
}
