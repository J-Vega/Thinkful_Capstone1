

const youtube_search_url = 'https://www.googleapis.com/youtube/v3/search';

//search for ipod

//http://api.walmartlabs.com/v1/search?apiKey={apiKey}&lsPublisherId={Your LinkShare Publisher Id}&query=ipod

//category list - https://api.walmartlabs.com/v1/taxonomy?apiKey=cwd2qzamfg6f523deuwhuxec&format=json

//video games - "categoryId": "2636",

const search_url = 'https://api.walmartlabs.com/v1/search';

//oww1hu2f71dd0rs83ba669i5
function getDataFromApi(searchTerm, callback){
  //console.log('searching: ' +searchTerm);
  const query = {
    apiKey: 'cwd2qzamfg6f523deuwhuxec',
    query: `${searchTerm}`,

    category: 3944, //walmart category for electronics
    numItems: 5
  };
  showSections();
  $.getJSON(search_url,query,callback);
  
}

 // example https://giphy.com/gifs/mrw-boy-51Uiuy5QBZNkoF3b2Z
function renderResults(results){
  console.log('RESULTS'+results);
  return `<div class="result-block">
    <a href=${results.productUrl}>
      <p class="itemName">${results.name}</p>
        <img class="thumbnail" src='${results.mediumImage}'>
    </a>
      <p>$${results.salePrice}</p>
  </div>
   `;
}

function displaySearchData(data){
  //console.log(data);
  const results = data.items.map((item,index) => renderResults(item));
  
  $('.js-search-results-WALMART').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(event => 
  {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    
    //Clears input on submit
    queryTarget.val("");
    getDataFromApi(query,
    displaySearchData);
  });
}

$(watchSubmit);



function getDataFromApiYOUTUBE(searchTerm, callback){
  console.log(searchTerm);
  const query = {
    part: 'snippet',
    key: 'AIzaSyCn1d4mvDhmpTDGTUQewmXwbox46HljqvE',
    q: `${searchTerm} Review`   ,
    'maxResults': 6
    
  };
  $.getJSON(youtube_search_url,query,callback);
  
}

function renderResultsYOUTUBE(results){
  console.log(results);
  //console.log(results.snippet.title);
  return `
  <div class="result-block">
   
    <a class="js-result-name" href="https://www.youtube.com/watch?v=${results.id.videoId}">
    <img class="thumbnail" src="${results.snippet.thumbnails.medium.url}">
    <br><p class="videoTitle">${results.snippet.title}</p>
    </a>
    <p class ="videoAuthor">Channel: <a href=https://www.youtube.com/channel/${results.snippet.channelId}>${results.snippet.channelTitle}</p></a>
   <p class="videoDescription">${results.snippet.description}</p>
  </div>
  `;
  //https://www.youtube.com/channel/UC-ol6cvdiLjBn4FrGgvhdrA
  
}

function displayYoutubeSearchData(data){
  const results = data.items.map((item,index) => renderResultsYOUTUBE(item));
  //console.log(results);
  $('.js-search-results-YOUTUBE').html(results);
}

function watchSubmitYOUTUBE() {
  $('.js-search-form').submit(event => 
  {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    //Clears input on submit
    queryTarget.val("");
    getDataFromApiYOUTUBE(query,
    displayYoutubeSearchData);
  });
}

function watchClick(){
  $('#quickSearch1').click(event =>
  {
    // event.preventDefault();
    // const queryTarget = $(event.currentTarget).find('.quickSearch');
    // console.log(queryTarget);
    // const query = queryTarget.innerHTML;
    console.log('clicked');

    var element = document.getElementById("quickSearch1").innerHTML;//$('.quickSearch').val;
    //Clears input on submit
    console.log('clicked on '+element);
    //queryTarget.val("");
    getDataFromApi(element,displaySearchData);
    getDataFromApiYOUTUBE(element,
    displayYoutubeSearchData);
  });
  $('#quickSearch2').click(event =>
  {
    // event.preventDefault();
    // const queryTarget = $(event.currentTarget).find('.quickSearch');
    // console.log(queryTarget);
    // const query = queryTarget.innerHTML;
    console.log('clicked');

    var element = document.getElementById("quickSearch2").innerHTML;//$('.quickSearch').val;
    //Clears input on submit
    console.log('clicked on'+element);
    //queryTarget.val("");
    getDataFromApi(element,displaySearchData);
    getDataFromApiYOUTUBE(element,
    displayYoutubeSearchData);
  });
  $('#quickSearch3').click(event =>
  {
    // event.preventDefault();
    // const queryTarget = $(event.currentTarget).find('.quickSearch');
    // console.log(queryTarget);
    // const query = queryTarget.innerHTML;
    console.log('clicked');

    var element = document.getElementById("quickSearch3").innerHTML;//$('.quickSearch').val;
    //Clears input on submit
    console.log('clicked on'+element);
    //queryTarget.val("");
    getDataFromApi(element,displaySearchData);
    getDataFromApiYOUTUBE(element,
    displayYoutubeSearchData);
  });
  $('#quickSearch4').click(event =>
  {
    // event.preventDefault();
    // const queryTarget = $(event.currentTarget).find('.quickSearch');
    // console.log(queryTarget);
    // const query = queryTarget.innerHTML;
    console.log('clicked');

    var element = document.getElementById("quickSearch4").innerHTML;//$('.quickSearch').val;
    //Clears input on submit
    console.log('clicked on'+element);
    //queryTarget.val("");
    getDataFromApi(element,displaySearchData);
    getDataFromApiYOUTUBE(element,
    displayYoutubeSearchData);
  });
}

function hideSections(){
   $('h3').hide(0);
   //$('form').hide();
}
function showSections(){
   $('h3').show(0);
   //$('form').hide();
}

hideSections();

$(watchSubmitYOUTUBE);
$(watchClick);
