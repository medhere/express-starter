exports.sleep = (n=2) => new Promise(r => setTimeout(r, n*1000));  
// await sleep(2);
// sleep(2).then();