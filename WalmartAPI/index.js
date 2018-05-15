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
    //categoryId: 2636, //Category for video games  ****ELECTRONICS CATEGORY ALSO INCLUDES VIDEO GAMES
    category: 3944,
    numItems: 5
  };
  
  $.getJSON(search_url,query,callback);
  
}

 // example https://giphy.com/gifs/mrw-boy-51Uiuy5QBZNkoF3b2Z
function renderResults(results){
  //console.log(results);
  return `<a href=${results.productUrl}><p>${results.name}</p><img src='${results.mediumImage}'></a><p>$${results.salePrice}</p>
   `;
}

function displaySearchData(data){
  console.log(data);
  const results = data.items.map((item,index) => renderResults(item));
  
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