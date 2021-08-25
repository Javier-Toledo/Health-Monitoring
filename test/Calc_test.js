var assert = require('assert');
const calc = require ('../samples/Calc');

describe("Calculadora", () => {
  // casos de prueba
  before(() => {
    console.log("probando las fucniones de calculadora");
  });

  after(() => {
    console.log("Fin del test de calculadora");
  });

  describe("Función Sumar", () => {
    it("Debe retornar 5 cuando: 3 + 2", () => {
      assert.equal(calc.add(3,2), 5);
    });

    it("Debe retornar 0 cuando: 0 + 0", () => {
      assert.equal(calc.add(0,0), 0);
    });

    // assert.throws
    it("Debe retornar Error cuando: 5 + 'hola'", () => {
      assert.throws(
        function() {
          calc.add(5, 'hola')
        },
        {
          name: "Error",
          message: "Valores inválidos"
        }
      );
    });
  }); // fin describe("Función Sumar"),


  describe("Función Restar", () => {
    it("Debe retornar 2 cuando: 5 - 3", () => {
      assert.equal(calc.sustraction(5,3), 2);
    });

    it("Debe retornar -10 cuando: 10 - 20", () => {
      assert.equal(calc.sustraction(10,20), -10);
    });

    // assert.throws
    it("Debe retornar Error cuando: 'abc' - 8", () => {
      assert.throws(
        function() {
          calc.sustraction('abc', 8)
        },
        {
          name: "Error",
          message: "Valores inválidos"
        }
      );
    });
  }); // fin describe("Función Restar"),

  describe("Función Multiplicar", () => {
    it("Debe retornar 15 cuando: 5 * 3", () => {
      assert.equal(calc.multiply(5,3), 15);
    });

    it("Debe retornar 0 cuando: 0 * 0", () => {
      assert.equal(calc.multiply(0,0), 0);
    });

    // assert.throws
    it("Debe retornar Error cuando: 8 * 'bgh'", () => {
      assert.throws(
        function() {
          calc.multiply(8, 'bgh')
        },
        {
          name: "Error",
          message: "Valores inválidos"
        }
      );
    });
  }); // fin describe("Función Multiplicar")

  describe("Función División", () => {
    it("Debe retornar 5 cuando: 15 / 3", () => {
      assert.equal(calc.divide(15,3), 5);
    });

    it("Debe retornar 0 cuando: 0 / 50", () => {
      assert.equal(calc.divide(0,50), 0);
    });

    // assert.throws
    it("Debe retornar Error cuando: 50 / 0", () => {
      assert.throws( function() { calc.divide(50, 0) },
        { name: "Error", message: "División por cero" }
      );
    });
    
    it("Debe retornar Error cuando: 'efg' / 0", () => {
      assert.throws( function() { calc.divide(0, 'efg') },
        { name: "Error", message: "Valores inválidos" }
      );
    });
  }); // fin describe("Función División")

  describe("Función Sumar Arreglos", () => {
    it("Debe retornar 21 cuando: [1,2,3,4,5,6]", () => {
      assert.equal(calc.sumArray([1,2,3,4,5,6]), 21);
    });
    // assert.throws
    it("Debe retornar Error cuando: [2,6,1, 'hola']", () => {
      assert.throws( function() { calc.sumArray([2,6,1, 'hola']) },
        { name: "Error", message: "Valores inválidos" }
      );
    });
  }); // fin describe("Función Sumar Arreglos")
}); 

