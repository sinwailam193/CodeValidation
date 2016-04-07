export function checkBlackCode(result, list) {
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

export function checkWhiteCode(result, list) {
  const copy = list.slice(0);
  function recurse(current) {
    if(!current || !list) {
      return;
    }
    current.forEach(node => {
      if(node.type !== "IfStatement") {
        if(node.type === "ForStatement") {
          if(copy.indexOf(node.type) > -1) {
            copy.splice(copy.indexOf(node.type), 1);
          }
          if(node.body && node.body.body && copy.indexOf("IfStatement") > -1) {
            node.body.body.forEach(value => {
              if(value.type === "IfStatement") {
                copy.splice(copy.indexOf(value.type), 1);
              }
            });
          }
          if(node.init) {
            recurse([node.init]);
          }
        }
        if(copy.indexOf(node.type) > -1) {
          copy.splice(copy.indexOf(node.type), 1);
          if(node.body && node.body.body) {
            recurse(node.body.body);
          }
          if(node.init) {
            recurse([node.init]);
          }
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
