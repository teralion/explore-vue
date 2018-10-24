<template>
  <div>
    <div>
      {{ title }}
    </div>
    <button 
      type="button" 
      v-on:click="$emit('get-title', $event, title)"
    >
      Показать title
    </button>
  </div>
</template>

<script>
  let titleComponent = {
    props: {
      title: {
        type: String,
        required: true,
        default: 'Title',
      },
    },
  };

  export default titleComponent;
</script>

<style>
</style>