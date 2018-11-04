<template>
  <div class="card">

    <div class="card-header">
    </div>

    <div class="card-body">
      <div class="form-group">
        <div class="col-md-4">
          <p class="form-control-static">
            {{ total }} элементов на странице
          </p>
        </div>
      </div>

      <table class="table table-striped">

        <slot name="thead">
          <thead>

            <tr>
              <th>#</th>
              <th>Имя</th>
            </tr>

          </thead>
        </slot>

        <tbody>
          <tr 
            v-for="item in items"
            v-bind:key="item.id"
          >

            <slot 
              name="trCells" 
              v-bind:item="item"
            >

              <td>{{ item.id }}</td>
              <td>{{ item.firstName }}</td>

            </slot>

          </tr>
        </tbody>

      </table>

      <slot name="paginator" />
    </div>

  </div>
</template>

<script>

import RowsPaginator from '@/components/RowsPaginator.vue'

export default {
  name: 'ItemList',
  components: {
    'rows-paginator': RowsPaginator,
  },
  props: {
    items: {
      type: Array,
      required: true,
      default: []
    },
  },
  computed: {
    total: function() {
      return this.items.length
    },
  }
};

</script>

<style>
</style>