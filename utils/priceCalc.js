const { units } = require('../data/constants')
const priceCalc = function (height = { unit: units.FAJA.en, size: 0 }, width = { unit: units.FAJA.en, size: 0 }) {
    let uniHeightYARD = 0
    let uniWidthYARD = 0
    const yardPrice = 4.3
    let price = 0

    if (arguments.length == 1) {
        width.unit = height.unit
        const size = Math.sqrt(height.size)
        height.size = size
        width.size = size

    }

    switch (height.unit) {
        case units.YARD.en:
            uniHeightYARD = height.size
            break;
        case units.CENTIMETER.en:
            uniHeightYARD = height.size / units.YARD.weight
            break;
        case units.METER.en:
            uniHeightYARD = (height.size * units.METER.weight) / units.YARD.weight
            break;
        case units.FAJA.en:
            uniHeightYARD = (height.size * units.FAJA.weight) / units.YARD.weight
            break;

        default:
            uniHeightYARD = height.size
            break;
    }


    switch (width.unit) {
        case units.YARD.en:
            uniWidthYARD = width.size
            break;
        case units.CENTIMETER.en:
            uniWidthYARD = width.size / units.YARD.weight
            break;
        case units.METER.en:
            uniWidthYARD = (width.size * units.METER.weight) / units.YARD.weight
            break;
        case units.FAJA.en:
            uniWidthYARD = (width.size * units.FAJA.weight) / units.YARD.weight
            break;

        default:
            uniWidthYARD = width.size
            break;
    }

    price = (uniHeightYARD * uniWidthYARD) * yardPrice
    return price

}

module.exports = priceCalc;


