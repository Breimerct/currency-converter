<template>
  <q-page class="flex q-pa-sm doc-container justify-center non-selectable">
    <div class="main-column q-pa-md">
      <h4 class="text-center q-mt-none">Currency Converters</h4>
      <converter-form/>
      <line-chart-component/>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import {onMounted} from 'vue'
import {useStore} from 'src/store'

// components
import ConverterForm from 'components/ConverterForm.vue'
import LineChartComponent from 'components/LineChartComponent.vue'

const store = useStore()

onMounted(async () => {
  await store.dispatch('currencyConverterModule/fetchSymbolsAndCurrencies')
})

</script>

<style lang="scss" scoped>
.main-column {
  width: 70%;
  height: 100%;
}

@media (max-width: $breakpoint-xs-max) {
  .main-column {
    width: 100%;
    height: 100%;
  }
}
</style>
