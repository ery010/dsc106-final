async function loadJSON(path) {
	let response = await fetch(path);
	let dataset = await response.json(); // Now available in global scope
	return dataset;
}

function init() {
	yearsPromise = loadJSON('./data/year_counts.json');

	yearsPromise.then(function (year) {
		plotYearSales(year);
	});
};

// TODO: Re-scrape counts
let states = [
				['us-ak', 17.0],
				['us-al', 188.0],
				['us-ar', 105.0],
				['us-az', 259.0],
				['us-ca', 1252.0],
				['us-co', 181.0],
				['us-ct', 140.0],
				['us-dc', 27.0],
				['us-de', 27.0],
				['us-fl', 846.0],
				['us-ga', 356.0],
				['us-hi', 51.0],
				['us-ia', 102.0],
				['us-id', 49.0],
				['us-il', 572.0],
				['us-in', 293.0],
				['us-ks', 115.0],
				['us-ky', 150.0],
				['us-la', 150.0],
				['us-ma', 234.0],
				['us-md', 255.0],
				['us-me', 10.0],
				['us-mi', 444.0],
				['us-mn', 168.0],
				['us-mo', 225.0],
				['us-ms', 44.0],
				['us-mt', 23.0],
				['us-nc', 378.0],
				['us-nd', 17.0],
				['us-ne', 50.0],
				['us-nh', 31.0],
				['us-nj', 236.0],
				['us-nm', 69.0],
				['us-nv', 124.0],
				['us-ny', 509.0],
				['us-oh', 502.0],
				['us-ok', 163.0],
				['us-or', 129.0],
				['us-pa', 428.0],
				['us-ri', 31.0],
				['us-sc', 169.0],
				['us-sd', 15.0],
				['us-tn', 242.0],
				['us-tx', 1041.0],
				['us-ut', 102.0],
				['us-va', 324.0],
				['us-vt', 1.0],
				['us-wa', 232.0],
				['us-wi', 248.0],
				['us-wv', 9.0],
				['us-wy', 9.0]
			]

function plotMap(states) {
	Highcharts.mapChart("statesCounts", {
		chart: {
			map: 'countries/us/us-all',
		},
		title: {
			text: "Number of U.S. McDonald's Locations by State",
			style: {
				fontFamily: "Montserrat', sans-serif",
				fontWeight: "bolder",
				color: "black"
			}
		},
		exporting: {
			enabled: false
		},
		legend: {
			enabled: false
		},
		credits: {
			enabled: false
		},
		series: [{
			data: states,
			color: '#F2D78C',
			name: 'Number of Locations',
			states: {
                hover: {
                    color: '#FF4A4A'
                }
            },
			dataLabels: {
                enabled: true,
                format: '{point.value}',
				color: 'black',
				style: {
					textOutline: 0
				}
            }
		}]

	})

}
plotMap(states)

function plotYearSales(yearSales) {

	// Borrowed code from zingcharts code (main.js)
    let years = [];
    let totals = [];
    let totalByYear = [];
	for (datum of yearSales) {
        years.push(datum['Year']);
        totals.push(Number(datum['Total'].toFixed(2)));
        totalByYear.push([datum['Year'], Number(datum['Total'].toFixed(2))])
    }
    console.log(years)
    console.log(totals)
    

	Highcharts.chart("lineChart", {
		chart: {
			type: "line",
			style: {
				color: "lightblue"
			},
			marginRight: 45,
			marginLeft: 65,
			marginBottom: 75
		},
		title: {
			text: 'Yearly Growth',
			style: {
				fontWeight: "bold",
				fontSize: "21px"
			}
		},
		subtitle: {
			text: "Total Number of McDonald's Restaurants Worldwide 1994-2018",
			style: {
				fontWeight: "bold"
			}
		},
		xAxis: {
			labels: {
				style: {
					fontSize: "12px"
				}
			},
			title: {
				text: "Year",
				style: {
					fontWeight: "bold"
				}
			},
			tooltip: {
				enabled: true,
			},
			min: years[0],
			lineColor: "#a9a9a9",
			lineWidth: 1,
			tickColor: "#a9a9a9",
			tickLength: 5,
			tickWidth: 1,
			crosshair: {
				width: 1,
				color: "#808080",
				label: {
					enabled: true, 
					overflow: 'justify'
				}
			}
		},
		yAxis: {
			min: 0,
			max: 40000,
			title: {
				text: 'Total Number of Locations',
				align: 'middle',
				style: {
					fontWeight: "bold"
				}
			},
			lineColor: "#a9a9a9",
			lineWidth: 1,
			tickColor: "#a9a9a9",
			tickLength: 5,
			tickWidth: 1,
			labels: {
				overflow: 'justify',
				style: {
					fontSize: "12px"
				}
			},
			crosshair: {
				width: 1,
				color: "#808080"
			},
			tickInterval: 5000,
			gridLineDashStyle: "ShortDash",
			gridLineColor: "#dcdcdc"
		},
		plotOptions: {
			areaspline: {
				color: "#00bfff",
				fillOpacity: "0.3"
			}
		},
		exporting: {
			enabled: false
		},
		credits: {
			enabled: false
		},
		series: [{
			data: totalByYear,
			name: "Total EV Sales by Year",
			showInLegend: false,
			tooltip: {
				pointFormat: '{point.y}',
				headerFormat: '{null}'
			},
			states: {
				hover: {
					enabled: false
				}
			}
		}],
	});
}


document.addEventListener('DOMContentLoaded', init, false);