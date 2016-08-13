let rules = {
    mile: {
        yard: 1760
    },
    yard: {
        feet: 3
    },
    feet: {
        inch: 12
    },
    inch: {
        inch: 1
    }
}

export default class Longtitude {
    constructor(initialLongtitude, unit) {
        if (typeof unit !== 'string' || !(unit in rules)) {
            throw new Error('unit not a string');
        }
        this.longtitude = initialLongtitude;
        this.unit = unit;
    }

    addRule() {

    }

    getMetaData() {
        return {
            longtitude: this.longtitude,
            unit: this.unit
        }
    }

    checkEquality(LongtitudeObject) {
        const { longtitude: longtitudeToCheck, unit } = LongtitudeObject.getMetaData();

        if (typeof longtitudeToCheck !== 'number') {
            return false;
        }
        if (typeof unit !== 'string') {
            throw new Error('unit not a string');
        }
        if (unit === this.unit) {
            return this.longtitude === longtitudeToCheck;
        }

        const methodList = {
            mile: this.toMile,
            inch: this.toInch,
            feet: this.toFeet,
            yard: this.toYard
        }

        return methodList[unit](this.longtitude) === longtitudeToCheck;
    }


    to(unitTo, unitFrom = this.unit, longtitude = this.longtitude) {
        if (unitTo === unitFrom) {
            return longtitude;
        }

        for (let unit in rules) {
            for (let unitDestination in rules[unit]) {
                if (unitDestination === unitTo) {
                    return this.to(unit, unitFrom, longtitude * rules[unit][unitDestination]);
                }
            }
        }
        // 到这说明上面的正向搜索没有搜到，下面开始反向搜索
        for (let unit in rules) {
            for (let unitStart in rules[unit]) {
                if (unitStart === unitFrom) {
                    return this.to(unitTo, unit, longtitude / rules[unit][unitStart]);
                }
            }
        }

    }

}

