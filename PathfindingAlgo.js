function A_Star() {
  let startNode = nodes[sIdx];
  let openSet = [];
  let closedSet = [];
  let path = [];
  let currentNode = null;
  let startDepth = 0;
  
  openSet.push(startNode);
  depth[startNode.id] = startDepth;

  while (openSet.length > 0) {
    openSet.sort((a, b) => a.depth - b.depth);
    currentNode = openSet.shift();
    closedSet.push(currentNode);
    path.push(currentNode);

    if (currentNode.id === eIdx) {
      console.log("Path found!", path);
      break;
    }

    let neighbors = adjList[currentNode.id];
    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = nodes[neighbors[i]];
      if (closedSet.includes(neighbor)) continue;
      let tempGScore = depth[currentNode.id] + heuristic(neighbor, eIdx);
      if (!openSet.includes(neighbor)) {
        openSet.push(neighbor);
        depth[neighbor.id] = tempGScore;
        neighbor.previousNode = currentNode;
      } else if (tempGScore < depth[neighbor.id]) {
        depth[neighbor.id] = tempGScore;
        neighbor.previousNode = currentNode;
      }
    }
  }

  if (path.length === 0) {
    console.log("No path found");
  }

  function heuristic(nodeA, nodeB) {
    let dx = Math.abs(nodeA.lat - nodes[nodeB].lat);
    let dy = Math.abs(nodeA.lon - nodes[nodeB].lon);
    return Math.sqrt(dx * dx + dy * dy);
  }
}

function Dijkstra(){
  let openSet = [];
  let closedSet = [];
  let path = [];
  let currentNode = null;

  openSet.push(nodes[sIdx]);
  depth[nodes[sIdx].id] = 0;

  while (openSet.length > 0) {
    openSet.sort((a, b) => a.depth - b.depth);
    currentNode = openSet.shift();
    closedSet.push(currentNode);
    path.push(currentNode);

    if (currentNode.id === eIdx) {
      console.log("Path found!", path);
      break;
    }

    let neighbors = adjList[currentNode.id];
    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = nodes[neighbors[i]];
      if (closedSet.includes(neighbor)) continue;
      let tempGScore = depth[currentNode.id] + 1;
      if (!openSet.includes(neighbor)) {
        openSet.push(neighbor);
        depth[neighbor.id] = tempGScore;
        neighbor.previousNode = currentNode;
      } else if (tempGScore < depth[neighbor.id]) {
        depth[neighbor.id] = tempGScore;
        neighbor.previousNode = currentNode;
      }
    }
  }

  if (path.length === 0) {
    console.log("No path found");
  }
}

function BFS() {
  let nextNodes = [];

  for (let i = 0; i < currNodes.length; i++) {
    let node = nodes[currNodes[i]];

    let adj = adjList[currNodes[i]];
    // console.log(adj);
    for (let j = 0; j < adj?.length; j++) {
      let adjNode = nodes[adj[j]];
      // console.log( adjNode );
      if (depth[adjNode.id] == -1) {
        depth[adjNode.id] = currDepth + 1;
        nextNodes.push(adjNode.id);

        let x = (node.lat - cx) * scale;
        let y = (node.lon - cy) * scale;
        let x2 = (adjNode.lat - cx) * scale;
        let y2 = (adjNode.lon - cy) * scale;
        stroke(0, 0, 255);
        strokeWeight(2);
        // console.log(y, -x, y2, -x2);
        line(y, -x, y2, -x2);
        if (depth[eIdx] != -1) {
          nextNodes = [];
          // backTrack();
          break;
        }
      }
    }
  }
  currDepth++;
  currNodes = nextNodes;
}

function backTrack() {
  let node = nodes[eIdx];
  let currDepth = depth[eIdx];

  while (currDepth > 0) {
    // console.log(node, currDepth);
    console.log(adjList[node.id]);
    let adj = adjList[node.id];
    for (let i = 0; i < adj?.length; i++) {
      let adjNode = nodes[adj[i]];
      if (depth[adjNode.id] == currDepth - 1) {
        console.log(adjNode[i])
        let x = (node.lat - cx) * scale;
        let y = (node.lon - cy) * scale;
        let x2 = (adjNode.lat - cx) * scale;
        let y2 = (adjNode.lon - cy) * scale;
        stroke(255, 0, 0);
        strokeWeight(4);
        line(y, -x, y2, -x2);
        node = adjNode;
        currDepth--;
        break;
      }
    }
  }
}

function BFS_fill() {

  let nextNodes = [];
  translate(width / 2, height / 2);

  strokeWeight(1);

  for (let i = 0; i < mapCurrNodes.length; i++) {
    let node = nodes[mapCurrNodes[i]];

    let adj = adjList[mapCurrNodes[i]];
    // console.log(adj);
    for (let j = 0; j < adj?.length; j++) {
      let adjNode = nodes[adj[j]];
      // console.log( adjNode );
      
      let x = (node.lat - cx) * scale;
      let y = (node.lon - cy) * scale;
      let x2 = (adjNode.lat - cx) * scale;
      let y2 = (adjNode.lon - cy) * scale;
      stroke(160);
      // strokeWeight(2);
      // console.log(y, -x, y2, -x2);
      line(y, -x, y2, -x2);
      // if( dist(x,y,0,0)<=2){
      //   console.log(node);
      // }
      if (mapDepths[adjNode.id] == -1 || mapDepths[adjNode.id] > mapCurrDepth + 1) {
        mapDepths[adjNode.id] = mapCurrDepth + 1;
        nextNodes.push(adjNode.id);
      }
    }
  }
  currDepth++;
  mapCurrNodes = nextNodes;
}