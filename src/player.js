class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = height/50;
    this.speed = height/50;
    this.damage = 50;
  }
  
  move() {
    this.y -= this.speed;
  }

  show() {
    stroke(255, 0, 0);
    ellipse(this.x, this.y, this.w);
  }

  hit(hitObj) {
    let distR1R2 = dist(this.x, this.y, hitObj.x, hitObj.y);
    if (distR1R2 > this.w + hitObj.w) {
      return false;
    }
    else {
      return true;
    }
  }
}

class Player {
  constructor(initX) {
    this.w = height/10;
    this.h = height/10;
    this.x = initX;
    this.y = height - 5 - this.h/2;
    this.bulletList = [];
    this.lastFireFrame = 0;
  }
  
  move() {
    this.x = lerp(this.x, mouseX, 0.1);
  }

  show() {
    rectMode(CENTER);
    stroke(10);
    rect(this.x, this.y, this.w, this.h); 
  }

  fire() {
    if (this.fireCd()==true) {
      let bullet = new Bullet(this.x, this.y - this.h/2);
      this.bulletList.push(bullet);
      this.lastFireFrame = frameCount;
    }
  }

  fireCd(cd=20) {
    if (frameCount - this.lastFireFrame >= cd) {
      return true;
    }
    return false;
  }
}

