
import Longtitude from '../Longtitude';
import chai from 'chai';

const {expect, should} = chai;


describe('equality in unit', () => {
  let Mile1, Mile0, MileNull, Yard1, Yard0, YardNull, Feet1, Feet0, FeetNull, Inch1, Inch0, InchNull = {};

  before(function() {
    Mile1 = new Longtitude(1, 'mile');
    Mile0 = new Longtitude(0, 'mile');
    MileNull = new Longtitude(null, 'mile');

    Yard1 = new Longtitude(1, 'yard');
    Yard0 = new Longtitude(0, 'yard');
    YardNull = new Longtitude(null, 'yard');

    Inch1 = new Longtitude(1, 'inch');
    Inch0 = new Longtitude(0, 'inch');
    InchNull = new Longtitude(null, 'inch');


    Feet1 = new Longtitude(1, 'feet');
    Feet0 = new Longtitude(0, 'feet');
    FeetNull = new Longtitude(null, 'feet');

  });



  beforeEach(function() { 

  });





  it('check equality in Mile', () => {

    expect(Mile1.checkEquality(Mile1)).to.be.true;
    expect(Mile1.checkEquality(Mile0)).to.be.false;
    expect(Mile1.checkEquality(MileNull)).to.be.false;
  });

  it('check equality in Yard', () => {

    

    expect(Yard1.checkEquality(Yard1)).to.be.true;
    expect(Yard1.checkEquality(Yard0)).to.be.false;
    expect(Yard1.checkEquality(Yard0)).to.be.false;
  });

  it('check equality in Inch', () => {

    expect(Inch1.checkEquality(Inch1)).to.be.true;
    expect(Inch1.checkEquality(Inch0)).to.be.false;
  });


  it('check equality in Feet', () => {

    expect(Feet1.checkEquality(Feet1)).to.be.true;
    expect(Feet1.checkEquality(Feet0)).to.be.false;
  });
});


describe('equality between unit', () => {

  let Mile1, Mile0, MileNull, Yard1760, Yard0, YardNull, Feet3, Feet5280, Feet0, FeetNull, Inch1, Inch0, InchNull = {};

  before(function() {
    Mile1 = new Longtitude(1, 'mile');
    Mile0 = new Longtitude(0, 'mile');
    MileNull = new Longtitude(null, 'mile');

    Yard1760 = new Longtitude(1760, 'yard');
    Yard0 = new Longtitude(0, 'yard');
    YardNull = new Longtitude(null, 'yard');

    Inch1 = new Longtitude(1, 'inch');
    Inch0 = new Longtitude(0, 'inch');
    InchNull = new Longtitude(null, 'inch');


    Feet3 = new Longtitude(3, 'feet');
    Feet5280 = new Longtitude(5280, 'feet');
    Feet0 = new Longtitude(0, 'feet');
    FeetNull = new Longtitude(null, 'feet');

  });



  beforeEach(function() { 

  });


  it('check exchanging to Mile', () => {
    
    expect(Mile1.to('mile')).to.be.equal(1);
    expect(Yard1760.to('mile')).to.be.equal(1);
    expect(Feet5280.to('mile')).to.be.equal(1);

  });

  it('check exchanging to Yard', () => {

    expect(Feet3.to('yard')).to.be.equal(1);


    

  });

  it('check exchanging to Inch', () => {


    const Inch1 = new Longtitude(1, 'inch');
    const Inch0 = new Longtitude(0, 'inch');
    
  });


  it('check exchanging to Feet', () => {


    const Feet1 = new Longtitude(1, 'feet');
    const Feet0 = new Longtitude(0, 'feet');
    

  });
});