'use strict';

function titleClickHandler(event) {
    event.preventDefault();
    const clickedElement = this;

    const activeLinks = document.querySelectorAll('.titles a.active');
    for (let activeLink of activeLinks) {
        activeLink.classList.remove('active')
    }

    clickedElement.classList.add('active');

    const activeArticles = document.querySelectorAll('article');
    for (let activeArticle of activeArticles) {
        activeArticle.classList.remove('active')
    }

    const articleSelector = clickedElement.getAttribute('href');
    const targetArticle = document.querySelector(articleSelector);
    targetArticle.classList.add('active')
}



const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post .post-author',
    optTagsListSelector = '.tags.list',
    optCloudClassCount = 5,
    optCloudClassPrefix = 'tag-size-',
    optAuthorsListSelector = '.authors.list';

function generateTitleLinks(customSelector = '') {
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    const articles = document.querySelectorAll(optArticleSelector + customSelector);

    for (let article of articles) {
        const articleId = article.getAttribute('id');
        const articleTitle = article.querySelector(optTitleSelector).innerHTML;
        const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
        titleList.insertAdjacentHTML('beforeend', linkHTML);
    }

    const links = document.querySelectorAll('.titles a');
    for (let link of links) {
        link.addEventListener('click', titleClickHandler);
    }

}

generateTitleLinks();



function calculateTagsParams(tags) {
    const params = { max: 0, min: 999999 };

    for (let tag in tags) {
        if (tags[tag] > params.max) {
            params.max = tags[tag];
        }
        if (tags[tag] < params.min) {
            params.min = tags[tag];
        }
    }
    return params;
}



function calculateTagClass(count, params) {

    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);

    return optCloudClassPrefix + classNumber;

}



function generateTags() {
    let allTags = {};


    const articles = document.querySelectorAll('article');
    for (let article of articles) {
        const titleList = article.querySelector(optArticleTagsSelector);
        const articleTags = article.getAttribute('data-tags');

        const articleTagsArray = articleTags.split(' ');
        for (let tag of articleTagsArray) {
            const htmlLink = '<li><a href="#tag-' + tag + '"> ' + tag + '</a></li> ';
            titleList.insertAdjacentHTML('beforeend', htmlLink);

            if (!allTags.hasOwnProperty(tag)) {
                allTags[tag] = 1;
            } else {
                allTags[tag]++;
            }
        }
    }

    const tagList = document.querySelector('.tags');
    const tagsParams = calculateTagsParams(allTags);
    let allTagsHTML = '';

    for (let tag in allTags) {
        const tagLinkHTML = '<li>' + '<a class="' + calculateTagClass(allTags[tag], tagsParams) + '" ' + 'href="#tag-' + tag + '"> ' + tag + ' </a>' + '(' + allTags[tag] + ')' + '</li>'

        allTagsHTML += tagLinkHTML;
    }
    tagList.innerHTML = allTagsHTML;
}

generateTags();



function tagClickHandler(event) {
    event.preventDefault();
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const tag = href.replace('#tag-', '');

    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
    for (let activeTag of activeTags) {
        activeTag.classList.remove('active')
    }

    const tagLinks = document.querySelectorAll('a[href="' + href + '"]')
    for (let tagLink of tagLinks) {
        tagLink.classList.add('active')
    }

    generateTitleLinks('[data-tags~="' + tag + '"]');
}



function addClickListenersToTags() {
    const links = document.querySelectorAll('a[href^="#tag-"]');

    for (let link of links) {
        link.addEventListener('click', tagClickHandler)
    }
}

addClickListenersToTags();




function calculateAuthorParams(authors) {
    const params = { max: 0, min: 999999 };

    for (let authorTags in authors) {
        if (authors[authorTags] > params.max) {
            params.max = authors[authorTags];
        }
        if (authors[authorTags] < params.min) {
            params.min = authors[authorTags];
        }
    }
    return params;
}



function calculateAuthorClass(count, params) {

    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);

    return optCloudClassPrefix + classNumber;

}


function generateAuthors() {
    let allAuthors = {};

    const articles = document.querySelectorAll('article');
    for (let article of articles) {
        const authorList = article.querySelector(optArticleAuthorSelector);
        const authorTags = article.getAttribute('data-authors');
        const linkHtml = '<a href="#author-' + authorTags + '"> ' + authorTags + '</a> '
        authorList.insertAdjacentHTML('beforeend', linkHtml);

        if (!allAuthors.hasOwnProperty(authorTags)) {
            allAuthors[authorTags] = 1;
        } else {
            allAuthors[authorTags]++;
        }
    }

    const authorList = document.querySelector('.authors');
    let allAuthorTagsHTML = '';

    for (let authorTags in allAuthors){
        const authorLinkHTML = '<li>' + '<a href="#author-' + authorTags + '"> ' + authorTags + '</a> ' + ' (' + allAuthors[authorTags] + ')' + '</li>'       

        allAuthorTagsHTML += authorLinkHTML;
    }
    authorList.innerHTML = allAuthorTagsHTML;
}

generateAuthors();



function authorClickHandler(event){
    event.preventDefault();
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const authorTags = href.replace('#author-', '');

    const activeAuthorTags = document.querySelectorAll('a.active[href^="#author-"]');
    for (let activeAuthorTag of activeAuthorTags) {
        activeAuthorTag.classList.remove('active');
    }

    const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
    for (let authorLink of authorLinks) {
        authorLink.classList.add('active');
    }

    generateTitleLinks('[data-authors="' + authorTags + '"]');
}

function addClickListenersToAuthors() {
    const links = document.querySelectorAll('a[href^="#author-"]');
    for (let link of links) {
        link.addEventListener('click', authorClickHandler);
    }
}

addClickListenersToAuthors();

