<script setup lang="ts">
import BaseBreadcrumb from '@/components/base-breadcrumb.vue'
import BaseDivider from '@/components/base-divider.vue'
import GpsAccessComponent from '@/components/gps-access-component.vue'
import PhotoComponent from '@/components/photo-component.vue'
import axios from 'axios'

// const supplierSearch = 'supplier test';
// axios.get(`/api/v1/report`)
//   .then(response => {
//     console.log(response.data);
//   })
//   .catch(error => {
//     console.error(error);
//   });
import { ref } from 'vue';

const printElement = (elementId: string) => {
  const printWindow = window.open('', '_blank');
  const elementToPrint = document.getElementById(elementId);

  printWindow.document.open();
  printWindow.document.write(`
    <html>
      <head>
        <title>Print</title>
        <style>
          @media print {
            body * {
              visibility: hidden;
            }
            #${elementId} {
              visibility: visible;
            }
          }
        </style>
      </head>
      <body>
        ${elementToPrint.outerHTML}
      </body>
    </html>
  `);

  // printWindow.document.close();
  printWindow.print();
  // printWindow.close();
};
</script>

<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h1>Template1</h1>
      <base-divider orientation="horizontal" />
      <component :is="BaseBreadcrumb" :breadcrumbs="[{ name: 'Template' }]" />
      <component :is="GpsAccessComponent"></component>
      <component :is="PhotoComponent"></component>
    </div>
    <div class="main-content-body">
      <div class="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
        <router-link to="/template/component" class="btn btn-xl btn-light-dark">
          Component
        </router-link>
        <router-link to="/template/form" class="btn btn-xl btn-light-dark">Form</router-link>
        <input type="text" name="search">
        <input type="date" name="dateFrom">
        <input type="date" name="dateTo">
        <select name="supplier" id="">
          <option value="PT ABC">val</option>
        </select>
        <button id="filter">Filter</button>
        <button id="search">Search</button>
        <button id="print" @click="printElement('elementToPrint')">Print</button>
        <!-- <div :id="elementId">Element to Print</div> -->
        <td id="dataSupplier">supplier test</td>
        <td id="dataSupplier">supplier test</td>
        <td id="dataSupplier">supplier test</td>
        <td id="dateInvoice">2023-01-01</td>
        <td id="dateInvoice">2022-01-01</td>
        <td id="dateInvoice">2022-06-01</td>
        <h1 id="elementToPrint">Test Print G</h1>
      </div>
    </div>
  </div>
</template>
