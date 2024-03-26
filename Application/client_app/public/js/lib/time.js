function startTime() {
    let today = new Date();
    let d = today.getDate();
    let a = today.getMonth();
    let y = today.getFullYear();
    let h = today.getHours();
    let m = today.getMinutes();
    m = checkTime(m);
    document.getElementById('time').innerHTML =
        h + ":" + m;
    let t = setTimeout(startTime, 30000);
}
function checkTime(i) {
    if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
    return i;
}
startTime();
