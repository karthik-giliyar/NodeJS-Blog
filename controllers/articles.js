const { articleModel } = require('../models/articles');

exports.createArticle = (req, res) => {
    return res.render('createArticle', {article: new articleModel()});
}

exports.addArticle = async(req, res) => {
    const { title, description, markdown } = req.body;
    let article = {
        title,
        description,
        markdown
    }

    let articlesObj = new articleModel(article);
    try{
        await articlesObj.save()
        return res.redirect('/');
    }catch(err){
        console.log(err);
        return res.redirect('/articles/create');
    }

}

exports.readArticle = async(req, res) => {
    try{
        let article = await articleModel.findOne({slug: req.params.slug});
        if(article === null ) return res.redirect('/')
        res.render('readArticle', {
            article: article
        });
    }
    catch(err){
        return res.redirect('/');
    }    
}


exports.editArticle = async(req, res) => {
    try{
        let article = await articleModel.findOne({slug: req.params.slug});
        if(article === null ) return res.redirect('/')
        res.render('editArticle', {
            article: article
        });
    }
    catch(err){
        return res.redirect('/');
    }    
}

exports.deleteArticle = async(req, res) => {
    try{
        let article = await articleModel.findByIdAndDelete(req.params.id);
        if(article === null ) return res.redirect('/')
        res.redirect('/');
    }
    catch(err){
        return res.redirect('/');
    }    
}

