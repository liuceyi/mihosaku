class Grid {
  constructor(x, y, w, h, row, col) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.row = row;
    this.col = col;
    this.status = 0; // 0 is empty, 1 is occupied, 2 is broken
  }

  show() {
    rectMode(CORNER);
    noFill();
    stroke(220);
    rect(this.x, this.y, this.w, this.h);
  }

  explode() {
    rectMode(CORNER);
    fill(30);
    stroke(220);
    rect(this.x, this.y, this.w, this.h);
  }
}

class Block {
  constructor(x, y, w, h, row, col, hp = 100, type='normal') {
    this.x = x + w/2;
    this.y = y + h/2;
    this.w = w * 0.6;
    this.h = h * 0.6;
    this.row = row;
    this.col = col;
    this.hp = hp;
    this.fullHp = hp;
    this.type = type;
  }

  show() {
    rectMode(CENTER);
    noFill();
    stroke(20);
    arc(this.x, this.y, this.w, this.h, 0, 2 * PI * this.hp/this.fullHp, PIE);
  }

  hurt(damage) {
    this.hp -= damage;
  }
}

class BombBlock extends Block {
  constructor(x, y, w, h, row, col, hp=50, damage=100, explodeRange=1) {
    super(x, y, w, h, row, col, hp, 'bomb');
    this.damage = damage;
    this.explodeRange = explodeRange;
  }

  show() {
    rectMode(CENTER);
    fill(70);
    stroke(20);
    arc(this.x, this.y, this.w, this.h, 0, 2 * PI * this.hp/this.fullHp, PIE);
  }

  explode() {
    let explodeList = [];
    for (let i = 1; i <= this.explodeRange; i++) {
      explodeList.push({'row':this.row - i, 'col':this.col});
      explodeList.push({'row':this.row + i, 'col':this.col});
      explodeList.push({'row':this.row, 'col':this.col - i});
      explodeList.push({'row':this.row, 'col':this.col + i});
    }
    return explodeList;
  }
}
