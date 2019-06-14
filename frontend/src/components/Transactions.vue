<template>
  <div>
    <b-table striped :items="items" :fields="fields">
      <template slot="timestamp" slot-scope="row" :id="row.item.id">{{getDateTime(row.item.timestamp)}}</template>
      <template slot="id" slot-scope="row" :id="row.item.id">
        <b-button @click="deleteItem(row.item)">Delete</b-button>
        <b-button @click="editItem(row.item)">Edit</b-button>
      </template>
    </b-table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Transaction from '../classes/Transaction';
import moment from 'moment';

@Component
export default class Transactions extends Vue {
  get items(): Transaction[] {
    return this.$store.getters['getTransactions'];
  }

  get fields() {
    return {
      'category.name': {
        label: 'Category',
        sortable: true
      },
      'name': {
        label: 'Name',
        sortable: true
      },
      'amount': {
        label: 'Amount',
        sortable: true
      },
      'timestamp': {
        label: 'Submitted',
        sortable: true
      },
      'modify': {
        key: 'id',
        label: '',
        sortable: false
      }
    };
  }

  private getDateTime(val: string | null): string {
    if (val === null || !moment(val).isValid) {
      return '';
    } else {
      return moment(val).format('M/D/YYYY LT');
    }
  }

  private deleteItem(transaction: Transaction): void {
    if (confirm('Are you sure you want to remove this transaction?')) {
      this.$store.dispatch('deleteTransaction', transaction);
    }
  }

  private editItem(transaction: Transaction): void {
    if (transaction.id) {
      this.$store.commit('setEditTransactionId', transaction.id);
    }
  }
}
</script>

<style scoped>
</style>
