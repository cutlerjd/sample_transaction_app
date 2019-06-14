<template>
  <b-card
    :title="!edit ? 'Add Transaction' : 'Edit Transaction'">
    <b-form @submit.stop.prevent="submitForm">
        <b-form-group id="nameinputgroup" label="Name of transaction:" label-for="nameinput">
            <b-form-input
            id="nameinput"
            v-model="form.name"
            required
            placeholder="Name of transaction"
            ></b-form-input>
        </b-form-group>
        <b-form-group id="categoryinputgroup" label="Category:" label-for="categoryinput">
            <b-form-select id="categoryinput" v-model="form.categoryId" :options="categories" value-field="id" required text-field="name">
                <template slot="first">
                    <option :value="null" disabled>-- Please select a category --</option>
                </template>
            </b-form-select>
        </b-form-group>
        <b-form-group id="amountinputgroup" label="Amount:" label-for="amountinput">
            <b-input-group prepend="$" class="mb-2 mr-sm-2 mb-sm-0">
            <b-form-input
            id="amountinput"
            v-model.number="form.amount"
            number
            :formatter="prepAsMoney"
            lazy-formatter
            placeholder="0.00"
            ></b-form-input>
            </b-input-group>
        </b-form-group>
        <b-button type="submit">Save</b-button>
        <b-button type="reset" v-if="edit">Cancel</b-button>
    </b-form>
  </b-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Transaction from '../classes/Transaction';
import Category from '../classes/Category';

@Component
export default class TransactionForm extends Vue {
    @Prop({default: false}) public edit?: boolean;
    @Prop() public id!: number | null;

    get form(): Transaction {
        if (this.id !== undefined && this.id !== null) {
            const foundForm: Transaction | null = this.$store.getters['getTransactionById'](this.id);
            if (foundForm !== null) {
                return new Transaction(foundForm);
            } else {
                return new Transaction();
            }
        } else {
            return new Transaction();
        }
    }

    get categories(): Category[] {
        return this.$store.getters['getCategories'];
    }

    public submitForm() {
        const dispatchString: string = !this.edit ? 'addTransaction' : 'editTransaction';
        this.$store.dispatch(dispatchString, this.form)
        .then(() => {
            this.$store.commit('setEditTransactionId', null);
        })
        .catch(() => {
            alert('Problem saving transaction');
        });
    }

    private prepAsMoney(val: string): number {
        if (Number.parseFloat(val) !== undefined &&
            Number.parseFloat(val).toFixed(2) !== undefined &&
            !isNaN(Number.parseFloat(val))) {
            return Number(Number.parseFloat(val).toFixed(2));
        } else {
            return 0.00;
        }
    }
}
</script>

<style scoped>
</style>