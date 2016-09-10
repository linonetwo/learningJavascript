function decorateLight(target, key, descriptor) {
  const method = descriptor.value;
  let moreAtk = 50;
  let ret;
  descriptor.value = (...args)=>{
    args[1] += moreAtk;
    ret = method.apply(target, args);
    return ret;
  }
  return descriptor;
}

class Man{
  constructor(def = 2,atk = 3,hp = 3){
    this.init(def,atk,hp);
  }

  @decorateArmour
  @decorateLight
  init(def,atk,hp){
    this.def = def; // 防御值
    this.atk = atk;  // 攻击力
    this.hp = hp;  // 血量
  }
...
}
var tony = new Man();
console.log(`当前状态 ===> ${tony}`);