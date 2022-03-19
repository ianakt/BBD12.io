function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);

    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    samples = data.samples
    meta = data.metadata
      // contains_samples_array =[]
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    var reray = meta.filter(sampleObj => sampleObj.id == sample);
    //  5. Create a variable that holds the first sample in the array.

    var first = resultArray[0];
    let first1 = reray[0]
    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.

    otu_ids = first.otu_ids
    otu_labels = first.otu_labels
    sample_values = first.sample_values
    washing_frequencies = first1.wfreq


    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    var yticks = sample_values.slice(0,10)

    // 8. Create the trace for the bar chart. 
    var barData = {
      x: yticks,
      y: otu_ids,
      type: "bar",
      orientation: 'h'
      
    };
    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      xaxis: {title: "OTU_ID" },
      yaxis: {title: "# of microbes"}
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", [barData], barLayout);

        // 1. Create the trace for the bubble chart.
        var bubbleData = {
          x: otu_ids,
          y: sample_values,
          mode: 'markers',
          marker:{ otu_ids, 
            size: [20,30,49,62,77,99,111],
            color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)','rgb(5, 44, 64) ','rgb(597, 34, 4) ','rgb(53, 744, 4) ']},
          type: "bubble"
          
      };
    
        // 2. Create the layout for the bubble chart.
        var bubbleLayout = {
          title: "Bacteria Cultures Per Sample",
          xaxis: {title: "OTU_ID" },
          yaxis: {title: "# of microbes"}
        };
    
        // 3. Use Plotly to plot the data with the layout.
        Plotly.newPlot('bubble', [bubbleData], bubbleLayout); 
        
            // 4. Create the trace for the gauge chart.
    var gaugeData = [
      {
        domain: { x: [0, 10], y:[0,10]  },
        value: washing_frequencies,
        title: { text: "Washing hand Frequency" },
        type: "indicator",
        mode: "gauge+number"
      }
    ];


            // 5. Create the layout for the gauge chart.
    var gaugeLayout = { width: 600, height: 450, margin: { t: 0, b: 0 }
     
  };

  // 6. Use Plotly to plot the gauge data and layout.
  Plotly.newPlot('gauge',gaugeData, gaugeLayout);
  });
}


// // Create the buildCharts function.
// function buildCharts(sample) {
//   // Use d3.json to load and retrieve the samples.json file 
//   d3.json("samples.json").then((data) => {
    

//     // Deliverable 1 Step 10. Use Plotly to plot the data with the layout. 
//     Plotly.newPlot(); 

//     // 1. Create the trace for the bubble chart.
//     var bubbleData = {
//       x: otu_ids,
//       y: sample_values,
//       mode: 'markers',
//       marker: otu_ids,
//       type: "scatter"
//   };

//     // 2. Create the layout for the bubble chart.
//     var bubbleLayout = {
//       title: "Bacteria Cultures Per Sample",
//       xaxis: {title: "OTU_ID" },
//       yaxis: {title: "# of microbes"}
//     };

//     // 3. Use Plotly to plot the data with the layout.
//     Plotly.newPlot('myDiv', [bubbleData], bubbleLayout); 
//   });
// }


// function buildCharts(sample) {
//   // Use d3.json to load the samples.json file 
//   d3.json("samples.json").then((data) => {
//     console.log(data);

//     // Create a variable that holds the samples array. 
//     contains_samples_array =[]
//     // Create a variable that filters the samples for the object with the desired sample number.
//     var resuray = sample.filter(sampleObj => sampleObj.id == sample)
//     // 1. Create a variable that filters the metadata array for the object with the desired sample number.
//     var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);

//     // Create a variable that holds the first sample in the array.
   
//     let sample_result = resuray[0]
//     // 2. Create a variable that holds the first sample in the metadata array.
    
//     var met_result = resultArray[0];
//     // Create variables that hold the otu_ids, otu_labels, and sample_values.
//     otu_ids = first.otu_ids
//     otu_labels = first.otu_labels
//     sample_values = first.sample_values

//     // 3. Create a variable that holds the washing frequency.

//     washing_frequency = []
   
//     // Create the yticks for the bar chart.

//     yticks = 
//     // Use Plotly to plot the bar data and layout.
//     Plotly.newPlot();
    
//     // Use Plotly to plot the bubble data and layout.
//     Plotly.newPlot();
   






    
    // 4. Create the trace for the gauge chart.
    var gaugeData = [
  {
		domain: { x: [0, 1], y: [0, 1] },
		value: 270,
		title: { text: "Speed" },
		type: "indicator",
		mode: "gauge+number"
	}
];
     
//     ];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { width: 600, height: 450, margin: { t: 0, b: 0 }
     
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot('gauge',gaugeData, gaugeLayout);
//   });
// }
