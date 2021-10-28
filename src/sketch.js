// require('./components/scene-controller.js');
var gridList = [];
var blockList = [];
var debug = true;
var n = 20;
var gameScene = 0; // 0 is gameScene, 1 is restartScene
var player;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(30);
  player = new Player(width/2);
  // Form Blocks * n in grid
  createBlock(n);
}

function draw() {
  resizeCanvas(windowWidth, windowHeight);
  // sc.show();

  if (isWin()) {
    //noLoop();
  }
  else {
    // Player Sys
    player.move();
    player.show();
    if (mouseIsPressed && frameCount%20==0) {
      player.fire();
    }

    // Bullet Sys
    for (let i = 0; i < player.bulletList.length; i++) {
      let bullet = player.bulletList[i];
      if (bullet.y < 0) {
        player.bulletList.splice(i, 1);
        continue;
      }
      else {
        bullet.move();
        bullet.show();
        for (let j = 0; j < blockList.length; j++) {
          if (bullet.hit(blockList[j])) { // hit 
            player.bulletList.splice(i, 1);
            let block = blockList[j];
            block.hurt(bullet.damage);
            if (block.hp <= 0) {
              blockList.splice(j, 1);
              gridList[block.row][block.col].status = 2;
              if (block.type == 'bomb') {
                let explodeList = block.explode();
                for (let k = 0; k < explodeList.length; k++) {
                  let target = findBlock(explodeList[k].row, explodeList[k].col);
                  if (target != null) {
                    target.hurt(block.damage);
                    if (target.hp <= 0) {
                      blockList.splice(blockList.indexOf(target), 1);
                      gridList[target.row][target.col].status = 2;
                    }
                  }
                }
              }
            }

          }
        }
      }
    }

    // Grid Sys (Only show when Debug mode is on)
    for (let i = 0; i < gridList.length; i++) {
      let gridRow = gridList[i];
      for (let j = 0; j < gridRow.length; j++) {
        let grid = gridRow[j];
        if (debug) {
          grid.show();
        }
      }
    }


    // Block Sys
    for (let i = 0; i < blockList.length; i++) {
      let block = blockList[i];
      block.show();
    }
  }
  

  // background(230);
  // textAlign(CENTER);
  // textSize(40);
  // fill(color('#919191'));
  // text("MihoSaku", width/2, height/2);
}

function findBlock(row, col) {
  for (let i = 0; i < blockList.length; i++) {
    let block = blockList[i];
    if (row == block.row && col == block.col) {
      return block;
    }
  }
  return null;
}

function createBlock(n, bombNum = 1) {
  // Divide half of window into grids
  let rowNum = 3; // the number of rows (preset*)
  let rowH = (height/2) / rowNum; // height of row
  let colW = rowH; // width of column
  let colNum = int(width / colW); // the number of columns
  let widthPadding = (width - colW * colNum)/2; // padding between left/right edge to the grids
  
  // show grids
  for (let i = 0; i < rowNum; i++) {
    let gridRow = [];
    for (let j = 0; j < colNum; j++) {
      let grid = new Grid(widthPadding + j * colW, i * rowH, colW, rowH, i, j);
      gridRow.push(grid);
    }
    gridList.push(gridRow);
  }

  // random input blocks to grids
  let bombCount = 0;
  let block;
  for (let i = 0; i < n; i++) {
    let randGridRow = int(random(0, rowNum));
    let randGridCol = int(random(0, colNum));
    while (gridList[randGridRow][randGridCol].status != 0) {
      randGridRow = int(random(0, rowNum));
      randGridCol = int(random(0, colNum));
    }

    if (bombCount < bombNum) {
      block = new BombBlock(widthPadding + randGridCol * colW, randGridRow * rowH, colW, rowH, randGridRow, randGridCol);
      bombCount ++;
    }
    else {
      block = new Block(widthPadding + randGridCol * colW, randGridRow * rowH, colW, rowH, randGridRow, randGridCol);
    }
    
    gridList[randGridRow][randGridCol].status = 1;
    blockList.push(block);
  }

}

function isWin() {
  if (blockList.length == 0) {
    gameScene = 1;
    background(230);
    textAlign(CENTER);
    textSize(40);
    fill(color('#919191'));
    text("You WIN!", width/2, height/2);

    fill(color(50, 55, 100));
    text("RESTART?", width/2, height * 2/3);
    return true;
  }
  return false;
}

function restart() {
  createBlock(n);
  gameScene = 0;
}

function mouseClicked() {
  switch (gameScene) {
    case 0:
      player.fire();
      break;
    case 1:
      restart();
      print('restart');
      break;
  }
  
}

// function keyPressed(){        
//   if(key == ' '){        // Press the space key     
//     sc.push('Home');     // Change the scene
//   }
// }