class TestAppController {
    async get(req, res) {
        res.send("Server started and DB is ready");
    }
}

module.exports = { TestAppController };