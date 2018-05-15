
//https://openapi.etsy.com/v2/listings/active?api_key=oww1hu2f71dd0rs83ba669i5&keywords=fall%20giraffe;

//This is an example url, used to obtain a picture of a specific listing
// 543297256 is the listing ID (results.listing_id)
//https://openapi.etsy.com/v2/listings/543297256/images?api_key=oww1hu2f71dd0rs83ba669i5
//results[0].url_170x135

const search_url = 'https://openapi.etsy.com/v2/listings/active';

function getDataFromApi(searchTerm, callback){
  //console.log('searching: ' +searchTerm);
  const query = {
    api_key: 'oww1hu2f71dd0rs83ba669i5',
    keywords: `${searchTerm}`,
    limit: 5
  };
  
  $.getJSON(search_url,query,callback);
}

function displaySearchData(data){
  const results = data.results.map((item,index) => getImageFromListing(item));
}

function getImageFromListing(results){
  const listingURL = `https://openapi.etsy.com/v2/listings/${results.listing_id}/images`;
  let imageURL = ``;
  const imageQuery = {
     api_key: 'oww1hu2f71dd0rs83ba669i5',
   };
   $.getJSON(listingURL,imageQuery,function(event){
    //console.log('event is ' +event);
      imageURL = `${event.results[0].url_170x135}`;
      //return imageURL;
      console.log(imageURL);
      $('.js-search-results').html(renderResults(results,imageURL));
   });

  //renderResults(results,imageURL);
};

function renderResults(results,listingImage){
  console.log(listingImage);
  return `<a href="${results.url}"><p>${results.title}</p></a><p>$${results.price}</p>
  <img src="${listingImage}">`;
  //<img src="https://openapi.etsy.com/v2/listings/${results.listing_id}/images?api_key=oww1hu2f71dd0rs83ba669i5"
  //`;
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