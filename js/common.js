function getUrl(method){
    if (!method) throw new Error('Вы не указали метод!')
    return 'https://itunes.apple.com/search?'+method+'';
}

//отправить запрос на получение песен по введенному поиску
function sendRequest(method,callbackFunc){
    $.ajax({
        url: getUrl(method),
        method: 'GET',
        dataType: 'JSONP',
        success: callbackFunc

    });
};
//загрузить трек с API передав нужные методы
function loadTrack(term){
    sendRequest('term='+term+'&entity=musicTrack',function(data){
        drawTrackList(data.results);
        console.log(data);

    });
}

// перевод милисикунд в минуты
function Time(time) {
    let passed = parseInt(time/1000);
    minutes = (+parseInt(passed/60,0)),
    seconds = ('0'+parseInt(passed % 60,0)).slice(-2);
    return  minutes + ":" + seconds + " min ";
}
// отобразить стисок в DOM
function drawTrackList(songs){
    let html = '';
    let count = 1;
    for (let i = 0; i < songs.length; i++) {
        let s = songs[i];

        let time = Time(s.trackTimeMillis); 
        
        if (count % 2 === 0){
            html+= 
                '<div class="card even">'+
                    '<div class="card-header" id="heading'+count+'">'+
                            '<div class="mb-0">'+
                            '<button class="btn btn-link collapsed" id="plus" data-toggle="collapse" data-target="#collapse'+count+'" aria-expanded="true" aria-controls="collapse'+count+'">'+
                                    '<div class="content_list">'+
                                            '<div class="cover_artwor"><img src="'+s.artworkUrl100+'" alt=""></div>'+
                                            '<div><p>'+ s.artistName+'</p></div>'+
                                            '<div><p>'+ s.trackCensoredName+'</p></div>'+
                                            '<div><p>'+ s.collectionName+'</p></div>'+
                                            '<div><p>'+ s.primaryGenreName+'</p></div>'+
                                    '</div>'+
                                    
                                    
                            '</button>'+
                            '</div>'+
                    '</div>'+
                    '<div id="collapse'+count+'" class="collapse" aria-labelledby="heading'+count+'" data-parent="#accordion">'+
                        '<div class="card-body">'+
                            '<div class="trackCensoredName">' + s.artistName+' — '+ s.trackCensoredName+'<i class="fa fa-music" aria-hidden="true"></i></div>'+
                            '<div class="trackInfo">'+
                                '<div class="trackInfoLeft">'+
                                    '<p><span> Collection:</span> '+s.collectionName+'</p>'+
                                    '<p><span> Track Count:</span> '+s.trackCount+'</p>'+
                                    '<p><span> Track:</span>'+s.trackCensoredName+'</p>'+
                                    '<p><span> Price:</span> '+s.collectionPrice+' USD</p>'+
                                '</div>'+
                                '<div class="trackInfoRight">'+
                                    '<p><span> Track duration</span> '+time+'</span></p>'+
                                    '<p><span> Track price </span> '+s.trackPrice+' USD</p>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'
        } 
        else{
            html+= 
                '<div class="card odd">'+
                    '<div class="card-header" id="heading'+count+'">'+
                            '<div class="mb-0">'+
                            '<button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse'+count+'" aria-expanded="true" aria-controls="collapse'+count+'">'+
                                    '<div class="content_list">'+
                                            '<div class="cover_artwor"><img src="'+s.artworkUrl100+'" alt=""></div>'+
                                            '<div><p>'+ s.artistName+'</p></div>'+
                                            '<div><p>'+ s.trackCensoredName+'</p></div>'+
                                            '<div><p>'+ s.collectionName+'</p></div>'+
                                            '<div><p>'+ s.primaryGenreName+'</p></div>'+
                                    '</div>'+
                            '</button>'+
                            '</div>'+
                    '</div>'+
                    '<div id="collapse'+count+'" class="collapse" aria-labelledby="heading'+count+'" data-parent="#accordion">'+
                        '<div class="card-body">'+
                            '<div class="trackCensoredName">' + s.artistName+' — '+ s.trackCensoredName+'<i class="fa fa-music" aria-hidden="true"></i></div>'+
                            '<div class="trackInfo">'+
                                '<div class="trackInfoLeft">'+
                                    '<p><span> Collection:</span> '+s.collectionName+'</p>'+
                                    '<p><span> Track Count:</span> '+s.trackCount+'</p>'+
                                    '<p><span> Track:</span> '+s.trackCensoredName+'</p>'+
                                    '<p><span> Price:</span> '+s.collectionPrice+' USD</p>'+
                                '</div>'+
                                '<div class="trackInfoRight">'+
                                    '<p><span> Track duration:</span> '+time+'</p>'+
                                    '<p><span> Track price:</span> '+s.trackPrice+' USD</p>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'
        }
        
        
        count++;
            
    };
    $('#accordion').html(html);
}
$(document).ready(function() {
    var term = $("#search_input")[0];
    var val = term.value;
    if(val == ''){
        console.log(val);
        $('#load_list').on('click',loadTrack());
    } 
    else{
        
    }
    $("#search_input").on("change ", function() {
        let termValue = $(this).val();
        console.log(termValue); 
        $('#load_list').on('click',loadTrack(termValue));
     });
});
  