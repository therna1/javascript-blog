'use strict';

function titleClickHandler(event) {
    event.preventDefault();
    const clickedElement = this;

    const activeLinks = document.querySelectorAll('.titles a.active');
    for (let activeLink of activeLinks) {
        activeLink.classList.remove('active')
    }

    clickedElement.classList.add('active')

    const activeArticles = document.querySelectorAll('article');
    for (let activeArticle of activeArticles) {
        activeArticle.classList.remove('active')
    }

    const articleSelector = clickedElement.getAttribute('href');

    const targetArticle = document.querySelector(articleSelector)
  
    targetArticle.classList.add('active')
}



const optArticleSelector = '.post', 
  optTitleSelector = '.post-title',
  optTitleListSelector = document.querySelector('.titles');

function generateTitleLinks(){

const titleList = optTitleListSelector;
titleList.innerHTML='';

const articles = document.querySelectorAll('article')

for (let article of articles) {
const articleId = article.getAttribute('id');

const articleTitle = article.querySelector(optTitleSelector).innerHTML;

const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

optTitleListSelector.insertAdjacentHTML('beforeend', linkHTML);
}

const links = document.querySelectorAll('.titles a');
for (let link of links) {
    link.addEventListener('click', titleClickHandler); 
}
};

generateTitleLinks();
