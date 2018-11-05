<template>
  <nav aria-label="page-navigation">
    <ul class="pagination">

      <li
        class="page-item"
        v-bind:class="(
          (page === 1) || isError 
        ) ? 'disabled' : ''"
      >
        <a
          href="#"
          v-on:click.prevent="prevPage"
          class="page-link"
          aria-label="Previous"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>

      <li
        class="page-item"
        v-for="item in pages"
        v-bind:key="item"
        v-bind:class="(page === item) ? 'active' : '' "
      >
        <a
          href="#"
          class="page-link"
          v-on:click.prevent="onPageSelect(item)"
        >{{ item }}</a>
      </li>

      <li
        class="page-item"
        v-bind:class="( 
          (page === pages) || isError
        ) ? 'disabled' : ''"
      >
        <a
          href="#"
          v-on:click.prevent="nextPage"
          class="page-link"
          aria-label="Next"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>

    </ul>
  </nav>
</template>

<script>


export default {
  name: 'RowsPaginator',
  model: {
    prop: 'page',
  },
  props: {
    total: {
      type: Number,
      required: true,
      default: 0,
    },
    perPage: {
      type: Number,
      required: true,
      default: 0,
    },
    page: {
      type: Number,
      required: false,
      default: 1,
    },
    isError: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
  computed: {
    pages() {
      if ( this.perPage <= 0 ) return;
      return Math.ceil(this.total / this.perPage);
    }
  },
  methods: {
    nextPage() {
      if (this.page < this.pages) {
        this.onPageSelect(this.page + 1);
      }
    },
    prevPage() {
      if (this.page > 1) {
        this.onPageSelect(this.page - 1);
      }
    },
    onPageSelect(pageNum) {
      this.$emit('input', pageNum)
    }
  }
};

</script>

<styles></styles>