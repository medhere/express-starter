  
exports.sleep = (n=2000) => new Promise(r => setTimeout(r, n));  
// await sleep(2000);
// sleep(2000).then();