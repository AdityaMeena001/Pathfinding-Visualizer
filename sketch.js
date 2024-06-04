let min_x = Infinity,
  min_y = Infinity,
  max_x = -Infinity,
  max_y = -Infinity;

let scale = 5000;
let data = null;
let nodes = [],
  edges = [],
  adjList = [];
let sIdx = 1559,
  eIdx = 34917;
let cx = 0,
  cy = 0;
let depth = [];
let currDepth = 0;
let currNodes = [];

let algorithm = "BFS";
let loadButton;
let startMapLoading = false;
let runButton;
let startPathFinding = false;

function preload() {
  data = loadJSON("BigNewYorkCleaned.json");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  frameRate(120);

  runButton = createButton("Run");
  runButton.position(200, 20);
  runButton.mousePressed(functionRunAlgorithm);

  loadButton = createButton("LoadMap");
  loadButton.position(300, 20);
  loadButton.mousePressed(functionLoadMap);

  mySelect = createSelect();
  mySelect.position(100, 20);
  // Add color options.
  mySelect.option("red");
  mySelect.option("green");
  mySelect.option("blue");
  mySelect.option("yellow");
  // Set the selected option to "red".
  mySelect.selected("red");

  initalize();
  //   console.log(data);
}

function functionRunAlgorithm() {
  if (startMapLoading == true) {
    startPathFinding = true;
  }
}
let mapCurrNodes = [];
let mapCurrDepth = 0;
let mapDepths = [];
function functionLoadMap() {
  startMapLoading = true;
  mapCurrNodes = [447];
  console.log("maploadCalled", mapCurrNodes);
  background(255);
  mapCurrDepth = 0;
  mapDepths = new Array(nodes.length).fill(-1);
}

function initalize() {
  min_x = Infinity;
  min_y = Infinity;
  max_x = -Infinity;
  max_y = -Infinity;

  currDepth = 0;
  currNodes = [];
  nodes = data.nodes;
  edges = data.ways;

  depth = new Array(nodes.length).fill(-1);
  depth[sIdx] = 0;
  currDepth = 0;
  currNodes.push(sIdx);
  initGraph();
  loadMap();
}

let prevMapNodes = [0];

function draw() {
  if (startMapLoading == true) {
    // console.log( "startMapLoadCalled");
    BFS_fill();
  }

  if (startPathFinding == true) {
    if (algorithm == "A-star") {
      A_Star();
    } else if (algorithm == "BFS") {
      BFS();
    } else if (algorithm == "DFS") {
      DFS();
    } else if (algorithm == "Dijkstra") {
      Dijkstra();
    } else if (algorithm == "Bidirectional") {
      bidirectional();
    }
  }
}

function loadMap() {
  translate(width / 2, height / 2);

  cx = min_x + (max_x - min_x) / 2;
  cy = min_y + (max_y - min_y) / 2;

  // for (let i = 0; i < adjList.length; i++) {
  //   for (let j = 0; j < adjList[i].length; j++) {
  //     let x = (nodes[i].lat - cx) * scale;
  //     let y = (nodes[i].lon - cy) * scale;
  //     let x2 = (nodes[adjList[i][j]].lat - cx) * scale;
  //     let y2 = (nodes[adjList[i][j]].lon - cy) * scale;
  //     stroke(192);
  //     if (nodes[i].id < nodes[adjList[i][j]].id) {
  //       line(y, -x, y2, -x2);
  //     }
  //   }
  // }
  // let sNode = nodes[sIdx];
  // let x = (sNode.lat - cx) * scale;
  // let y = (sNode.lon - cy) * scale;
  // stroke(255, 0, 255);
  // strokeWeight(12);
  // point(y, -x);
  // let enode = nodes[eIdx];
  // let x2 = (enode.lat - cx) * scale;
  // let y2 = (enode.lon - cy) * scale;
  // stroke(255, 0, 0);
  // point(y2, -x2);
}

function initGraph() {
  adjList = [];
  for (let i = 0; i < nodes.length; i++) {
    min_x = Math.min(min_x, nodes[i].lat);
    min_y = Math.min(min_y, nodes[i].lon);
    max_x = Math.max(max_x, nodes[i].lat);
    max_y = Math.max(max_y, nodes[i].lon);
    adjList.push([]);
  }

  for (let i = 0; i < edges.length; i++) {
    for (let j = 0; j < edges[i].nodes.length - 1; j++) {
      adjList[edges[i].nodes[j]].push(edges[i].nodes[j + 1]);
      adjList[edges[i].nodes[j + 1]].push(edges[i].nodes[j]);
    }
  }
  // console.log(adjList);
}
