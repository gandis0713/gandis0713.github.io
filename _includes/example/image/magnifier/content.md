___

-  적용 방법
   - 아래 그림을 **_클릭(터치)_**하고 **_상하좌우_**로 움직인다.

<script src="{{ site.baseurl }}/dev/dist/gengine.js"></script>
<script>
    const MagnifierImageWindow = gengine.default.rendering.core.window.MagnifierImageWindow;
    let container;
    let imageWindow;
    let image;
    let windowRatio = 1;
    window.addEventListener('load', function() {
        container = document.getElementById("gl_container");
        imageWindow = new MagnifierImageWindow(container);
        imageWindow.initialize(container.clientWidth, container.clientWidth * windowRatio);
        image = new Image();
        image.src = '{{ site.baseurl }}/img/about-bg.jpg';
        image.addEventListener('load', function() {
            windowRatio = image.height / image.width;
            imageWindow.setSize(container.clientWidth, container.clientWidth * windowRatio);
            imageWindow.setImage(image);
        });
    })
    window.addEventListener('resize', function() {
        if(!image) return;
        imageWindow.setSize(container.clientWidth, container.clientWidth * windowRatio);
    });
</script>
<body>
    <div id="gl_container" style="width: 100%"></div>
</body>

___