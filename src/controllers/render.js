module.exports = {
    renderHome: (req, res) => {
        res.render("home", {
            js: 'home.js',
            style: 'home.css',
            header_style: "header.css",
            footer_style: "footer.css"
        });
    }
}