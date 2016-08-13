
import { Vehicle, ParkingLot, ParkingPlatform, BalancedParkingPlatform, ParkingPlatformPlus, Administrator } from '../ParkingLot';
import chai from 'chai';

const {expect, should} = chai;


describe('parkinglot basic', () => {
  let Car1, Car2, Lot1, Lot2 = {};

  before(function() {


  });



  beforeEach(function() { 
    Car1 = new Vehicle('BYD');
    Car2 = new Vehicle('baoma');

    Lot1 = new ParkingLot(1);
    Lot2 = new ParkingLot(2);
  });



  it('park a car, letting car stay at parkingLot', () => {
    Lot1.letCarIn(Car1);
    expect(Lot1.isFull()).to.be.true;
  });

  it('get your car out', () => {
    const { id } = Lot1.letCarIn(Car1);
    expect(Lot1.isFull()).to.be.true;
  })

  it('cant get car thats not in the Lot', () => {
    const { id, vehicle: myCar } = Lot1.letCarIn(Car1);
    let { success: success1, reason: reason1 } = Lot1.letCarOutByID('666');

    expect(success1).to.be.false;
    expect(reason1).to.be.equal('no-car-with-this-id');

    let { success: success2, reason: reason2 } = Lot1.letCarOutByID('666');
  })

  it('cant park car thats already in', () => {
    const { id, vehicle: myCar } = Lot2.letCarIn(Car1);
    let { success: success1, reason: reason1 } = Lot2.letCarIn(Car1);

    expect(success1).to.be.false;
    expect(reason1).to.be.equal('car-already-in');
  })

  it('pack into a full parkingLot, it will return an error', () => {
    const { id, vehicle: myCar } = Lot1.letCarIn(Car1);
    let { success: success1, reason: reason1 } = Lot1.letCarIn(Car2);

    expect(success1).to.be.false;
    expect(reason1).to.be.equal('lot-full');
  })

});




describe('parking platform', () => {
  let Car1, Car2, Lot1, Lot2, Platform1 = {};

  before(function() {


  });



  beforeEach(function() { 
    Car1 = new Vehicle('BYD');
    Car2 = new Vehicle('baoma');

    Lot1 = new ParkingLot(1);
    Lot2 = new ParkingLot(2);

    Platform1 = new ParkingPlatform([Lot1, Lot2]);
  });


  it('park car at first none-empty ', () => {
    Platform1.park(Car1);
    expect(Platform1.getStatus()).to.be.deep.equal([
      {id: '0', full: true, capacity: 0},
      {id: '1', full: false, capacity: 2},
    ]);
  });

  it('park car, if first is full, park at secon one', () => {
    Platform1.park(Car1);
    Platform1.park(Car2);
    expect(Platform1.getStatus()).to.be.deep.equal([
      {id: '0', full: true, capacity: 0},
      {id: '1', full: false, capacity: 1},
    ]);
  })

  it('second park have car, but stop car still at first one if one is not full', () => {
    const { id } = Platform1.park(Car1);
    Platform1.park(Car2);
    Platform1.getByID(id);
    Platform1.park(Car1);

    expect(Platform1.getStatus()).to.be.deep.equal([
      {id: '0', full: true, capacity: 0},
      {id: '1', full: false, capacity: 1},
    ]);
  })

});




describe('balanced parking platform', () => {
  let Car1, Car2, Car3, Car4, Car5, Lot1, Lot2, Lot3, Lot4, Lot100, Lot5, Platform1, Platform2, Platform3 = {};

  before(function() {


  });



  beforeEach(function() { 
    Car1 = new Vehicle('BYD');
    Car2 = new Vehicle('baoma');
    Car3 = new Vehicle('tesila');
    Car4 = new Vehicle('dianlv');
    Car5 = new Vehicle('foo');

    Lot1 = new ParkingLot(2);
    Lot2 = new ParkingLot(2);
    Lot3 = new ParkingLot(2);
    Lot4 = new ParkingLot(2);
    Lot5 = new ParkingLot(3);

    Lot100 = new ParkingLot(100);

    Platform1 = new BalancedParkingPlatform([Lot1, Lot2, Lot3, Lot4]);
    Platform2 = new BalancedParkingPlatform([Lot1, Lot2, Lot3, Lot4, Lot100]);
    Platform3 = new BalancedParkingPlatform([Lot1, Lot2, Lot3, Lot4, Lot5])
  });


  it('park balanced', () => {
    Platform1.park(Car1);
    Platform1.park(Car2);
    Platform1.park(Car3);
    Platform1.park(Car4);
    expect(Platform1.getStatus()).to.be.deep.equal([
      {id: '0', full: false, capacity: 1},
      {id: '1', full: false, capacity: 1},
      {id: '2', full: false, capacity: 1},
      {id: '3', full: false, capacity: 1}
    ]);
  });

  it('park into the one that have largest space', () => {
    Platform2.park(Car1);
    Platform2.park(Car2);
    Platform2.park(Car3);
    Platform2.park(Car4);
    expect(Platform2.getStatus()).to.be.deep.equal([
      {id: '0', full: false, capacity: 2},
      {id: '1', full: false, capacity: 2},
      {id: '2', full: false, capacity: 2},
      {id: '3', full: false, capacity: 2},
      {id: '4', full: false, capacity: 96}
    ]);
  });

  it('park into the one that pre while two have same space 1', () => {
    Platform1.park(Car1);
    const { id: id1 } = Platform1.park(Car2);
    Platform1.park(Car3);
    const { id: id2 } = Platform1.park(Car4);

    Platform1.getByID(id1);
    Platform1.getByID(id2);

    Platform1.park(Car4);

    expect(Platform1.getStatus()).to.be.deep.equal([
      {id: '0', full: false, capacity: 1},
      {id: '1', full: false, capacity: 1},
      {id: '2', full: false, capacity: 1},
      {id: '3', full: false, capacity: 2}
    ]);
  })

  it('park into the one that pre while two have same space 2', () => {
    Platform3.park(Car1);
    Platform3.park(Car2);
    Platform3.park(Car3);
    Platform3.park(Car4);
    // Platform3.park(Car5);


    expect(Platform3.getStatus()).to.be.deep.equal([
      {id: '0', full: false, capacity: 1},
      {id: '1', full: false, capacity: 1},
      {id: '2', full: false, capacity: 1},
      {id: '3', full: false, capacity: 2},
      {id: '4', full: false, capacity: 2}
    ]);
  })
});




describe('parking platform plus', () => {
  let Car1, Car2, Car3, Car4, Car5, Lot1, Lot2, Lot3, Lot4, Lot100, Lot5, Platform1, Platform2, Platform3 = {};

  before(function() {


  });



  beforeEach(function() { 
    Car1 = new Vehicle('BYD');
    Car2 = new Vehicle('baoma');
    Car3 = new Vehicle('tesila');
    Car4 = new Vehicle('dianlv');
    Car5 = new Vehicle('foo');

    Lot1 = new ParkingLot(2);
    Lot2 = new ParkingLot(2);
    Lot3 = new ParkingLot(2);
    Lot4 = new ParkingLot(2);
    Lot5 = new ParkingLot(3);

    Lot100 = new ParkingLot(100);

    Platform1 = new ParkingPlatformPlus([Lot1, Lot2, Lot3, Lot4]);
    Platform2 = new ParkingPlatformPlus([Lot1, Lot2, Lot3, Lot4, Lot100]);
    Platform3 = new ParkingPlatformPlus([Lot1, Lot2, Lot3, Lot4, Lot5])
  });


  it('park balanced', () => {
    Platform1.park(Car1);
    Platform1.park(Car2);
    Platform1.park(Car3);
    Platform1.park(Car4);
    expect(Platform1.getStatus()).to.be.deep.equal([
      {id: '0', full: false, capacity: 1},
      {id: '1', full: false, capacity: 1},
      {id: '2', full: false, capacity: 1},
      {id: '3', full: false, capacity: 1}
    ]);
  });

  it('park into the one that have largest space', () => {
    Platform2.park(Car1);
    Platform2.park(Car2);
    Platform2.park(Car3);
    Platform2.park(Car4);
    expect(Platform2.getStatus()).to.be.deep.equal([
      {id: '0', full: false, capacity: 2},
      {id: '1', full: false, capacity: 2},
      {id: '2', full: false, capacity: 2},
      {id: '3', full: false, capacity: 2},
      {id: '4', full: false, capacity: 96}
    ]);
  });

  it('park into the one that pre while two have same space 1', () => {
    Platform1.park(Car1);
    const { id: id1 } = Platform1.park(Car2);
    Platform1.park(Car3);
    const { id: id2 } = Platform1.park(Car4);

    Platform1.getByID(id1);
    Platform1.getByID(id2);

    Platform1.park(Car4);

    expect(Platform1.getStatus()).to.be.deep.equal([
      {id: '0', full: false, capacity: 1},
      {id: '1', full: false, capacity: 1},
      {id: '2', full: false, capacity: 1},
      {id: '3', full: false, capacity: 2}
    ]);
  })

  it('park into the one that pre while two have same space 2', () => {
    Platform3.park(Car1);
    Platform3.park(Car2);
    Platform3.park(Car3);
    Platform3.park(Car4);
    // Platform3.park(Car5);


    expect(Platform3.getStatus()).to.be.deep.equal([
      {id: '0', full: false, capacity: 1},
      {id: '1', full: false, capacity: 1},
      {id: '2', full: false, capacity: 1},
      {id: '3', full: false, capacity: 2},
      {id: '4', full: false, capacity: 2}
    ]);
  })
});




describe('Big Brother and Little Brother', () => {
  let Car1, Car2, Car3, Car4, Car5, Lot1, Lot2, Lot3, Lot4, Lot100, Lot5, Platform1, Platform2, Platform3, Admin = {};

  before(function() {


  });



  beforeEach(function() { 
    Car1 = new Vehicle('BYD');
    Car2 = new Vehicle('baoma');
    Car3 = new Vehicle('tesila');
    Car4 = new Vehicle('dianlv');
    Car5 = new Vehicle('foo');

    Lot1 = new ParkingLot(2);
    Lot2 = new ParkingLot(2);
    Lot3 = new ParkingLot(2);
    Lot4 = new ParkingLot(2);
    Lot5 = new ParkingLot(3);

    Lot100 = new ParkingLot(100);

    Platform1 = new ParkingPlatformPlus([Lot1, Lot2]);
    Platform2 = new ParkingPlatformPlus([Lot3, Lot4]);

    Admin = new Administrator([Lot5], [Platform1, Platform2]);
  });


  it('park balanced', () => {
    Admin.park(Car1);
    Admin.park(Car2);
    Admin.park(Car3);
    Admin.park(Car4);
    expect(Admin.getStatus()).to.be.deep.equal([
      {id: '0', full: false, capacity: 1},
      {id: '1', full: false, capacity: 1},
      {id: '2', full: false, capacity: 1},
      {id: '3', full: false, capacity: 1}
    ]);
  });
});

