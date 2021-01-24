___

-  적용 방법
   - **_아래 그림을 클릭(터치)하고 좌우로 움직인다._**

<script src="{{ site.baseurl }}/dev/dist/gengine.js"></script>
<script>
    const SharpenImageWindow = gengine.default.rendering.core.window.SharpenImageWindow;
    let container;
    let imageWindow;
    let image;
    let windowRatio = 1;
    window.addEventListener('load', function() {
        container = document.getElementById("gl_container");
        imageWindow = new SharpenImageWindow(container);
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