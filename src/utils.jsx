export const API = 'http://quotyapi.megabrokerslatam.co/api/admin/';
export const APIHEADERS = { 'CALL-TYPE': 'API' }

export function parseCSV(csvstring, separator, linebreak) {
    var result = [];
    let headers = [];
    var lines = csvstring.split(linebreak);
    for (let index = 0; index < lines.length; index++) {
        if (index === 0) {
            headers = lines[index].split(separator);
            if (!ValidateCSVFile('plan_rates', headers)) {
                alert('Formato Incorrecto')
                return false;
            }
        }
        else {
            var cells = lines[index].split(separator)
            let obj = {}
            cells.forEach((cell, index) => {

                obj[headers[index]] = parseInt(cell)
            })
            result.push(obj)
        }
    }
    return result
}
export function ValidateCSVFile(expected, format) {
    let formats = {
        plan_rates: ['plan_id', 'min_age', 'max_age', 'deductible', 'yearly_price', 'biyearly_price']
    }
    let difference = format.filter(x => !formats[expected].includes(x));
    console.log(difference)
    console.log(format[5]=formats[expected][5])
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