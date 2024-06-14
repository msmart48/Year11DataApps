const stateChartArea = document.getElementById("stateChartArea");
const genderChartArea = document.getElementById("genderChartArea");


var data = [];  //store all data locally
var stateLabels = ["South Australia", 'Western Australia', "Northen Territry", "Queensland", "New South Wales", "Vicotria", "Tasmania"];
var counts = [0, 0, 0, 0, 0, 0, 0];
var genderLabels = ["M", "F"];
var genderCounts = [0, 0];

var pieChart;   //set up global var
var colchart;

fetchAllData(); //start the program

//loop over data and count the number of attacks by state
function getStateCounts() {
    for (var i = 0; i < data.results.length; i++) {
        var state = data.results[i].area;
        console.log(state);
        var index = stateLabels.indexOf(state);
        if (index != -1) {
            counts[index]++;
        }
    }
    console.log(counts);
}

//loop over data and count the number of attacks by gender
function getGenderCounts() {
    for (var i = 0; i < data.results.length; i++) {
        var sex = data.results[i].sex;
        console.log(sex);
        var index = genderLabels.indexOf(sex);
        if (index != -1) {
            genderCounts[index]++;
        }
    }
    console.log(genderCounts);
}

async function fetchAllData() {
    try {
        const response = await fetch('https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/global-shark-attack/records?where=country%3D%22Australia%22%20OR%20country%20%3D%20%22AUSTRALIA%22&limit=100');
        data = await response.json();
        getStateCounts();
        getGenderCounts();

        createColChart();
        createPieChart();

    } catch (error) {
        console.error(error);
    }
}

//create the pie chart
function createPieChart() {
    pieChart = new Chart(stateChartArea, {
        type: 'pie',
        data: {
            labels: stateLabels,
            datasets: [{
                data: counts,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ]
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Shark Attack in Australia by State'
            }
        }
    });
}

//create the pie chart
function createColChart() {
    colChart = new Chart(genderChartArea, {
        type: 'bar',
        data: {
            labels: genderLabels,
            datasets: [{
                data: genderCounts,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ]
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Shark Attack in Australia by Sex'
            }
        }
    });
}




