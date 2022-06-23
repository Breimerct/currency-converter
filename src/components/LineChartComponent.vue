<template>
  <section class="q-mt-lg">
    <line-chart :chartData="testData" :options="options"/>
  </section>
</template>

<script lang="ts" setup>
import {computed, ref} from 'vue';
import moment from 'moment'
import {LineChart} from 'vue-chart-3'
import {Chart, ChartData, ChartOptions, registerables} from 'chart.js'
import { useStore } from 'src/store';

Chart.register(...registerables);
const actualYear = ref(new Date().getFullYear())
const countMonths = parseInt(moment(`${actualYear.value}-01-01`, 'YYYYMMDD').fromNow().split(' ')[0])
const labels = ref<string[]>([])
const store = useStore()

for (let i = 0; i < countMonths; i++) {
  labels.value.push(moment(moment(`01/01/${actualYear.value}`).add(i, 'months').calendar()).format('MMMM'))
}

const testData = computed<ChartData<'line'>>(() => ({
  labels: store.getters['currencyConverterModule/getResultLabels'],
  datasets: [
    {
      data: store.getters['currencyConverterModule/getTimeSeries'],
      fill: true,
      backgroundColor: 'rgba(26,90,210, 0.16)',
      borderColor: 'rgb(26,90,210)',
      pointStyle: 'dash',
      yAxisID: '$'
    },
  ],
}));

const options = ref<ChartOptions<'line'>>({
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      display: false
    },
    title: {
      display: false,
      text: 'Chart.js Line Chart',
    },
  },
});
</script>

<style scoped>

</style>
