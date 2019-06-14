<template>
  <div>
    <b-container>
      <b-row>
        <b-col cols="6">
          <TransactionForm
            :edit="editTransaction"
            :id="editTransactionId"/>
        </b-col>
        <b-col cols="6">
          <CategoryForm/>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <Transactions cols="12"/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Details from '@/components/Details.vue';
import Transactions from '@/components/Transactions.vue';
import TransactionForm from '@/components/TransactionForm.vue';
import CategoryForm from '@/components/CategoryForm.vue';

@Component({
  components: {
    Details,
    Transactions,
    TransactionForm,
    CategoryForm
  }
})
export default class MainApp extends Vue {
  get editTransactionId(): number | null {
    return this.$store.getters['getEditTransactionId'];
  }

  get editTransaction(): boolean {
    return this.editTransactionId !== null && this.editTransactionId !== undefined;
  }
}
</script>
