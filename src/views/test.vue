<template>

    <div class="container">
        <vue-simplemde ref="markdownEditor" />
    </div>
</template>

<script>
  import VueSimplemde from 'vue-simplemde'

  export default {
    components: {
      VueSimplemde
    }
  }
</script>

<style>
    /* @import '~simplemde-theme-base/dist/simplemde-theme-base.min.css'; */
  /* @import '~simplemde/dist/simplemde.min.css'; */
</style>