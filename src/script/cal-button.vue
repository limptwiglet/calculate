<template lang="html">
  <button @click="$emit('clicked', value)" class="calculator__button">{{value}}</button>
</template>

<script>
export default {
  props: ['value']
}
</script>

<style>
</style>
