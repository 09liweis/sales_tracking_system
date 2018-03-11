export function parseDate(val) {
    const dateArray = val.split('/');
    const date = dateArray[2] + '-' + dateArray[0] + '-' + dateArray[1];
    return date;
}