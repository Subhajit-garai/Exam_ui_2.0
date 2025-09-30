


export function convertToTimeFormat(input:any):string {
    let hours = input.match(/(\d+)h/);
    let minutes = input.match(/(\d+)m/);
    let seconds = input.match(/(\d+)s/);

    let hh = hours ? hours[1].padStart(2, '0') : "00";
    let mm = minutes ? minutes[1].padStart(2, '0') : "00";
    let ss = seconds ? seconds[1].padStart(2, '0') : "00";

    return `${hh}:${mm}:${ss}`;
}