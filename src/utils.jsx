export const API = 'https://api.quotiapp.com/api/admin/';
export const APIHEADERS = { 'CALL-TYPE': 'API' }
export function parseCSV(csvstring, separator, linebreak, validator) {
    var result = [];
    let headers = [];
    var lines = csvstring.split(linebreak);
    for (let index = 0; index < lines.length; index++) {
        if (index === 0) {
            headers = lines[index].trim().split(separator);
            if (!ValidateCSVFile(validator, headers)) {
                alert('Formato Incorrecto')
                return false;
            }
        }
        else {
            var cells = lines[index].split(separator)
            let obj = {}
            for (const [index, cell] of cells.entries()) {
                obj[headers[index]] = parseInt(cell)
            }
            result.push(obj)
        }
    }
    return result
}
export function ValidateCSVFile(expected, format) {
    let formats = {
        plan_rates: ['plan_id', 'min_age', 'max_age', 'deductible', 'yearly_price', 'biyearly_price'],
        kid_rates: ['plan_id', 'deductible', 'num_kids', 'yearly_price', 'biyearly_price']
    }
    let difference = format.filter(x => !formats[expected].includes(x));
    console.log(difference)
    console.log(format[4])
    console.log(formats[expected][4])
    return arraysEqual(format, formats[expected])

}
export function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length)
        return false;
    for (var i = arr1.length; i--;) {
        if (arr1[i] !== arr2[i])
            return false;
    }

    return true;
}

export const responsiveText = (large, small) => {
    if (window.innerWidth > 768) {
        return large
    }
    return small
}

export function groupBy(xs, f) {
    return xs.reduce((r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r), []);
}
/*
const cars = [
    { make: 'audi', model: 'r8', year: '2012' },
    { make: 'audi', model: 'rs5', year: '2013' },
    { make: 'ford', model: 'mustang', year: '2012' },
    { make: 'ford', model: 'fusion', year: '2015' },
    { make: 'kia', model: 'optima', year: '2012' }
];

const result = groupBy(cars, (c) => c.make);
console.log(result);
*/