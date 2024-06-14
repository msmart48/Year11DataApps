var data;
var output = document.getElementById("output");

fetchAllData(); //start fetching data on load

//get the data from the api and parse to data as JSON.
async function fetchAllData() {
    try {
        const response = await fetch('https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/global-shark-attack/records?where=country%3D%22Australia%22%20OR%20country%20%3D%20%22AUSTRALIA%22&limit=100');
        data = await response.json();
        printData();
    } catch (error) {
        console.error(error);
    }
}

//loop over the data and print to the output div
function printData() { 
    var text = "";
    data.results.forEach(element => {
        console.log(`Name: ${element.name} - ${element.country} - ${element.area}`);
        text += `Name: ${element.name} - ${element.country} - ${element.area}<br>`;
    });
    output.innerHTML = text;
}