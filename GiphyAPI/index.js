const giphy_search_url = 'http://api.giphy.com/v1/gifs/search';


//'http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=KR173qKpVYfv9dvzExycLE59pItN6ktM&limit=5';
//?q=funny+cat&api_key=KR173qKpVYfv9dvzExycLE59pItN6ktM';

//'api.giphy.com/v1/gifs/search';
//const api_key = '&api_key=KR173qKpVYfv9dvzExycLE59pItN6ktM';
//const searchTerm = '&q=';

// Search all GIPHY GIFs for a word or phrase. Punctuation will be stripped and ignored. Use a plus or url encode for phrases. Example paul+rudd, ryan+gosling or american+psycho.

//http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=YOUR_API_KEY

function getDataFromApi(searchTerm, callback){
  //console.log('searching: ' +searchTerm);
  const query = {
    
    api_key: 'KR173qKpVYfv9dvzExycLE59pItN6ktM',
    q: `${searchTerm}`,
    limit: 5
  };
  
  $.getJSON(giphy_search_url,query,callback);
}

 // example https://giphy.com/gifs/mrw-boy-51Uiuy5QBZNkoF3b2Z
function renderResults(results){
  //console.log('rendering results...');
  //console.log(results);
  return `<img class="thumbnail" src="${results.images.downsized.url}">
   `;
}

function displaySearchData(data){
  console.log('displaying search data');
  const results = data.data.map((item,index) => renderResults(item));
  console.log(results);
  
  $('.js-search-results').html(results);
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