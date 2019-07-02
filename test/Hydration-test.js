const chai = require('chai');
const expect = chai.expect;

const Hydration = require('../src/Hydration');
const hydrationSub = require('../data/HydrationSub');

describe("Hydration", function() {
    it("should be a function", function() {
      expect(Hydration).to.be.a("function");
    });
  
    it("should benpm t an instance of Hydration", function() {
      const hydration = new Hydration();
      expect(hydration).to.be.an.instanceof(Hydration);
    });

    it("should give average hydration data for all time", function() {
        const hydration = new Hydration();
        expect(hydration.returnAllTimeAvg(1)).to.equal(59);
      });

    it("should give how many fluid ounces a user consumed on a specific day", function() {
      const hydration = new Hydration();
      expect(hydration.returnSpecificDayOz(1, "2019/06/15")).to.equal(37);
    });

    it.only("should give how many fluid ounces a user consumed every day", function() {
      const hydration = new Hydration();
      expect(hydration.returnWaterEachDay(1)).to.deep.equal([37, 85, 94, 75, 30, 40, 62, 55]);
    });
    
  });