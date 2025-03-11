"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const pageRouter = (0, express_1.Router)();
const users = [
    { username: 'admin', password: 'admin12345' }
];
/**
 * Displays Home
 *
 * @route GET /
 * @param {Request} req
 * @param {Response} res
 * @returns {void} Renders the home page
 */
pageRouter.get('/', (req, res) => {
    res.status(200).render('index');
});
/**
 * Displays login form
 *
 * @route GET /login
 * @param {Request} req
 * @param {Response} res
 * @returns {void} Renders a page with a login form
 */
pageRouter.get('/login', (req, res) => {
    res.status(200).render('login');
});
/**
 * verify username and password by login details
 *
 * @route PUT /login
 * @param {Request} req
 * @param {Response} res
 * @returns {void} responds witg cookie & redirect
 */
pageRouter.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password == password);
    if (!user) {
        res.status(404).redirect('/login');
        return;
    }
    res.cookie("isLoggedIn", true, {
        maxAge: 5 * 60 * 1000,
        httpOnly: true,
        signed: true
    });
    res.cookie('username', username, {
        maxAge: 5 * 60 * 1000,
        httpOnly: true,
        signed: true
    });
    res.status(200).redirect('/profile');
});
/**
 * Log out user
 *
 *
 * @route GET /logout
 * @param {Request} req
 * @param {Response} res
 * @returns {void} redirects to the login
 *
 */
pageRouter.get('/logout', (req, res) => {
    res.clearCookie('isLoggedIn');
    res.clearCookie('username');
    res.status(301).redirect('/login');
});
/**
 * Get username from cookie
 *
 * @route GET /check
 * @param {Request} req
 * @param {Response} res
 * @returns {void} responds with username object
 */
pageRouter.get('/check', auth_middleware_1.checkAuth, (req, res) => {
    const { username } = req.signedCookies;
    res.status(200).json({ username });
});
/**
 * Displays protected admin page
 *
 * @route GET /profile
 * @param {Request} req
 * @param {Response} res
 * @returns {void} Renders the profile page
 */
pageRouter.get('/profile', auth_middleware_1.checkAuth, (req, res) => {
    res.status(200).render('profile');
});
exports.default = pageRouter;
