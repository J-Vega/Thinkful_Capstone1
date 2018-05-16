const youtube_search_url = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback){
  const query = {
    part: 'snippet',
    key: '',
    q: `${searchTerm} Review`   ,
    'maxResults': 6
    
  };
  $.getJSON(youtube_search_url,query,callback);
  
}

function renderResults(results){
  console.log(results);
  //console.log(results.snippet.title);
  return `
  <h2>Video Reviews for ${searchTerm}</h2><div class="result-block">
   
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
  const results = data.items.map((item,index) => renderResults(item));
  //console.log(results);
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
    displayYoutubeSearchData);
  });
}

$(watchSubmit);
