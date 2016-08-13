import { v4 as uuid } from 'node-uuid'; 

export class ParkingLot {
    constructor(capacity) {
        if (typeof capacity !== 'number') {
            throw new Error('capacity not a number');
        }
        this.capacity = capacity;
        this.vehicleList = [];
    }

    isFull() {
        return this.vehicleList.length >= this.capacity;
    }

    getCapacity() {
        return this.capacity - this.vehicleList.length;
    }

    letCarIn(car) {
        if (this.isFull()) {
            return {
                success: false,
                reason: 'lot-full'
            }
        }


         for (let index in this.vehicleList) {
            if (this.vehicleList[index].vehicle === car) {
                return {
                    success: false,
                    reason: 'car-already-in'
                };
            }
        }


        const idForCar = uuid();
        const logObject = {id: idForCar, vehicle: car};
        this.vehicleList.push(logObject);
        return logObject;
    }

    letCarOutByID(id) {
        for (let index in this.vehicleList) {
            if (this.vehicleList[index].id === id) {
                let carToOut = this.vehicleList[index].vehicle;
                this.vehicleList.splice(index, 1);
                return {
                    success: true,
                    result: carToOut
                };
            }
        }
        return {
            success: false,
            reason: 'no-car-with-this-id'
        }
    }

    letCarOut(car) {
         for (let index in this.vehicleList) {
            if (this.vehicleList[index].vehicle === car) {
                let carToOut = this.vehicleList[index].vehicle;
                this.vehicleList.splice(index, 1);
                return {
                    success: true,
                    result: carToOut
                };
            }
        }
        return {
            success: false,
            reason: 'no-car-like-this'
        }       
    }
}


export class Vehicle {
    constructor(type) {
        this.type = type;
    }
}

export class ParkingPlatform {
    constructor(parkingLotList) {
        this.parkingLotList = parkingLotList;
    }

    park(car) {
        for (let lot of this.parkingLotList) {
            if (!lot.isFull()) {
                return lot.letCarIn(car);
            }
        }
    }

    getByID(id) {
        for (let lot of this.parkingLotList) {
            const { success, car } = lot.letCarOutByID(id);
            if (success) {
                return {
                    success: true,
                    vehicle: car
                };
            }
        }
        return {
            success: false,
            reason: 'no-car-like-this'
        }  
    }

    getStatus() {
        let status = [];
        for (let lotIndex in this.parkingLotList) {
            status.push({
                id: lotIndex, 
                full: this.parkingLotList[lotIndex].isFull(), 
                capacity: this.parkingLotList[lotIndex].getCapacity()
            })
        }
        return status;
    }
}


export class BalancedParkingPlatform {
    constructor(parkingLotList) {
        this.parkingLotList = parkingLotList;
    }

    park(car) {
        let lotWithLargestSpace = {};
        let largestSpace = 0;
        for (let lot of this.parkingLotList) {
            if (lot.getCapacity() > largestSpace) {
                largestSpace = lot.getCapacity();
                lotWithLargestSpace = lot;
            }
        }
        if (!lotWithLargestSpace.isFull()) {
            return lotWithLargestSpace.letCarIn(car);
        }
        return {
            success: false,
            reason: 'all-lots-are-full'
        }
    }

    getByID(id) {
        for (let lot of this.parkingLotList) {
            const { success, car } = lot.letCarOutByID(id);
            if (success) {
                return {
                    success: true,
                    vehicle: car
                };
            }
        }
        return {
            success: false,
            reason: 'no-car-like-this'
        }  
    }

    getStatus() {
        let status = [];
        for (let lotIndex in this.parkingLotList) {
            status.push({
                id: lotIndex, 
                full: this.parkingLotList[lotIndex].isFull(), 
                capacity: this.parkingLotList[lotIndex].getCapacity()
            })
        }
        return status;
    }
}


export class ParkingPlatformPlus {
    constructor(parkingLotList, parkingStrategy = this.defaultParkingStrategy) {
        this.parkingLotList = parkingLotList;
        this.parkingStrategy = parkingStrategy;
    }


    park(car) {
        const lotToPark = this.parkingStrategy(this.parkingLotList);
        if (!lotToPark.isFull()) {
            return lotToPark.letCarIn(car);
        }
        return {
            success: false,
            reason: 'all-lots-are-full'
        }
    }


    setStrategy(strategyFunction) {
        this.parkingStrategy = strategyFunction;
    }


    defaultParkingStrategy(parkingLotList) {
        let lotWithLargestSpace = {};
        let largestSpace = 0;
        for (let lot of parkingLotList) {
            if (lot.getCapacity() > largestSpace) {
                largestSpace = lot.getCapacity();
                lotWithLargestSpace = lot;
            }
        }
        return lotWithLargestSpace;
    }


    getByID(id) {
        for (let lot of this.parkingLotList) {
            const { success, car } = lot.letCarOutByID(id);
            if (success) {
                return {
                    success: true,
                    vehicle: car
                };
            }
        }
        return {
            success: false,
            reason: 'no-car-like-this'
        }  
    }

    getStatus() {
        let status = [];
        for (let lotIndex in this.parkingLotList) {
            status.push({
                id: lotIndex, 
                full: this.parkingLotList[lotIndex].isFull(), 
                capacity: this.parkingLotList[lotIndex].getCapacity()
            })
        }
        return status;
    }

    getCapacity() {
        let capabality = 0;
        for (let lotIndex in this.parkingLotList) {
            capabality += this.parkingLotList[lotIndex].getCapacity()
        }
        return capabality;
    }

    ifFull() {
        return this.parkingLotList.filter.map((item) => !item.isFull).length == 0;
    }

    letCarIn(car) {
        this.park(car);
    }
}


export class Administrator {
    constructor(parkingLotList, littleBrotherList, parkingStrategy = this.defaultParkingStrategy) {
        this.parkingLotList = parkingLotList;
        this.littleBrotherList = littleBrotherList;
        this.parkingStrategy = parkingStrategy;
    }

    defaultParkingStrategy(parkingLotList, littleBrotherList) {
        let parkableWithLargestSpace = {};
        let largestCapability = 0;
        for (let brother of littleBrotherList) {
            if (brother.getCapacity() > largestCapability) {
                largestCapability = brother.getCapacity();
                parkableWithLargestSpace = brother;
            }
        }
        for (let lot of littleBrotherList) {
            if (lot.getCapacity() > largestCapability) {
                largestCapability = lot.getCapacity();
                parkableWithLargestSpace = lot;
            }
        }
        return parkableWithLargestSpace;
    }

    park(car) {
        const whereToPark = this.parkingStrategy(this.parkingLotList, this.littleBrotherList);
        if (!whereToPark.isFull()) {

            return whereToPark.letCarIn(car);
        }
        return {
            success: false,
            reason: 'all-lots-are-full'
        }
    }


    getByID(id) {
        for (let lot of this.parkingLotList) {
            const { success, car } = lot.letCarOutByID(id);
            if (success) {
                return {
                    success: true,
                    vehicle: car
                };
            }
        }
        return {
            success: false,
            reason: 'no-car-like-this'
        }  
    }

    getStatus() {
        let status = [];
        for (let lotIndex in this.parkingLotList) {
            status.push({
                id: lotIndex, 
                full: this.parkingLotList[lotIndex].isFull(), 
                capacity: this.parkingLotList[lotIndex].getCapacity()
            })
        }
        return status;
    }


    setStrategy(strategyFunction) {
        this.parkingStrategy = strategyFunction;
    }

}