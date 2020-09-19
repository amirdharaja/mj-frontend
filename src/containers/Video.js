import React from 'react';

import $ from 'jquery';


export const Video = props => {

$(document).on('click','.js-videoPoster',function(ev) {
    ev.preventDefault();
    var $poster = $(this);
    var $wrapper = $poster.closest('.js-videoWrapper');
    videoPlay($wrapper);
  });
  
  function videoPlay($wrapper) {
    var $iframe = $wrapper.find('.js-videoIframe');
    var src = $iframe.data('src');
    $wrapper.addClass('videoWrapperActive');
    $iframe.attr('src',src);
  }

    return (
        <main>
            <div className="videoWrapper videoWrapper169 js-videoWrapper">
            {/* allowTransparency="true" */}
                <iframe className="videoIframe js-videoIframe" title='mother-juice-video' src="" frameBorder="0" allowFullScreen data-src="https://www.youtube.com/embed/bez9THENCTw?autoplay=0& modestbranding=1&rel=0&hl=sv"></iframe>
                <button className="videoPoster js-videoPoster" style={{backgroundImage: 'url(https://wallpapercave.com/wp/wp1907099.jpg)'}}
                >Play video</button>
            </div>
        </main>
    );
}


export default Video;