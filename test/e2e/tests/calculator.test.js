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

  it('should clear values previously entered', function() {
    calculator.enter('2 + 10 / 2');
    calculator.value('2 + 10 / 2');

    calculator.clear();

    calculator.value('0');

    calculator.enter('2 + 10 / 2 =');
    calculator.value('7');
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
      calculator.enter('1 + 1 =');

      calculator.value('2');
    });

    it('should be possible to add decimals', function() {
      calculator.enter('0.12 + 0.2 =');

      calculator.value('0.32');
    });
  });

  describe('subtraction', function() {
    it('should render equation', function() {
      calculator.button('1').click();
      calculator.value('1');

      calculator.button('-').click();
      calculator.value('1 - 0');

      calculator.button('1').click();
      calculator.value('1 - 1');
    });

    it('should be possible subtract two numbers', function() {
      calculator.enter('2 - 1 =');

      calculator.value('1');
    });

    it('should be possible subtract three numbers', function() {
      calculator.enter('2 - 10 - 9 =');

      calculator.value('-17');
    });
  });

  describe('multiplication', function() {
    it('should render equation', function() {
      calculator.button('1').click();
      calculator.value('1');

      calculator.button('*').click();
      calculator.value('1 * 0');

      calculator.button('1').click();
      calculator.value('1 * 1');
    });

    it('should be possible to multiply two numbers', function() {
      calculator.enter('2 * 4 =');

      calculator.value('8');
    });

    it('should correctly multiply from right to left', function() {
      calculator.enter('2 * 4 * 3 =');

      calculator.value('24');
    });
  });

  describe('division', function() {
    it('should be possible to divide two numbers', function() {
      calculator.enter('4 / 2 =');

      calculator.value('2');
    });

    it('should be possible to divide three numbers', function() {
      calculator.enter('16 / 8 / 4 =');

      calculator.value('8');
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

  clear() {
    this.button('C').click();
  }

  enter(equation) {
    equation.split(/(?! )/).map(s => s.trim()).forEach(p => this.button(p).click());
  }

  button(text) {
    return this.cy.get(`.calculator__button:contains("${text}")`);
  }
}
