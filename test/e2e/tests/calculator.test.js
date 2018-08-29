describe('Calculator', function() {
  let calculator;

  beforeEach(function() {
    cy.visit('http://localhost:1234/');

    calculator = new Calculator(cy);
  });

  it('should render correctly', function() {
    // Should render numbers 0 - 9
    [...Array(10).keys()].forEach(i => {
      let el = calculator.button(i);
      expect(el).toBeDefined;
    });

    ['-', '+', '*', '/'].forEach(op => calculator.button(op).should('be.visible'));

    calculator.button(1).click();

    calculator.value('1');
  });

  it('should append numbers after inital positive value entered', function() {
    calculator.button(0).click();
    calculator.value('0');

    calculator.button(1).click();

    calculator.button(2).click();

    calculator.value('12');
  });

  it('should be possible to enter a decimal values', function() {
    calculator.button('.').click();
    calculator.button('1').click();

    calculator.value('0.1');

    calculator.button('.').click();

    calculator.value('0.1');

    calculator.button('2').click();

    calculator.value('0.12');
  });

  describe('addition', function() {
    it('should render equation', function() {
      calculator.button('1').click();
      calculator.value('1');

      calculator.button('+').click();
      calculator.value('1 + 0');

      calculator.button('1').click();
      calculator.value('1 + 1');
    });

    it('should be possible to add two numbers', function() {
      calculator.button('1').click();
      calculator.button('+').click();
      calculator.button('1').click();
      calculator.button('=').click();

      calculator.value('2');
    });

    it('should be possible to add decimals', function() {
      calculator.button('.').click();
      calculator.button('1').click();
      calculator.button('2').click();
      calculator.button('+').click();
      calculator.button('.').click();
      calculator.button('2').click();
      calculator.button('=').click();

      calculator.value('0.32');
    });
  });
});


class Calculator {
  constructor(cy) {
    this.cy = cy;
  }

  value(value) {
    return this.cy.get('.calculator__value').then(($v) => {
      if (value) {
        expect($v.text()).to.equal(value.toString());
      }
    });
  }

  button(text) {
    return this.cy.get(`.calculator__button:contains("${text}")`);
  }
}
