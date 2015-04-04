# vimeoWidget
Framework free JS vimeo embedding widget.

### Usage

    <div class="stage">
        <div class="video"></div>
        <div class="info"></div>
        <div class="bio"></div>
    </div>
    <div class="thumbs">
        <div class="video-thumb" data-video="11213123">
            <div class="info">
                <p>An awesome video!</p>
            </div>
            <div class="bio">
                <p>By an awesome director!!</p>
            </div>
        </div>
        <div class="video-thumb" data-video="999123">
            <div class="info">
                <p>Another awesome video!</p>
            </div>
            <div class="bio">
                <p>By another awesome director!!</p>
            </div>
        </div>
    </div>

    <script src="vimeoWidget.min.js"></script>
    <script>
        vemiofy({
            video       : '.stage .video',
            detail      : '.stage .info',
            bio         : '.stage .bio',
            thumbnails  : '.thumbs .video-thumb'
        });
    </script>

### Requires
* Localstorage
* Array.forEach
* querySelectorAll
