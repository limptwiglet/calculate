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
        this.input = [calculate(this.input.join(' '))];
      } else if (['+', '-', '/', '*'].includes(value)) {
        this.input.push(value);
        this.input.push('0');
      } else {
        let current = this.input.pop();

        if (value === '.') {
          if (current.indexOf('.') === -1) {
            current+= value;
          }
        } else if (current === '0' && value !== '0') {
          current = value;
        } else if (current !== '0') {
          current += value;
        }

        this.input.push(current);
      }
    }
  }
}

function calculate(str) {
  let result = 0;
  let parts = str.split(' ');
  let nums = parts.map(parseFloat);

  let parsed = [];

  for (var i = parts.length-1; i >= 0; i--) {
    let p = parts[i];
    let num = nums[i];

    if (!isNaN(num)) {
      parsed.push(num);
    }
  }

  result = parsed.reduce((n, a) => n + a, 0);
  return result;
}
</script>

<style lang="stylus">
  html, body
    margin: 0
    padding: 0
    font-family: sans-serif
</style>
