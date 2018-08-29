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
