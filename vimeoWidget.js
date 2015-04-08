var vemiofy = function (options, callback) {
    'use strict';

    var loadedCounter = 0,
        doc = document,
        win = window,
        data = {},
        cached,
        thumbs,
        detail,
        video,
        bio;


    // Does UA support us?
    if (!doc || !doc.querySelector || !Array.forEach || !win.localStorage || !options) {
        return;
    }


    // querySelectorAll
    function q$(selector, context) {
        if (typeof selector === 'string') {
            return [].slice.call((context || doc).querySelectorAll(selector));
        }
        return [selector];
    }


    // AJAX
    function XHR(uri, callback) {
        var X = new XMLHttpRequest();

        X.open('GET', uri, true);

        X.onreadystatechange = function () {
            if (X.readyState !== 4 || X.status !== 200) {
                return;
            }

            callback(X.responseText);
        };

        X.send();
    }


    // Show a video
    function showVid(vID) {
        var videoData = data[vID],
            el = videoData.el;

        detail.innerHTML = q$('.info', el)[0].innerHTML;
        bio.innerHTML = q$('.bio', el)[0].innerHTML;
        video.innerHTML = videoData.html;

        if (win.jQuery && win.jQuery.fn.fitVids) {
            $(options.video).fitVids();
        }
    }


    // Populate thumbs
    function populateThumb(obj) {
        var el = q$(options.thumbnails + '[data-video="' + obj.video_id + '"]')[0],
            str = '<h2 class="vimeo_title">' + obj.title + '</h2><img class="vimeo_img" src="' + obj.thumbnail_url + '" alt="' + obj.title.toString().split('"').join('\'') + '"><p class="vimeo_description">' + obj.description + '</p>',
            tmb = doc.createElement('section');

        tmb.className = 'vimeo-tmb';
        tmb.innerHTML = str;
        el.appendChild(tmb);

        obj.el = el;

        el.addEventListener('click', function () {
            showVid(obj.video_id);
        });
    }


    // Download data
    function getData() {
        Object.keys(data).forEach(function (key) {
            XHR('https://vimeo.com/api/oembed.json?url=https://vimeo.com/' + key, function (response) {
                var obj;

                try {
                    obj = JSON.parse(response);
                    data[key] = obj;
                    populateThumb(obj);

                    loadedCounter = loadedCounter + 1;

                    if (loadedCounter === Object.keys(data).length) {
                        win.localStorage.setItem('vimeoData', JSON.stringify(data));
                    }
                } catch (ignore) {}
            });
        });
    }


    thumbs = q$(options.thumbnails) || [];
    detail = q$(options.detail)[0];
    video = q$(options.video)[0];
    bio = q$(options.bio)[0];


    // Get video refs
    thumbs.forEach(function (el) {
        data[el.getAttribute('data-video')] = {};
    });


    // Build thumbs
    cached = win.localStorage.getItem('vimeoData');
    if (cached) {
        try {
            data = JSON.parse(cached);

            Object.keys(data).forEach(function (key) {
                populateThumb(data[key]);
            });
        } catch (e) {
            getData();
        }
    } else {
        getData();
    }
};