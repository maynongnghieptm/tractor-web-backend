function route(app) {
    app.use('/api/v1/auth', require('./auth.route'));
    app.use('/api/v1/tractors', require('./tractor.route'));
    app.use('/api/v1/file-config', require('./fileConfig.route'));
    app.use('/api/v1/users', require('./user.route'));
    app.use('/api/v1/logs', require('./logs.route'));
    app.use('/api/v1/fields', require('./fields.route'));
    app.use('/api/v1/commands', require('./command.route'));
}

module.exports = route;