---
layout: default
title: "PNG Viwer"
---

---

<!-- <!DOCTYPE html> -->
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PNG 뷰어</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }

        .container {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(10px);
            max-width: 1200px;
            width: 100%;
            text-align: center;
        }

        .title {
            font-size: 2.5rem;
            color: #333;
            margin-bottom: 10px;
            font-weight: 700;
        }

        .subtitle {
            color: #666;
            margin-bottom: 40px;
            font-size: 1.1rem;
        }

        .drop-zone {
            border: 3px dashed #667eea;
            border-radius: 15px;
            padding: 60px 20px;
            margin: 20px 0;
            background: rgba(102, 126, 234, 0.05);
            transition: all 0.3s ease;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }

        .drop-zone:hover {
            border-color: #764ba2;
            background: rgba(118, 75, 162, 0.1);
            transform: translateY(-2px);
        }

        .drop-zone.drag-over {
            border-color: #4CAF50;
            background: rgba(76, 175, 80, 0.1);
            transform: scale(1.02);
        }

        .drop-icon {
            font-size: 4rem;
            color: #667eea;
            margin-bottom: 20px;
            display: block;
        }

        .drop-text {
            font-size: 1.2rem;
            color: #555;
            margin-bottom: 10px;
            font-weight: 600;
        }

        .drop-subtext {
            color: #888;
            font-size: 0.9rem;
        }

        .image-preview {
            margin-top: 30px;
            display: none;
            animation: fadeIn 0.5s ease;
        }

        .controls {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 30px;
            margin-bottom: 20px;
            flex-wrap: wrap;
        }

        .control-group {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .control-group label {
            font-weight: 600;
            color: #333;
        }

        .background-selector {
            display: flex;
            gap: 5px;
            align-items: center;
        }

        .bg-option {
            width: 40px;
            height: 40px;
            border: 3px solid #ddd;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
        }

        .bg-option:hover {
            border-color: #667eea;
            transform: scale(1.1);
        }

        .bg-option.active {
            border-color: #667eea;
            box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.3);
        }

        .bg-checkerboard {
            background-image: 
                linear-gradient(45deg, #ccc 25%, transparent 25%), 
                linear-gradient(-45deg, #ccc 25%, transparent 25%), 
                linear-gradient(45deg, transparent 75%, #ccc 75%), 
                linear-gradient(-45deg, transparent 75%, #ccc 75%);
            background-size: 10px 10px;
            background-position: 0 0, 0 5px, 5px -5px, -5px 0px;
        }

        .bg-white {
            background-color: white;
        }

        .bg-black {
            background-color: black;
        }

        .zoom-controls {
            display: flex;
            align-items: center;
            gap: 10px;
            background: rgba(102, 126, 234, 0.1);
            padding: 10px 15px;
            border-radius: 25px;
        }

        .zoom-level {
            font-weight: 600;
            color: #333;
            min-width: 80px;
            text-align: center;
            background: white;
            padding: 8px 12px;
            border-radius: 15px;
            border: 2px solid #667eea;
        }

        .reset-btn {
            background: #667eea;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 15px;
            cursor: pointer;
            font-size: 0.9rem;
            transition: all 0.3s ease;
            font-weight: 600;
        }

        .reset-btn:hover {
            background: #5a67d8;
            transform: scale(1.05);
        }

        .image-viewer {
            position: relative;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            max-height: 600px;
            overflow: auto;
            background: #f5f5f5;
            cursor: grab;
        }

        .image-viewer.panning {
            cursor: grabbing;
        }

        .image-container {
            position: relative;
            display: inline-block;
            transition: transform 0.2s ease;
            transform-origin: top left;
        }

        .pixel-grid {
            position: absolute;
            top: 0;
            left: 0;
            pointer-events: none;
            z-index: 3;
            opacity: 0.4;
        }

        .image-background {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
        }

        .image-background.checkerboard {
            background-image: 
                linear-gradient(45deg, #ccc 25%, transparent 25%), 
                linear-gradient(-45deg, #ccc 25%, transparent 25%), 
                linear-gradient(45deg, transparent 75%, #ccc 75%), 
                linear-gradient(-45deg, transparent 75%, #ccc 75%);
            background-size: 20px 20px;
            background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
        }

        .image-background.white {
            background-color: white;
        }

        .image-background.black {
            background-color: black;
        }

        .preview-image {
            max-width: none;
            max-height: none;
            width: auto;
            height: auto;
            object-fit: contain;
            position: relative;
            z-index: 2;
            cursor: crosshair;
            display: block;
        }

        .upload-btn {
            background: linear-gradient(45deg, #4CAF50, #45a049);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 25px;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 600;
            margin: 0 10px;
        }

        .upload-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(76, 175, 80, 0.4);
        }

        .info-container {
            display: flex;
            justify-content: center;
            margin-top: 20px;
        }

        .image-info {
            padding: 20px;
            background: rgba(102, 126, 234, 0.1);
            border-radius: 10px;
            text-align: left;
            max-width: 400px;
            width: 100%;
        }

        .info-title {
            font-weight: 600;
            color: #333;
            margin-bottom: 10px;
            font-size: 1.1rem;
        }

        .info-item {
            margin: 8px 0;
            color: #555;
            font-family: 'Courier New', monospace;
        }

        .pixel-info {
            background: rgba(118, 75, 162, 0.1);
            min-height: 200px;
            display: flex;
            flex-direction: column;
        }

        .color-preview {
            width: 60px;
            height: 60px;
            border: 2px solid #333;
            border-radius: 8px;
            margin: 10px 0;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }

        .pixel-coordinates {
            font-weight: 600;
            color: #764ba2;
            margin-bottom: 10px;
        }

        .clear-btn {
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 25px;
            font-size: 1rem;
            cursor: pointer;
            margin: 10px;
            transition: all 0.3s ease;
            font-weight: 600;
        }

        .clear-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }

        .error-message {
            background: #ffebee;
            color: #c62828;
            padding: 15px;
            border-radius: 8px;
            margin: 20px 0;
            display: none;
            border-left: 4px solid #c62828;
        }

        .no-pixel-selected {
            color: #888;
            font-style: italic;
            text-align: center;
            margin-top: 50px;
        }

        .drag-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(102, 126, 234, 0.8);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            backdrop-filter: blur(5px);
        }

        .drag-overlay.active {
            display: flex;
        }

        .drag-message {
            background: white;
            padding: 40px;
            border-radius: 20px;
            text-align: center;
            font-size: 1.5rem;
            color: #333;
            font-weight: 600;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }

        .pixel-popup {
            position: fixed;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 15px;
            border-radius: 10px;
            font-size: 0.85rem;
            font-family: 'Courier New', monospace;
            z-index: 1000;
            pointer-events: auto;
            backdrop-filter: blur(10px);
            border: 2px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            min-width: 200px;
            animation: popupFadeIn 0.2s ease;
            cursor: move;
        }

        .pixel-popup .popup-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            padding-bottom: 8px;
        }

        .pixel-popup .popup-close {
            background: rgba(255, 255, 255, 0.2);
            border: none;
            color: white;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.3s ease;
        }

        .pixel-popup .popup-close:hover {
            background: rgba(255, 255, 255, 0.4);
        }

        .pixel-popup .popup-coords {
            font-weight: bold;
            color: #4CAF50;
            margin-bottom: 8px;
        }

        .pixel-popup .popup-color {
            width: 40px;
            height: 40px;
            border: 2px solid white;
            border-radius: 6px;
            margin: 8px 0;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }

        .pixel-popup .popup-values {
            line-height: 1.4;
        }

        .pixel-popup .popup-values div {
            margin: 4px 0;
        }

        .pixel-highlight {
            position: absolute;
            background: rgba(255, 0, 0, 0.3);
            border: 1px solid #ff0000;
            z-index: 4;
            pointer-events: none;
            box-sizing: border-box;
        }

        @keyframes popupFadeIn {
            from {
                opacity: 0;
                transform: scale(0.8) translateY(10px);
            }
            to {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
        }

        @keyframes pixelBlink {
            0% { opacity: 0; transform: scale(1.2); }
            50% { opacity: 1; transform: scale(1.05); }
            100% { opacity: 1; transform: scale(1); }
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
                transform: translateY(0);
            }
            40% {
                transform: translateY(-10px);
            }
            60% {
                transform: translateY(-5px);
            }
        }

        .bounce {
            animation: bounce 0.6s;
        }

        @media (max-width: 768px) {
            .controls {
                flex-direction: column;
                gap: 15px;
            }

            .container {
                padding: 20px;
            }

            .title {
                font-size: 2rem;
            }
        }
    </style>
</head>
<body>
    <div class="drag-overlay" id="dragOverlay">
        <div class="drag-message">
            🖼️ PNG 파일을 여기에 드롭하세요
        </div>
    </div>

    <div class="container">
        <h1 class="title">🖼️ PNG 뷰어</h1>
        <p class="subtitle">PNG 파일을 드래그 앤 드롭하여 즉시 확인하고 픽셀 정보를 분석하세요</p>
        
        <div class="drop-zone" id="dropZone">
            <div class="drop-icon">📁</div>
            <div class="drop-text">여기에 PNG 파일을 드래그하세요</div>
            <div class="drop-subtext">또는 클릭하여 파일을 선택하세요</div>
            <input type="file" id="fileInput" accept=".png,image/png" style="display: none;">
        </div>

        <div class="error-message" id="errorMessage"></div>

        <div class="image-preview" id="imagePreview">
            <div class="controls">
                <div class="control-group">
                    <label>투명 배경:</label>
                    <div class="background-selector">
                        <div class="bg-option bg-checkerboard active" data-bg="checkerboard" title="체크무늬"></div>
                        <div class="bg-option bg-white" data-bg="white" title="흰색"></div>
                        <div class="bg-option bg-black" data-bg="black" title="검은색"></div>
                    </div>
                </div>

                <div class="control-group">
                    <label>확대/축소:</label>
                    <div class="zoom-controls">
                        <div class="zoom-level" id="zoomLevel">100%</div>
                        <button class="reset-btn" id="resetZoom" title="원본 크기">리셋</button>
                    </div>
                </div>

                <button class="upload-btn" id="uploadBtn">새 파일 업로드</button>
            </div>

            <div class="image-viewer" id="imageViewer">
                <div class="image-container" id="imageContainer">
                    <div class="image-background checkerboard" id="imageBackground"></div>
                    <img id="previewImage" class="preview-image" alt="업로드된 PNG 이미지">
                    <svg class="pixel-grid" id="pixelGrid" style="display: none;"></svg>
                    <div class="pixel-highlight" id="pixelHighlight" style="display: none;"></div>
                    <canvas id="hiddenCanvas" style="display: none;"></canvas>
                </div>
            </div>

            <div class="info-container">
                <div class="image-info" id="imageInfo">
                    <div class="info-title">📋 파일 정보</div>
                    <div class="info-item" id="fileName"></div>
                    <div class="info-item" id="fileSize"></div>
                    <div class="info-item" id="imageDimensions"></div>
                    <div class="info-item" id="fileType"></div>
                </div>
            </div>

            <button class="clear-btn" id="clearBtn">초기화</button>
        </div>
    </div>

    <script>
        const dropZone = document.getElementById('dropZone');
        const fileInput = document.getElementById('fileInput');
        const imagePreview = document.getElementById('imagePreview');
        const previewImage = document.getElementById('previewImage');
        const imageBackground = document.getElementById('imageBackground');
        const imageContainer = document.getElementById('imageContainer');
        const hiddenCanvas = document.getElementById('hiddenCanvas');
        const errorMessage = document.getElementById('errorMessage');
        const clearBtn = document.getElementById('clearBtn');
        const uploadBtn = document.getElementById('uploadBtn');
        const dragOverlay = document.getElementById('dragOverlay');
        const zoomLevel = document.getElementById('zoomLevel');
        const resetZoomBtn = document.getElementById('resetZoom');
        const imageViewer = document.getElementById('imageViewer');
        const pixelGrid = document.getElementById('pixelGrid');
        const pixelHighlight = document.getElementById('pixelHighlight');

        let currentImageData = null;
        let currentZoom = 1;
        const minZoom = 0.1;
        const maxZoom = 20;
        const zoomStep = 0.1;
        let isPanning = false;
        let lastPanX = 0;
        let lastPanY = 0;
        let pixelPopup = null;
        let selectedPixel = null;

        // 패닝(드래그) 기능
        let startX, startY, scrollLeft, scrollTop;

        // 마우스 우클릭 패닝
        imageViewer.addEventListener('mousedown', (e) => {
            if (e.button === 2) { // 우클릭
                e.preventDefault();
                isPanning = true;
                imageViewer.classList.add('panning');
                startX = e.pageX - imageViewer.offsetLeft;
                startY = e.pageY - imageViewer.offsetTop;
                scrollLeft = imageViewer.scrollLeft;
                scrollTop = imageViewer.scrollTop;
            }
        });

        imageViewer.addEventListener('mousemove', (e) => {
            if (!isPanning) return;
            e.preventDefault();
            const x = e.pageX - imageViewer.offsetLeft;
            const y = e.pageY - imageViewer.offsetTop;
            const walkX = (x - startX) * 2;
            const walkY = (y - startY) * 2;
            imageViewer.scrollLeft = scrollLeft - walkX;
            imageViewer.scrollTop = scrollTop - walkY;
        });

        imageViewer.addEventListener('mouseup', (e) => {
            if (e.button === 2) {
                isPanning = false;
                imageViewer.classList.remove('panning');
            }
        });

        // 우클릭 컨텍스트 메뉴 방지
        imageViewer.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });

        // 트랙패드 및 마우스 휠 이벤트 처리
        imageViewer.addEventListener('wheel', (e) => {
            e.preventDefault();
            
            // 트랙패드 핀치 줌 감지 (ctrlKey가 true일 때)
            if (e.ctrlKey || e.metaKey) {
                // 핀치 줌
                const rect = imageViewer.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const mouseY = e.clientY - rect.top;
                
                const delta = e.deltaY;
                const zoomFactor = delta > 0 ? 0.95 : 1.05; // 더 부드러운 줌
                
                const newZoom = Math.min(Math.max(currentZoom * zoomFactor, minZoom), maxZoom);
                
                if (newZoom !== currentZoom) {
                    const zoomRatio = newZoom / currentZoom;
                    const containerRect = imageContainer.getBoundingClientRect();
                    const offsetX = mouseX - containerRect.left;
                    const offsetY = mouseY - containerRect.top;
                    
                    currentZoom = newZoom;
                    updateZoom();
                    
                    imageViewer.scrollLeft += (offsetX * (zoomRatio - 1));
                    imageViewer.scrollTop += (offsetY * (zoomRatio - 1));
                }
            }
            // 트랙패드 두 손가락 스크롤 (패닝)
            else if (Math.abs(e.deltaX) > 0 || Math.abs(e.deltaY) > 0) {
                // deltaX가 있으면 수평 스크롤, deltaY가 있으면 수직 스크롤
                if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
                    // 주로 수평 이동
                    imageViewer.scrollLeft += e.deltaX;
                } else {
                    // 수직 이동이 우세하면
                    if (e.shiftKey) {
                        // Shift + 스크롤은 수평 이동
                        imageViewer.scrollLeft += e.deltaY;
                    } else {
                        // 일반 스크롤은 수직 이동
                        imageViewer.scrollTop += e.deltaY;
                    }
                }
            }
        }, { passive: false });

        // 터치 이벤트 처리 (모바일/터치패드)
        let initialDistance = 0;
        let lastTouchTime = 0;
        let touches = {};

        imageViewer.addEventListener('touchstart', (e) => {
            e.preventDefault();
            
            if (e.touches.length === 2) {
                // 두 손가락 터치 시작
                const touch1 = e.touches[0];
                const touch2 = e.touches[1];
                
                touches.startX1 = touch1.clientX;
                touches.startY1 = touch1.clientY;
                touches.startX2 = touch2.clientX;
                touches.startY2 = touch2.clientY;
                
                initialDistance = Math.hypot(
                    touch2.clientX - touch1.clientX,
                    touch2.clientY - touch1.clientY
                );
                
                touches.centerX = (touch1.clientX + touch2.clientX) / 2;
                touches.centerY = (touch1.clientY + touch2.clientY) / 2;
                touches.startScrollLeft = imageViewer.scrollLeft;
                touches.startScrollTop = imageViewer.scrollTop;
            }
        });

        imageViewer.addEventListener('touchmove', (e) => {
            e.preventDefault();
            
            if (e.touches.length === 2) {
                const touch1 = e.touches[0];
                const touch2 = e.touches[1];
                
                // 현재 거리 계산 (줌용)
                const currentDistance = Math.hypot(
                    touch2.clientX - touch1.clientX,
                    touch2.clientY - touch1.clientY
                );
                
                // 현재 중심점 계산 (패닝용)
                const currentCenterX = (touch1.clientX + touch2.clientX) / 2;
                const currentCenterY = (touch1.clientY + touch2.clientY) / 2;
                
                // 핀치 줌 처리
                if (initialDistance > 0) {
                    const scale = currentDistance / initialDistance;
                    const newZoom = Math.min(Math.max(currentZoom * scale, minZoom), maxZoom);
                    
                    if (Math.abs(newZoom - currentZoom) > 0.01) {
                        const rect = imageViewer.getBoundingClientRect();
                        const zoomCenterX = touches.centerX - rect.left;
                        const zoomCenterY = touches.centerY - rect.top;
                        
                        const zoomRatio = newZoom / currentZoom;
                        const containerRect = imageContainer.getBoundingClientRect();
                        const offsetX = zoomCenterX - containerRect.left;
                        const offsetY = zoomCenterY - containerRect.top;
                        
                        currentZoom = newZoom;
                        initialDistance = currentDistance; // 업데이트
                        updateZoom();
                        
                        imageViewer.scrollLeft += (offsetX * (zoomRatio - 1));
                        imageViewer.scrollTop += (offsetY * (zoomRatio - 1));
                    }
                }
                
                // 패닝 처리 (중심점 이동)
                const deltaX = currentCenterX - touches.centerX;
                const deltaY = currentCenterY - touches.centerY;
                
                imageViewer.scrollLeft = touches.startScrollLeft - deltaX;
                imageViewer.scrollTop = touches.startScrollTop - deltaY;
            }
        });

        imageViewer.addEventListener('touchend', (e) => {
            e.preventDefault();
            touches = {};
            initialDistance = 0;
        });

        // 줌 리셋 기능
        resetZoomBtn.addEventListener('click', () => {
            currentZoom = 1;
            updateZoom();
            imageViewer.scrollLeft = 0;
            imageViewer.scrollTop = 0;
        });

        function updateZoom() {
            imageContainer.style.transform = `scale(${currentZoom})`;
            zoomLevel.textContent = `${Math.round(currentZoom * 100)}%`;
            
            // 픽셀 그리드 업데이트
            updatePixelGrid();
            
            // 선택된 픽셀 하이라이트 업데이트
            if (selectedPixel) {
                showPixelHighlight(selectedPixel.x, selectedPixel.y);
            }
        }

        function updatePixelGrid() {
            if (!previewImage.src) return;
            
            // 줌이 800% 이상일 때 픽셀 그리드 표시
            if (currentZoom >= 8) {
                showPixelGrid();
            } else {
                hidePixelGrid();
            }
        }

        function showPixelGrid() {
            const width = previewImage.naturalWidth;
            const height = previewImage.naturalHeight;
            
            pixelGrid.style.display = 'block';
            pixelGrid.setAttribute('width', width);
            pixelGrid.setAttribute('height', height);
            pixelGrid.style.width = width + 'px';
            pixelGrid.style.height = height + 'px';
            
            // SVG 초기화
            pixelGrid.innerHTML = '';
            
            // 세로선 그리기
            for (let x = 0; x <= width; x++) {
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', x);
                line.setAttribute('y1', 0);
                line.setAttribute('x2', x);
                line.setAttribute('y2', height);
                line.setAttribute('stroke', '#000');
                line.setAttribute('stroke-width', '0.5');
                line.setAttribute('opacity', '0.3');
                pixelGrid.appendChild(line);
            }
            
            // 가로선 그리기
            for (let y = 0; y <= height; y++) {
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', 0);
                line.setAttribute('y1', y);
                line.setAttribute('x2', width);
                line.setAttribute('y2', y);
                line.setAttribute('stroke', '#000');
                line.setAttribute('stroke-width', '0.5');
                line.setAttribute('opacity', '0.3');
                pixelGrid.appendChild(line);
            }
        }

        function updatePixelGrid() {
            if (!previewImage.src) return;
            
            // 픽셀이 디스플레이 픽셀보다 클 때만 그리드 표시
            // 즉, 줌이 100% 이상일 때 (currentZoom >= 1)
            if (currentZoom >= 1) {
                showPixelGrid();
            } else {
                hidePixelGrid();
            }
        }

        function showPixelGrid() {
            const width = previewImage.naturalWidth;
            const height = previewImage.naturalHeight;
            
            pixelGrid.style.display = 'block';
            pixelGrid.setAttribute('width', width);
            pixelGrid.setAttribute('height', height);
            pixelGrid.style.width = width + 'px';
            pixelGrid.style.height = height + 'px';
            
            // SVG 초기화
            pixelGrid.innerHTML = '';
            
            // 모든 픽셀 경계에 선 그리기 (1픽셀 간격)
            // 세로선 그리기 - 각 픽셀의 세로 경계
            for (let x = 0; x <= width; x++) {
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', x);
                line.setAttribute('y1', 0);
                line.setAttribute('x2', x);
                line.setAttribute('y2', height);
                line.setAttribute('stroke', '#666');
                line.setAttribute('stroke-width', '0.1');
                line.setAttribute('opacity', '0.4');
                pixelGrid.appendChild(line);
            }
            
            // 가로선 그리기 - 각 픽셀의 가로 경계
            for (let y = 0; y <= height; y++) {
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', 0);
                line.setAttribute('y1', y);
                line.setAttribute('x2', width);
                line.setAttribute('y2', y);
                line.setAttribute('stroke', '#666');
                line.setAttribute('stroke-width', '0.1');
                line.setAttribute('opacity', '0.4');
                pixelGrid.appendChild(line);
            }
        }

        function showPixelHighlight(x, y) {
            if (!previewImage || !previewImage.naturalWidth) return;
            
            // 픽셀의 정확한 위치와 크기 계산 (그리드와 동일하게)
            const pixelX = x;
            const pixelY = y;
            const pixelSize = 1; // 1픽셀 크기
            
            pixelHighlight.style.display = 'block';
            pixelHighlight.style.left = pixelX + 'px';
            pixelHighlight.style.top = pixelY + 'px';
            pixelHighlight.style.width = pixelSize + 'px';
            pixelHighlight.style.height = pixelSize + 'px';
            
            console.log(`Pixel highlight: (${x}, ${y}) -> position(${pixelX}, ${pixelY})`);
        }

        function hidePixelHighlight() {
            pixelHighlight.style.display = 'none';
        }

        // 배경 선택 이벤트
        document.querySelectorAll('.bg-option').forEach(option => {
            option.addEventListener('click', () => {
                document.querySelectorAll('.bg-option').forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                
                const bgType = option.dataset.bg;
                imageBackground.className = `image-background ${bgType}`;
            });
        });

        // 전역 드래그 앤 드롭 이벤트 (이미지가 표시된 상태에서도 재업로드 가능)
        let dragCounter = 0;

        document.addEventListener('dragenter', (e) => {
            e.preventDefault();
            dragCounter++;
            if (dragCounter === 1) {
                dragOverlay.classList.add('active');
            }
        });

        document.addEventListener('dragleave', (e) => {
            e.preventDefault();
            dragCounter--;
            if (dragCounter === 0) {
                dragOverlay.classList.remove('active');
            }
        });

        document.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        document.addEventListener('drop', (e) => {
            e.preventDefault();
            dragCounter = 0;
            dragOverlay.classList.remove('active');
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleFile(files[0]);
            }
        });

        // 초기 드롭존 이벤트
        dropZone.addEventListener('click', () => fileInput.click());

        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('drag-over');
        });

        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('drag-over');
        });

        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                handleFile(e.target.files[0]);
            }
        });

        uploadBtn.addEventListener('click', () => {
            fileInput.click();
        });

        clearBtn.addEventListener('click', () => {
            clearPreview();
        });

        // 이미지 클릭 이벤트 (픽셀 정보 팝업 표시)
        previewImage.addEventListener('click', (e) => {
            if (!currentImageData || isPanning) return;

            const rect = previewImage.getBoundingClientRect();
            const scaleX = previewImage.naturalWidth / (rect.width / currentZoom);
            const scaleY = previewImage.naturalHeight / (rect.height / currentZoom);
            
            const x = Math.floor((e.clientX - rect.left) / currentZoom * scaleX);
            const y = Math.floor((e.clientY - rect.top) / currentZoom * scaleY);

            if (x >= 0 && x < previewImage.naturalWidth && y >= 0 && y < previewImage.naturalHeight) {
                const pixelIndex = (y * previewImage.naturalWidth + x) * 4;
                const r = currentImageData.data[pixelIndex];
                const g = currentImageData.data[pixelIndex + 1];
                const b = currentImageData.data[pixelIndex + 2];
                const a = currentImageData.data[pixelIndex + 3];

                selectedPixel = { x, y, r, g, b, a };
                showPixelPopup(e.clientX, e.clientY, x, y, r, g, b, a);
                showPixelHighlight(x, y);
            }
        });

        // ESC 키로 팝업 닫기
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                hidePixelPopup();
                hidePixelHighlight();
                selectedPixel = null;
            }
        });

        function handleFile(file) {
            hideError();

            // PNG 파일 검증
            if (!file.type.includes('png') && !file.name.toLowerCase().endsWith('.png')) {
                showError('PNG 파일만 업로드할 수 있습니다.');
                return;
            }

            // 파일 크기 검증 (50MB 제한)
            if (file.size > 50 * 1024 * 1024) {
                showError('파일 크기가 너무 큽니다. 50MB 이하의 파일을 선택하세요.');
                return;
            }

            const reader = new FileReader();
            
            reader.onload = (e) => {
                previewImage.src = e.target.result;
                displayImageInfo(file);
                resetZoom();
                
                // 이미지가 로드되면 캔버스에 그려서 픽셀 데이터 추출
                previewImage.onload = () => {
                    extractPixelData();
                    updatePixelGrid();
                };
                
                showPreview();
            };

            reader.onerror = () => {
                showError('파일을 읽는 중 오류가 발생했습니다.');
            };

            reader.readAsDataURL(file);
        }

        function resetZoom() {
            currentZoom = 1;
            updateZoom();
        }

        function extractPixelData() {
            const canvas = hiddenCanvas;
            const ctx = canvas.getContext('2d');
            
            canvas.width = previewImage.naturalWidth;
            canvas.height = previewImage.naturalHeight;
            
            ctx.drawImage(previewImage, 0, 0);
            currentImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        }

        function showPixelPopup(mouseX, mouseY, x, y, r, g, b, a) {
            hidePixelPopup();
            
            pixelPopup = document.createElement('div');
            pixelPopup.className = 'pixel-popup';
            
            const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}${a.toString(16).padStart(2, '0')}`;
            const rFloat = (r / 255).toFixed(3);
            const gFloat = (g / 255).toFixed(3);
            const bFloat = (b / 255).toFixed(3);
            const aFloat = (a / 255).toFixed(3);
            
            pixelPopup.innerHTML = `
                <div class="popup-header">
                    <div class="popup-coords">픽셀: (${x}, ${y})</div>
                    <button class="popup-close" onclick="hidePixelPopup(); hidePixelHighlight(); selectedPixel = null;">×</button>
                </div>
                <div class="popup-color" style="background-color: rgba(${r}, ${g}, ${b}, ${a/255});"></div>
                <div class="popup-values">
                    <div>HEX: ${hex.toUpperCase()}</div>
                    <div>RGB: (${r}, ${g}, ${b}, ${a})</div>
                    <div>RGB: (${rFloat}, ${gFloat}, ${bFloat}, ${aFloat})</div>
                </div>
            `;
            
            document.body.appendChild(pixelPopup);
            
            // 팝업 위치 조정 (화면 밖으로 나가지 않도록)
            const popupRect = pixelPopup.getBoundingClientRect();
            let left = mouseX + 15;
            let top = mouseY - popupRect.height - 10;
            
            if (left + popupRect.width > window.innerWidth) {
                left = mouseX - popupRect.width - 15;
            }
            
            if (top < 0) {
                top = mouseY + 15;
            }
            
            pixelPopup.style.left = left + 'px';
            pixelPopup.style.top = top + 'px';
            
            // 팝업 드래그 기능
            makePopupDraggable(pixelPopup);
        }

        function makePopupDraggable(popup) {
            let isDragging = false;
            let dragOffset = { x: 0, y: 0 };
            
            popup.addEventListener('mousedown', (e) => {
                if (e.target.classList.contains('popup-close')) return;
                isDragging = true;
                const rect = popup.getBoundingClientRect();
                dragOffset.x = e.clientX - rect.left;
                dragOffset.y = e.clientY - rect.top;
                popup.style.cursor = 'grabbing';
            });
            
            document.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
                e.preventDefault();
                popup.style.left = (e.clientX - dragOffset.x) + 'px';
                popup.style.top = (e.clientY - dragOffset.y) + 'px';
            });
            
            document.addEventListener('mouseup', () => {
                isDragging = false;
                if (popup) popup.style.cursor = 'move';
            });
        }

        function showPixelHighlight(x, y) {
            if (!previewImage || !previewImage.naturalWidth) return;
            
            // 확대된 상태에서의 실제 픽셀 크기 계산
            const pixelSizeInDisplay = currentZoom;
            
            // 테두리 두께를 픽셀 크기에 맞게 조정
            let borderWidth = Math.min(2, pixelSizeInDisplay * 0.1); // 픽셀 크기의 10% 또는 최대 2px
            if (pixelSizeInDisplay < 4) {
                borderWidth = 1; // 작은 픽셀에서는 1px 테두리
            }
            
            // 테두리를 고려한 하이라이트 위치와 크기
            const highlightSize = pixelSizeInDisplay - (borderWidth * 2);
            const highlightX = x * pixelSizeInDisplay + borderWidth;
            const highlightY = y * pixelSizeInDisplay + borderWidth;
            
            pixelHighlight.style.display = 'block';
            pixelHighlight.style.left = highlightX + 'px';
            pixelHighlight.style.top = highlightY + 'px';
            pixelHighlight.style.width = Math.max(1, highlightSize) + 'px';
            pixelHighlight.style.height = Math.max(1, highlightSize) + 'px';
            pixelHighlight.style.borderWidth = borderWidth + 'px';
            pixelHighlight.style.transform = 'none'; // transform 제거
            
            console.log(`Pixel(${x},${y}): size=${pixelSizeInDisplay}px, border=${borderWidth}px, highlight=${highlightSize}px`);
        }

        function hidePixelHighlight() {
            pixelHighlight.style.display = 'none';
        }

        function hidePixelPopup() {
            if (pixelPopup) {
                pixelPopup.remove();
                pixelPopup = null;
            }
        }

        function displayPixelInfo(x, y, r, g, b, a) {
            noPixelSelected.style.display = 'none';
            pixelData.style.display = 'block';

            const pixelCoords = document.getElementById('pixelCoords');
            const colorPreview = document.getElementById('colorPreview');
            const hexValue = document.getElementById('hexValue');
            const rgba255 = document.getElementById('rgba255');
            const rgba1 = document.getElementById('rgba1');

            // 좌표 표시
            pixelCoords.textContent = `위치: (${x}, ${y})`;

            // 색상 미리보기
            colorPreview.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${a/255})`;

            // HEX 값 (알파 채널 포함)
            const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}${a.toString(16).padStart(2, '0')}`;
            hexValue.textContent = `HEX: ${hex.toUpperCase()}`;

            // RGBA (0-255)
            rgba255.textContent = `RGBA(255): (${r}, ${g}, ${b}, ${a})`;

            // RGBA (0.0-1.0)
            const rFloat = (r / 255).toFixed(3);
            const gFloat = (g / 255).toFixed(3);
            const bFloat = (b / 255).toFixed(3);
            const aFloat = (a / 255).toFixed(3);
            rgba1.textContent = `RGBA(1.0): (${rFloat}, ${gFloat}, ${bFloat}, ${aFloat})`;
        }

        function displayImageInfo(file) {
            const fileName = document.getElementById('fileName');
            const fileSize = document.getElementById('fileSize');
            const imageDimensions = document.getElementById('imageDimensions');
            const fileType = document.getElementById('fileType');

            fileName.textContent = `📄 파일명: ${file.name}`;
            fileSize.textContent = `📊 크기: ${formatFileSize(file.size)}`;
            fileType.textContent = `🏷️ 형식: ${file.type || 'image/png'}`;

            // 이미지 로드 후 크기 정보 표시
            previewImage.onload = () => {
                imageDimensions.textContent = `📐 해상도: ${previewImage.naturalWidth} × ${previewImage.naturalHeight}px`;
                extractPixelData();
                updatePixelGrid();
            };
        }

        function formatFileSize(bytes) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        }

        function showPreview() {
            dropZone.style.display = 'none';
            imagePreview.style.display = 'block';
        }

        function clearPreview() {
            dropZone.style.display = 'block';
            imagePreview.style.display = 'none';
            previewImage.src = '';
            fileInput.value = '';
            currentImageData = null;
            selectedPixel = null;
            resetZoom();
            hidePixelGrid();
            hidePixelPopup();
            hidePixelHighlight();
            hideError();
        }

        function showError(message) {
            errorMessage.textContent = message;
            errorMessage.style.display = 'block';
        }

        function hideError() {
            errorMessage.style.display = 'none';
        }
    </script>
</body>
</html>