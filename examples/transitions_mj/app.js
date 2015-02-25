
// dom elements
var content = document.querySelector('#content');
var p = document.querySelector('#page');

// ROUTES
page.base('');
page('/', index);
page('/about', about);
page('/contact', contact);
page('*', notfound);
page();

// PAGES
function index() {
    p.textContent = 'viewing index';
}

function about() {
    p.textContent = 'viewing about';
}

function contact() {
    p.textContent = 'viewing contact';
}

function notfound() {
    p.textContent = 'not found';
}


