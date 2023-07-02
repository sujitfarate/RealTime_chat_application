export function datetime(gettime){
    const d = new Date(gettime);
let text = d.toLocaleTimeString();
return text
}
console.log(datetime("2023-06-18T06:40:50.648Z"));