

const youtube_search_url = 'https://www.googleapis.com/youtube/v3/search';

const search_url = 'https://api.walmartlabs.com/v1/search';
let walmartData;


function getDataFromApi(searchTerm, callback){
  //console.log('searching: ' +searchTerm);
  const query = {
    apiKey: '',
    query: `${searchTerm}`,

    category: 3944, //walmart category for electronics
    numItems: 5
  };
  showSections();
  $.getJSON(search_url,query,callback);
  
}

 // example https://giphy.com/gifs/mrw-boy-51Uiuy5QBZNkoF3b2Z
function renderResults(results){
  //console.log('RESULTS'+results);
  return `<div class="result-block">
      <input type="button" class="clickable itemNameButton" value="${results.name}">
      <div class = "image">
        <img class="thumbnail clickable" src='${results.mediumImage}'>
      </div>
      <p>$${results.salePrice}</p>
  </div>
   `;// line 26 <a href=${results.productUrl}>   line 29 </a>
}

function displaySearchData(data){
  //console.log(data);
  const results = data.items.map((item,index) => renderResults(item));
  console.log("data is"+walmartData);
  $('.js-search-results-WALMART').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(event => 
  {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    walmartData = query;
    //Clears input on submit
    //queryTarget.val("");
    getDataFromApi(query,
    displaySearchData);
  });
}

$(watchSubmit);



function getDataFromApiYOUTUBE(searchTerm, callback){
  //console.log(searchTerm);
  const query = {
    part: 'snippet',
    key: '',
    q: `${searchTerm}`   ,
    'maxResults': 6
    
  };
  $.getJSON(youtube_search_url,query,callback);
  
}

function renderResultsYOUTUBE(results){
  //console.log(results);
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
    console.log('querytarget is' +queryTarget);
    const query = queryTarget.val();
    console.log('query is' +query);
    //Clears input on submit
    queryTarget.val("");
    getDataFromApiYOUTUBE(query,
    displayYoutubeSearchData);
  });
}

function watchClick(){
  $('#quickSearch1').click(event =>
  {
   

    var element = document.getElementById("quickSearch1").innerHTML;//$('.quickSearch').val;
    walmartData = element;
    getDataFromApi(element,displaySearchData);
    getDataFromApiYOUTUBE(element,
    displayYoutubeSearchData);
  });
  $('#quickSearch2').click(event =>
  {
    
    

    var element = document.getElementById("quickSearch2").innerHTML;//$('.quickSearch').val;
    walmartData = element;
    getDataFromApi(element,displaySearchData);
    getDataFromApiYOUTUBE(element,
    displayYoutubeSearchData);
  });
  $('#quickSearch3').click(event =>
  {
    
    

    var element = document.getElementById("quickSearch3").innerHTML;//$('.quickSearch').val;
    walmartData = element;
    getDataFromApi(element,displaySearchData);
    getDataFromApiYOUTUBE(element,
    displayYoutubeSearchData);
  });
  $('#quickSearch4').click(event =>
  {
    
    

    var element = document.getElementById("quickSearch4").innerHTML;//$('.quickSearch').val;
    walmartData = element;
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

//Click on box to display pop up window, containing more info about the product
$(function() {
    $(".clickForPopUp").on("click",".result-block",function() {
      console.log(this);

      //store item name from HTML element into var
      var itemName = document.getElementsByClassName("itemNameButton");
      //store url from HTML element
      var imageURL = document.querySelector('.thumbnail').src;
      //$("#popUpWindow").text($(this).val().trim());
        //place item name into modal's popUpText class
        $(".popUpText").text($(itemName).val().trim());

        //console.log($("#popUpWindow").text($(this).val().trim()));
        //insert image URL into modal's copied image placeholder
        $('.copiedimages').append(displayItemImage(imageURL));

        $("#popUpWindow").show(500);
    });
    $("#btnOK").click(function() {
        //$("#valueFromMyModal").val($("#myform input[type=text]").val().trim());
        $("#popUpWindow").hide(400);
    });
});

function displayItemImage(imageURL){
  return ` <img src=${imageURL}> `;
}

$(watchSubmitYOUTUBE);
$(watchClick);
