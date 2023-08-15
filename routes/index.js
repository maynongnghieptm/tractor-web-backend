function route(app) {
    app.use('/api/v1/tractors', require('./tractor.route'));
    app.use('/api/v1/file-config', require('./fileConfig.route'));
}

module.exports = route;