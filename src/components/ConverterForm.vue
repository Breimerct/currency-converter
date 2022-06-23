<template>
  <q-form @submit.prevent="calc">
    <div class="row justify-center content-center items-center">
      <div class="col-12 col-sm-5">
        <div class="row">
          <div class="col-12">
            <q-select
              use-input
              clearable
              id="fromSelect"
              label="select currency"
              behavior="menu"
              input-debounce="0"
              clear-icon="eva-close-outline"
              v-model="fromSelect"
              :rules="formRules.fromSelectRules"
              :options="getCurrencies"
              @clear="clearFromSelect"
              @filter="filterFn"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
          <div class="col-12 q-mt-md">
            <q-input
              id="fromValue"
              label="enter values"
              v-model="fromValue"
              :rules="formRules.fromValueRules"
            />
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-2 q-my-md text-center">
        <q-btn round icon="eva-swap-outline" @click="changeValue"/>
      </div>
      <div class="col-12 col-sm-5">
        <div class="row">
          <div class="col-12">
            <q-select
              use-input
              clearable
              input-debounce="0"
              id="toSelect"
              label="select currency"
              behavior="menu"
              clear-icon="eva-close-outline"
              v-model="toSelect"
              :rules="formRules.toSelectRules"
              :options="getCurrencies"
              @clear="clearToSelect"
              @filter="filterFn"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
          <div class="col-12 q-mt-md">
            <q-input id="toValue" label="Result" readonly :model-value="toValue"/>
          </div>
        </div>
      </div>
      <div class="col-12 q-mt-md">
        <q-btn label="calc" class="full-width" color="primary" type="submit"/>
      </div>
    </div>
  </q-form>
</template>

<script lang="ts" setup>

import {ref, computed, watchEffect} from 'vue'
import {useStore} from 'src/store'
import {ICurrencies} from 'src/models/models'
import moment from 'moment'

const store = useStore()
const fromSelect = ref<ICurrencies>({value: '', label: ''})
const toSelect = ref<ICurrencies>({value: '', label: ''})
const fromValue = ref<number>(0)
const toValue = ref<number>(0)
const storeCurrencies = computed({
  get: () => store.getters['currencyConverterModule/getCurrencies'],
  set: val => store.commit('currencyConverterModule/setCurrencies', val)
})
const getCurrencies = ref(storeCurrencies.value)
const formRules = computed(() => ({
  fromSelectRules: [(val: ICurrencies) => !!val.value || 'field required'],
  toSelectRules: [(val: ICurrencies) => !!val.value || 'field required'],
  fromValueRules: [(val: number) => !!val || 'field required']
}))

const calc = async () => {
  const params = {
    from: fromSelect.value.value,
    to: toSelect.value.value,
    amount: fromValue.value
  }
  toValue.value = await store.dispatch('currencyConverterModule/fetchConvert', params)
}

const getTimeSeries = async () => {
  if (fromSelect.value.value && toSelect.value.value) {
    await store.dispatch('currencyConverterModule/fetchTimeSeries', {
      start_date: `${new Date().getFullYear()}-01-01`,
      end_date: moment().format('YYYY-MM-DD'),
      base: fromSelect.value.value,
      symbols: toSelect.value.value
    })
  }
}

const changeValue = () => {
  const fromSelectAux = fromSelect.value
  const toSelectAux = toSelect.value

  toSelect.value = fromSelectAux
  fromSelect.value = toSelectAux
}

const filterFn = (val: string, update: (arg0: { (): void; (): void }) => void) => {
  if (val === '') {
    update(() => {
      getCurrencies.value = storeCurrencies.value
    })
    return
  }

  update(() => {
    const needle = val.toLowerCase()
    getCurrencies.value = storeCurrencies.value.filter((v: ICurrencies) => v.label.toLowerCase().indexOf(needle) > -1)
  })
}

watchEffect(() => {
  getTimeSeries()
})

const clearFromSelect = () => {
  fromSelect.value = {
    value: '',
    label: ''
  }
}

const clearToSelect = () => {
  toSelect.value = {
    value: '',
    label: ''
  }
}
</script>

<style scoped>

</style>
