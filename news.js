const api_key='39f8ddcb08c54aa99c0139f6aad529b8';
const url='https://newsapi.org/v2/everything?q=';

window.addEventListener('load',()=>fetchNews("India"));

async function fetchNews(query){
    const res= await fetch(`${url}${query}&apiKey=${api_key}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles){
    const cardContainer=document.getElementById('card-container');
    const newsCardTemplate=document.getElementById('template-news-card');

    cardContainer.innerHTML='';

    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone=newsCardTemplate.content.cloneNode(true);
        console.log(cardClone);
        fillDataincard(cardClone,article); 
        cardContainer.appendChild(cardClone);
    });

   
}

function fillDataincard(cardClone,article)
{
    const newsImage=cardClone.querySelector('#news-img');
    const newstitle=cardClone.querySelector('#news-title');
    const newsSource=cardClone.querySelector('#news-source');
    const newsDesc=cardClone.querySelector('#news-desc');


    newsImage.src=article.urlToImage;
    newstitle.innerHTML=article.title;
    newsDesc.innerHTML=article.description;

    const date=new Date(article.punblishdAt).toLocaleString("em-US",{timeZone:"Asia/Jakarta"}) ;
    newsSource.innerHTML=`${article.source.name} • ${date}`;

    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,"_blank");
    })
}
let curSelectedNav=null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem=document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav=navItem;
    curSelectedNav.classList.add('active');
}

const searchButton=document.getElementById('search-btn');
const  searchText=document.getElementById('search-text');


searchButton.addEventListener('click',()=>{
    const query=searchText.value;
    if(!query)return;
    fetchNews(query);
    curSelectedNav.classList.remove('active');
    curSelectedNav=null;
})

function reload(){
    window.location.reload();
}






