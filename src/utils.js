export function checkCode(result, list) {
  const copy = list.slice(0);
  function recurse(current) {
    if(!current || !copy) {
      return;
    }
    current.forEach(node => {
      if(copy.indexOf(node.type) > -1) {
        copy.splice(copy.indexOf(node.type), 1);
        if(node.body && node.body.body) {
          recurse(node.body.body);
        }
        if(node.init) {
          recurse([node.init]);
        }
      }
      else {
        if(node.body && node.body.body) {
          recurse(node.body.body);
        }
        if(node.init) {
          recurse([node.init]);
        }
      }
    });
  }
  recurse(result);
  return copy;
}

function valueToArr(head) {
  let current = head, arr = [];
  while(current) {
    arr.push(current.value);
    current = current.next;
  }
  return arr;
}

export function checkStructure(result, structure) {
  let obj = {};
  let arr = valueToArr(structure);
  function recurse(current, currentList) {
    if(!current || !currentList || !arr) {
      return ;
    }
    current.forEach(node => {
      if(node.type === currentList.value) {
        if(arr.indexOf(node.type) > -1) {
          arr.splice(arr.indexOf(node.type), 1);
        }
        if(node.body && node.body.body) {
          recurse(node.body.body, currentList.next);
        }
      }
    });
  }
  recurse(result, structure);
  return arr;
}
