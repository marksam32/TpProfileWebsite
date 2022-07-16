const TABLE = document.getElementsByClassName("profile-table")[0];
const LOADING = document.getElementsByClassName("loading")[0];
const SHEETLINK = 'https://docs.google.com/spreadsheets/d/18GbMMdNvgddu8Th3UVJbQmeaXbVZKb886O1cQCDSS7k/gviz/tq?tqx=out:json&gid=0';
const HTTP = new XMLHttpRequest();
const REGEX = /google\.visualization\.Query\.setResponse\((.+)\)/;

HTTP.open('GET', SHEETLINK);

HTTP.onreadystatechange = (e) => {
    if(HTTP.readyState === XMLHttpRequest.DONE) { 
        var status = HTTP.status;
        if (status === 0 || (status >= 200 && status < 400)) {
            var match = REGEX.exec(HTTP.responseText)[1];
            if(match == null) {
                LOADING.innerHTML = "Failed to load profile info."
                return;
            }
            LOADING.remove();
            setTable(match)
        } else {
            LOADING.innerHTML = "Failed to load profile info."
                return;
        }
    }
    else {
        LOADING.innerHTML = "Failed to load profile info."
    }
}

HTTP.send();

function setTable(tableParams) {
    let parsedTable = JSON.parse(tableParams).table.rows.map(x => ({"profile": x.c[0].v, "module": x.c[1].v}));
    console.log(parsedTable)

    let table = TABLE;

    parsedTable.forEach(element => {
        let row = table.insertRow()
        
        row.insertCell().innerHTML = element.profile;
        row.insertCell().innerHTML = element.module;
    });
}