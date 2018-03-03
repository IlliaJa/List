'use strict';

class Node {
  constructor(list, data) {
    this.list = list;
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

class List {
  constructor() {
    this.last = null;
    this.first = null;
    this.length = 0;
  }

  push(data) {
    const element = new Node(this, data);
    if (this.last) {
      const prev = this.last;
      element.prev = prev;
      this.last = element;
      prev.next = element;
    } else {
      this.last = element;
      this.first = element;
    }
    this.length = this.length + 1;
    return element;
  }

  pop() {
    if (this.last !== this.first) {
      const prev = this.last.prev;
      this.last = this.last.prev;
      prev.next = null;
    } else {
      this.last = null;
      this.first = null;
    }
    this.length = this.length - 1;
  }

  [Symbol.iterator]() {
    let element = this.first;
    return {
      next() {
        this.current = element;
        if (!this.current) {
          return {
            value: null,
            done: true
          };
        }
        element = element.next;
        return {
          value: this.current.data,
          done: false
        };
      }
    };
  }

  insert(index, data) {
    if(index > this.length || index <= 1){
      throw new Error('Input correct index or use push/pop/shift/unshift')
    }
    const node = new Node(this, data);
    let element = this.first;
    for(let i = 0; i < index -2; i++){
      element = element.next
    }
    let prev = element;
    let next = prev.next;
    node.next = next;
    node.prev = prev;
    prev.next = node;
    next.prev = node;
    return node;
  }

  delete(index) {
    let element = this.first;
    const prev = element.prev;
    const next = element.next;
    if (prev) prev.next = next;
    if (next) next.prev = prev;
    if (index === this.length) {
      this.last = this.last.prev;
    }
    if (index === 1) this.first = this.first.next;
    this.length = this.length - 1;

    return element;
  }

  shift() {
     if (this.first !== this.last) {
      const next = this.first.next;
      this.first = this.first.next;
      next.prev = null;
      this.length = this.length - 1;
    } else {
      this.first = null;
      this.last = null;
    }
  }

  unshift(data) {
     const element = new Node(this, data);
    if (this.first) {
      const next = this.first;
      element.next = next;
      this.first = element;
      next.prev = element;
    } else {
      this.last = element;
      this.first = element;
    }
    this.length = this.length + 1;
    return element;
  }

  clone() {
    const newlist = new List();
    let element = this.first;
    while (element) {
      newlist.push(element.data);
      element = element.next;
    }
    return newlist;
  }

  tostring() {
    const next = '  ↓', prev = '↑  ';
    let tab = '';
    for (const element of this) {
      // why it output " [object object] " ?
      console.log(tab + prev + element.toString() + next);
      tab += '   ';
    }
  }
}

class CycleList extends List{
  
  do(){
    this.last.next = this.first;
    this.first.prev = this.last;
    return this.last;
  }
  lengthO() {
    let rabbit = this.first;
    let turtle = this.first;
    let len = 0;
    do {
      rabbit = rabbit.next;
      rabbit = rabbit.next;
      turtle = turtle.next;
      len++;      
    } while(rabbit !== turtle);
    return len;
  }
};


// Usage

const obj1 = { name: 'first' };
const obj2 = { name: 'second' };
const obj3 = { name: 'third' };
const obj4 = { name: 'forth' };

const cyclelist = new CycleList();
const list = new List();


// list.push(obj1);
// list.push(obj2);
// list.push(obj3);
// list.insert(3, obj3);
// list.pop();
// list.delete(1);
// list.unshift(obj3);
// list.unshift(obj2);
// list.unshift(obj1);
// list.shift()
// const list1 = list.clone();
// console.dir(list, { depth: 10 });


cyclelist.push(obj1);
cyclelist.push(obj2);
cyclelist.push(obj3);

// cyclelist.do();
console.dir(cyclelist, {depth: 4});
// for (const element of cyclelist) {
//   console.log(element);
// }