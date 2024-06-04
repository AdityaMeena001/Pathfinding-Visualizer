const fs = require('fs');

// Sample JSON data
let data = require('./BigTokyo.json');

// Separate nodes and ways
let nodes = [];
let ways = [];

data.forEach(item => {
  if (item.type === 'node') {
    nodes.push({ id: item.id, lat: item.lat, lon: item.lon });
  } else if (item.type === 'way') {
    ways.push({ id: item.id, nodes: item.nodes });
  }
});

// Create a mapping from old IDs to new sequential IDs
let idMapping = {};
let newId = 0;

// Map nodes
nodes.forEach(node => {
  idMapping[node.id] = newId++;
});

// Map ways (nodes within ways)
ways.forEach(way => {
  way.nodes.forEach(nodeId => {
    if (!idMapping.hasOwnProperty(nodeId)) {
      idMapping[nodeId] = newId++;
    }
  });
});

// Cleaned data structure
let cleanedData = {
  nodes: [],
  ways: []
};

// Add nodes to cleanedData with new IDs
cleanedData.nodes = nodes.map(node => {
  return {
    id: idMapping[node.id],
    lat: node.lat,
    lon: node.lon
  };
});

// Add ways to cleanedData with nodes having new IDs
cleanedData.ways = ways.map(way => {
  return {
    // id: idMapping[way.id], // Assuming you want to map way IDs as well
    nodes: way.nodes.map(nodeId => idMapping[nodeId])
  };
});

// Save cleaned data to a new JSON file
fs.writeFile('cleanedData.json', JSON.stringify(cleanedData, null, 2), (err) => {
  if (err) throw err;
  console.log('Cleaned data has been saved to cleanedData.json');
});
