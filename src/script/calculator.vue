<template lang="html">
  <div id="app">
    <div class="calculator__value">{{ input.join(' ') }}</div>
    <main class="calculator__numbers">
      <CalButton v-for="v in numbers" @clicked="clicked" v-bind:value="v.toString()" />
    </main>
    <aside>
      <CalButton @clicked="clicked" value="+" />
      <CalButton @clicked="clicked" value="-" />
      <CalButton @clicked="clicked" value="/" />
      <CalButton @clicked="clicked" value="*" />
      <CalButton @clicked="clicked" value="." />
      <CalButton @clicked="clicked" value="=" />
    </aside>
  </div>
</template>

<script>
import CalButton from './cal-button.vue';

export default {
  name: 'app',
  components: {
    CalButton
  },
  data() {
    return {
      input: ['0'],
      numbers: [...Array(10).keys()]
    };
  },
  methods: {
    clicked(value) {
      if (value === '=') {
        // console.log(calculate(this.input.join(' ')));
      } else if (['+', '-', '/', '*'].includes(value)) {
        this.input.push(value);
        this.input.push('0');
      } else {
        let current = this.input.pop();

        this.input.push(current);
      }
    }
  }
}
</script>

<style lang="stylus">
  html, body
    margin: 0
    padding: 0
    font-family: sans-serif
</style>
