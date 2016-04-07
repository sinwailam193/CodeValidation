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
