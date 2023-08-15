function route(app) {
    app.use('/api/v1/auth', require('./auth.route'));
    app.use('/api/v1/tractors', require('./tractor.route'));
    app.use('/api/v1/file-config', require('./fileConfig.route'));
    app.use('/api/v1/users', require('./user.route'));
}

module.exports = route;