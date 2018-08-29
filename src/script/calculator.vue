<template lang="html">
  <div class="calculator">
    <div class="calculator__value">{{ input.join(' ') }}</div>
    <main class="calculator__numbers">
      <CalButton @clicked="clear" value="C" class="calculator__clear"></CalButton>
      <CalButton @clicked="clicked" value="7"></CalButton>
      <CalButton @clicked="clicked" value="8"></CalButton>
      <CalButton @clicked="clicked" value="9"></CalButton>
      <CalButton @clicked="clicked" value="4"></CalButton>
      <CalButton @clicked="clicked" value="5"></CalButton>
      <CalButton @clicked="clicked" value="6"></CalButton>
      <CalButton @clicked="clicked" value="3"></CalButton>
      <CalButton @clicked="clicked" value="2"></CalButton>
      <CalButton @clicked="clicked" value="1"></CalButton>
      <CalButton @clicked="clicked" value="0" class="calculator__zero"></CalButton>
      <CalButton @clicked="clicked" value="."></CalButton>
    </main>
    <aside class="calculator__operators">
      <CalButton @clicked="clicked" value="+"></CalButton>
      <CalButton @clicked="clicked" value="-"></CalButton>
      <CalButton @clicked="clicked" value="/"></CalButton>
      <CalButton @clicked="clicked" value="*"></CalButton>
      <CalButton @clicked="clicked" value="="></CalButton>
    </aside>
  </div>
</template>

<script>
import CalButton from './cal-button.vue';
import calculate from './calculate';

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
    clear() {
      this.input = ['0'];
    },

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
</script>

<style lang="stylus">
  html, body
    margin: 0
    padding: 0
    font-family: sans-serif

  .calculator
    display: grid
    max-width: 450px
    grid-template-columns: 25% 25% 25% 25%
    font-size: 2rem
    border-radius: .5rem
    overflow: hidden
    border: 1px solid #333

    &__value
      text-align: right
      padding: 1rem 3rem
      background: #222
      color: #EEE

    &__numbers
      display: grid
      grid-column-start: 1
      grid-column-end: 4
      grid-template-columns: 33.33% 33.33% 33.33%
      grid-template-rows: 25% 25% 25% 25%
      border-top: 1px solid #AEAEAE
      border-left: @border-top

    .calculator__button
      background: #EFEFEF
      border: none
      border-right: 1px solid #AEAEAE
      border-bottom: @border-right
      font-size: inherit
      padding: 1rem 2rem

      &:focus
        outline: none

      &:active
        background: darken(@background, 10%)
        outline: none

    &__clear
      grid-column-end: span 3

    &__zero
      grid-column-end: span 2
      text-align: left

    &__operators
      display: grid

      & ^[0]__button
        background-color: orange
        color: #FFF
        border-right: none

        &:active
          background-color: darken(orange, 10%)

    &__value
      grid-column-end: span 4
</style>
