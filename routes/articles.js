const express = require('express');
const { createArticle, addArticle, readArticle, editArticle, deleteArticle } = require('../controllers/articles');
const router = express.Router();

router.get('/create', createArticle);
router.get('/:slug', readArticle);
router.get('/edit/:slug', editArticle);
router.get('/delete/:id', deleteArticle);
router.post('/', addArticle);


module.exports = router;