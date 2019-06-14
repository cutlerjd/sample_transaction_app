import Vue from 'vue';
import Vuex from 'vuex';
import {RootState} from '@/types';
import Category, { ICategory } from '@/classes/Category';
import Transaction, { ITransaction } from '@/classes/Transaction';
import {IApiRequest, IApiResponse} from '@/interfaces/ApiInterface';
import { api } from '@/apiHandler';

Vue.use(Vuex);

export default new Vuex.Store<RootState>({
  state: {
    categories: [],
    transactions: [],
    editTransactionId: null,
    editCategoryId: null
  },
  mutations: {
    setCategories(state, categories: Category[]) {
      state.categories = categories;
    },
    setTransactions(state, transactions: Transaction[]) {
      state.transactions = transactions;
    },
    setEditTransactionId(state, editTransactionId: number | null) {
      state.editTransactionId = editTransactionId;
    },
    setEditCategoryId(state, editCategoryId: number | null) {
      state.editCategoryId = editCategoryId;
    }
  },
  actions: {
    loadCategories({ commit, state }, forceRefresh: boolean) {
      return new Promise((resolve, reject) => {
          if (state.categories.length === 0 || forceRefresh) {
              api().get('category')
              .then((res) => {
                  const response: IApiResponse = res.data;
                  if (response.success) {
                      const categoriesJSON: ICategory[] = response.categories !== undefined ? response.categories : [];
                      const categories: Category[] = [];
                      categoriesJSON.forEach((element: ICategory) => {
                          const category: Category = new Category(element);
                          categories.push(category);
                      });
                      commit('setCategories', categories);
                  }
                  resolve();
              })
              .catch((e) => {
                  reject(e);
              });
          } else {
              resolve();
          }
      });
  },
  addCategory({ dispatch }, category: ICategory) {
      return new Promise((resolve, reject) => {
          api().post('category', {category} as IApiRequest)
          .then((res) => {
              const response: IApiResponse = res.data;
              if (response.success && response.category && response.category.id) {
                  dispatch('loadCategories', true)
                  .then(() => {
                      alert('Category saved.');
                      resolve();
                  });
              } else {
                  reject();
              }
          })
          .catch((e) => {
              reject(e);
          });
      });
  },
  editCategory({ dispatch }, category: ICategory) {
      return new Promise((resolve, reject) => {
        if (category !== undefined && category !== null && category.id !== undefined && category.id !== null) {
          api().put('category/' + category.id, {category} as IApiRequest)
          .then((res) => {
              const response: IApiResponse = res.data;
              if (response.success && response.category && response.category.id) {
                  dispatch('loadCategories', true)
                  .then(() => {
                      alert('Category updated.');
                      resolve();
                  });
              } else {
                  reject();
              }
          })
          .catch((e) => {
              reject(e);
          });
        } else {
          reject();
        }
      });
  },
  deleteCategory({ dispatch }, category: ICategory) {
      return new Promise((resolve, reject) => {
        if (category !== undefined && category !== null && category.id !== undefined && category.id !== null) {
          api().delete('category/' + category.id, { data: { category } as IApiRequest })
          .then((res) => {
            const response: IApiResponse = res.data;
            if (response.success) {
                dispatch('loadCategories', true)
                .then(() => {
                    alert('Category removed.');
                    resolve();
                });
            } else {
                reject();
            }
        })
        .catch((e) => {
            reject(e);
        });
      } else {
        reject();
      }
      });
    },
    loadTransactions({ commit, state }, forceRefresh: boolean) {
      return new Promise((resolve, reject) => {
          if (state.transactions.length === 0 || forceRefresh) {
              api().get('transaction')
              .then((res) => {
                  const response: IApiResponse = res.data;
                  if (response.success) {
                      const tranJSON: ITransaction[] = response.transactions !== undefined ? response.transactions : [];
                      const transactions: Transaction[] = [];
                      tranJSON.forEach((element: ITransaction) => {
                          const transaction: Transaction = new Transaction(element);
                          transactions.push(transaction);
                      });
                      commit('setTransactions', transactions);
                  }
                  resolve();
              })
              .catch((e) => {
                  reject(e);
              });
          } else {
              resolve();
          }
      });
  },
  addTransaction({ dispatch }, transaction: ITransaction) {
      return new Promise((resolve, reject) => {
          api().post('transaction', {transaction} as IApiRequest)
          .then((res) => {
            const response: IApiResponse = res.data;
            if (response.success && response.transaction && response.transaction.id) {
                dispatch('loadTransactions', true)
                .then(() => {
                    alert('Transaction saved.');
                    resolve();
                });
            } else {
                reject();
            }
          })
          .catch((e) => {
              reject(e);
          });
      });
  },
  editTransaction({ dispatch }, transaction: ITransaction) {
      return new Promise((resolve, reject) => {
        if (transaction !== undefined && transaction !== null
            && transaction.id !== undefined && transaction.id !== null) {
          api().put('transaction/' + transaction.id, {transaction} as IApiRequest)
          .then((res) => {
              const response: IApiResponse = res.data;
              if (response.success && response.transaction && response.transaction.id) {
                  dispatch('loadTransactions', true)
                  .then(() => {
                      alert('Transaction updated.');
                      resolve();
                  });
              } else {
                  reject();
              }
          })
          .catch((e) => {
              reject(e);
          });
        } else {
          reject();
        }
      });
  },
  deleteTransaction({ dispatch }, transaction: ITransaction) {
      return new Promise((resolve, reject) => {
        if (transaction !== undefined && transaction !== null
            && transaction.id !== undefined && transaction.id !== null) {
          api().delete('transaction/' + transaction.id, { data: { transaction } as IApiRequest })
          .then((res) => {
            const response: IApiResponse = res.data;
            if (response.success) {
                dispatch('loadTransactions', true)
                .then(() => {
                    alert('Transaction removed.');
                    resolve();
                });
            } else {
                reject();
            }
        })
        .catch((e) => {
            reject(e);
        });
      } else {
        reject();
      }
      });
    }
  },
  getters: {
    getCategories: (state: RootState): Category[] => {
      return state.categories;
    },
    getCategoryById: (state: RootState) => (id: number | string ): Category | null => {
      const index: number = state.categories.findIndex((category: Category) => category.id === Number(id));
      if (index !== -1) {
        return state.categories[index];
      } else {
        return null;
      }
    },
    getTransactions: (state: RootState): Transaction[] => {
      return state.transactions;
    },
    getTransactionById: (state: RootState) => (id: number | string ): Transaction | null => {
      const index: number = state.transactions.findIndex((transaction: Category) => transaction.id === Number(id));
      if (index !== -1) {
        return state.transactions[index];
      } else {
        return null;
      }
    },
    getEditTransactionId: (state: RootState): number | null => {
      return state.editTransactionId;
    }
  }
});
