
var select_tag = d3.select("#selDataset");


fetch('../data/samples.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(data){
        // console.log(data);

    var subjectIds = data.names
        console.log(data.names)

    // tying to the dropdown 
    subjectIds.map((id) => {
        select_tag
          .append("option")
          .property("value", id)
          .text(id);
      });

      optionChanged(subjectIds[0]);

});

function optionChanged(select_id) {

    d3.json("../data/samples.json").then((data) => {
        //     console.log("data")
        //     console.log(data)

// BEGINNING Bar chart code
    var samplesData = data.samples
        // console.log(samplesData)

// gives me only the 940 values I need
    // var slicedData= samplesData[0][0];
    
    var filteresults = samplesData.filter(sampleObj => sampleObj.id == select_id);
        console.log("filteresults")
        // console.log(filteresults)

    var result = filteresults[0] 
     console.log(result)
    // console.log(slicedData)

    // need to seperate the otu id 
        // var otuYValues = [slicedData.otu_ids]

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        // create the labels for y
        var y_label = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

    // console.log("y_label: ");
    // console.log(y_label);

    // console.log("sample_valuese: ");
    console.log(sample_values.slice(0, 10).reverse());

    var bar_trace = {
      y: y_label,
      x: sample_values.slice(0, 10).reverse(),
      text: otu_labels.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h",
    };

    var data = [bar_trace];

    var bar_layout = {
      title: "Top 10 OTUs",
      margin: { t: 30, l: 150 }
    };

    Plotly.newPlot("bar", data, bar_layout);

        // console.log(otuYValues)
        
        // var otuXValues = [slicedData.sample_values]
        // // console.log(otuXValues)
        
        //  // take out the ten I need for  y values
        //  let arrayY = otuYValues[0];
        //  console.log(arrayY);

        //  let topTenY = arrayY.slice(0,10);
        // //  console.log(topTenY);

        //  var finalY = topTenY.toString();

        // // take out the ten I need for  x values
        //  let arrayX = otuXValues[0];
        // //  console.log(arrayX);

        //  let topTenX = arrayX.slice(0,10);
        // //  console.log(topTenX);

        // //  reverse the data 

        // var finalX = topTenX.reverse();

// BEGINNING bar chart code-formatting help 

    // var data= [{
    //     x: finalX,
    //     y: finalY,
    //     type: 'bar',
    //     orientation: 'h'
    // }];
    
    // var layout = {
    //     width: 500,
    //     xaxis: {
    //         autotick: false,
    //         ticks: 'outside',
    //         tick0: 0,
    //         dtick: 50,
    // }};

    // Plotly.newPlot("bar", data,layout);


// END bar chart
// BEGINNING BUBBLE 

var bubble_trace = {
    x: otu_ids,
    y: sample_values,
    text: otu_labels,
    mode: "markers",
    marker: {
      size: sample_values,
      color: otu_ids,
      colorscale: "Earth"
    }
  };

  var data = [bubble_trace];

  var bubble_layout = {
    hovermode: "closest",
    xaxis: { title: "OTU ID" },
    margin: { t: 30 }
  };

  Plotly.newPlot("bubble", [bubble_trace], bubble_layout);


    // var trace1 = {
    //     type: 'bubble',
    //     x: arrayX,
    //     y: arrayY,
    //     mode: 'markers',
        
    
    // };
    
    // var data =[trace1];
    
    // var layout = {
    //     title: 'Bubble Chart',
    //     showlegend: false,
    //     height: 600,
    //     width: 600
    // };
    
    // Plotly.plot('bubble', data);


// bubble chart beginning 
// Create a bubble chart that displays each sample.
// Use otu_ids for the x values.
// Use sample_values for the y values.
// Use sample_values for the marker size.
// Use otu_ids for the marker colors.
// Use otu_labels for the text values.
// bubble chart end

// beginning of code to select data for indvidual's demographic information
// end of demographic

  var metadata = data.metadata;

      console.log("metadata");
  // curious why error pulling?
      console.log(metadata);


    var searched = metadata.filter(metadataObj => metadataObj.id == selected_id);
    var searched= searched[0];

    console.log("searched")
    console.log(searched)

    console.log("result")
    console.log(searched)

    var fig = d3.select("#sample-metadata");

    // fig.html("");

    Object.entries(searched[0]).forEach(([key, value]) => {
      fig.append("h5").text(`${key}: ${value}`);
    });

    buildGauge(searched.wfreq);

})

}