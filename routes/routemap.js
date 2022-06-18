// var escapeHtml = require('escape-html')

app.map = function(a, route){
    route = route || '';
    for (var key in a) {
      switch (typeof a[key]) {
        case 'object': app.map(a[key], route + key); break;
        case 'function': if (verbose) console.log('%s %s', key, route);
          app[key](route, a[key]);break;
      }
    }
};
  
  var users = {
    list: function(req, res){res.send('user list');},
    get: function(req, res){  res.send('user ' +  escapeHtml(req.params.uid))},
    delete: function(req, res){ res.send('delete users'); }
  };
  
  var pets = {
    list: function(req, res){res.send('user ' + escapeHtml(req.params.uid) + '\'s pets')},
    delete: function(req, res){ res.send('delete ' + escapeHtml(req.params.uid) + '\'s pet ' + escapeHtml(req.params.pid))}
  };
  
  app.map({
    '/users': {
      get: users.list,
      delete: users.delete,
      '/:uid': {
        get: users.get,
        '/pets': {
          get: pets.list,
          '/:pid': {
            delete: pets.delete
          }
        }
      }
    }
  });