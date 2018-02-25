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
  }

  lenght() {
    let l = 0;
    let a = {};
    if (this.last !== null) {
      a = this.last;
      l++;
      while (a.prev !== null) {
        a = a.prev;
        l++;
      }
    }
    return l;
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
    const ins = new Node(this, data);
    let element = this.last;
    function  check(prev, ins) {
      if (!prev) {
        this.first = ins;
      } else {
        prev.next = ins;
        ins.prev = prev;
      }
    }
    if (index - 1 === this.lenght()) {
      const prev = element;
      check(prev, ins, this.first);
      this.last = ins;
      return ins;
    } else {
      for (let i = 0; i < this.lenght() - index; i++) {
        element = element.prev;
      }
      const prev = element.prev;
      check(prev, ins, this.first);
      element.prev = ins;
      ins.next = element;
      return element;
    }

  }

  delete(index) {
    let i = 0;
    let element = this.last;
    for (i; i < this.lenght() - index; i++) {
      element = element.prev;
    }
    const prev = element.prev;
    const next = element.next;
    if (prev) prev.next = next;
    if (next) next.prev = prev;
    if (index === this.lenght()) {

      this.last = this.last.prev;
    }
    if (index === 1) this.first = this.first.next;
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

// Usage

const obj1 = { name: 'first' };
const obj2 = { name: 'second' };
const obj3 = { name: 'third' };
const obj4 = { name: 'forth' };

const list = new List();
list.push(obj1);
list.push(obj2);
list.push(obj3);
list.insert(4, obj4);
list.pop();
list.delete(1);
const list1 = list.clone();
console.dir(list1, { depth: 10 });


// for (const element of list) {
//   console.log(element);
// }
