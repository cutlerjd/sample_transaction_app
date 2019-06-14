<template>
  <b-card
    :title="!edit ? 'Add Category' : 'Edit Category'">
    <b-form @submit.stop.prevent="submitForm">
        <b-form-group id="nameinputgroup" label="Name of category:" label-for="nameinput">
            <b-form-input
            id="nameinput"
            v-model="form.name"
            required
            placeholder="Category"
            ></b-form-input>
        </b-form-group>
        <b-button type="submit">Save</b-button>
    </b-form>
  </b-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Category from '../classes/Category';

@Component
export default class CategoryForm extends Vue {
    public form: Category = new Category();
    @Prop({default: false}) public edit?: boolean;
    @Prop() public id!: number;

    public mounted() {
        if (this.id) {
            this.updateForm();
        }
    }

    public updateForm() {
        if (this.id !== undefined && !isNaN(this.id)) {
            this.$store.dispatch('loadCategories', false)
            .then(() => {
                const foundForm: Category | null = this.$store.getters['getCategoryById'](this.id);
                if ( foundForm !== null) {
                    this.form = foundForm;
                } else {
                    alert('Category not found.');
                }
            });
        }
    }

    public submitForm() {
        const dispatchString: string = !this.edit ? 'addCategory' : 'editCategory';
        this.$store.dispatch(dispatchString, this.form)
        .then(() => {
            this.form = new Category();
        })
        .catch(() => {
            alert('Problem saving category');
        });
    }
}
</script>

<style scoped>
</style>