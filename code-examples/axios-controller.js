router.get("/", (req, res) => {
    const model = home(req, res),
        advertising = new Advertising(req, res);
    advertising.get()
        .then(withArgs(model)(advertising.updateModel))
        .then(withArgs(res, model)(render))
        .catch(e => {
            advertising.error(e);
            render(res, model);
        });
});
