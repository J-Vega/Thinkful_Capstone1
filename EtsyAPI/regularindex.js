

const search_url = 'https://openapi.etsy.com/v2/listings/active';

function getDataFromApi(searchTerm, callback){
  const query = {
    api_key: 'oww1hu2f71dd0rs83ba669i5',
    keywords: `${searchTerm}`,
    limit: 5
    
  };
  $.getJSON(search_url,query,callback);
  
}

function renderResults(results){
  console.log(results);
  //console.log(results.snippet.title);
  return  `<a href="${results.url}"><p>${results.title}</p></a><p>$${results.price}</p>`;
}

function displaySearchData(data){
  const results = data.results.map((item,index) => renderResults(item));
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
    //queryTarget.val("");
    getDataFromApi(query,
    displaySearchData);
  });
}

$(watchSubmit);