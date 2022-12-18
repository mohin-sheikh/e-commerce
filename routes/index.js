module.exports = (app, express) => {
  const fs = require('fs');
  const files = fs.readdirSync('./routes');
  const filteredFiles = files.filter(e => e.indexOf('index.js') === -1);
  const router = express.Router();
  router.get('/', (req, res) => {
    res.render('index', { title: "Node Boilerplate" })
  });
  let startedService = 0;
  filteredFiles.map((e) => {
    startedService++;
    const f = require("./" + e);
    f(router);
    return f;
  });
  app.use('/api/v1', router);
};
