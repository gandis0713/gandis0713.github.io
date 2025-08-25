---
layout: default
title: "PNG PMA(Premultiplied Alpha) Converter"
---

---

<!-- <!DOCTYPE html> -->
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PNG Alpha Converter</title>
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
            max-width: 900px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            overflow: hidden;
        }

        .header {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }

        .header h1 {
            font-size: 2rem;
            margin-bottom: 10px;
        }

        .header p {
            opacity: 0.9;
            font-size: 1.1rem;
        }

        .content {
            padding: 40px;
        }

        .conversion-mode {
            background: #f8f9fa;
            border-radius: 15px;
            padding: 25px;
            margin-bottom: 30px;
            text-align: center;
        }

        .mode-title {
            font-size: 1.2rem;
            color: #333;
            margin-bottom: 20px;
            font-weight: 600;
        }

        .mode-selector {
            display: flex;
            gap: 15px;
            justify-content: center;
            flex-wrap: wrap;
        }

        .mode-option {
            background: white;
            border: 2px solid #e9ecef;
            border-radius: 12px;
            padding: 20px;
            cursor: pointer;
            transition: all 0.3s ease;
            min-width: 200px;
            text-align: center;
        }

        .mode-option:hover {
            border-color: #4facfe;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(79, 172, 254, 0.2);
        }

        .mode-option.selected {
            border-color: #4facfe;
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            color: white;
        }

        .mode-icon {
            font-size: 2rem;
            margin-bottom: 10px;
        }

        .mode-label {
            font-weight: 600;
            margin-bottom: 5px;
        }

        .mode-description {
            font-size: 0.9rem;
            opacity: 0.8;
        }

        .upload-area {
            border: 3px dashed #4facfe;
            border-radius: 15px;
            padding: 40px;
            text-align: center;
            margin-bottom: 30px;
            transition: all 0.3s ease;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }

        .upload-area:hover {
            border-color: #00f2fe;
            background: rgba(79, 172, 254, 0.05);
            transform: translateY(-2px);
        }

        .upload-area.dragover {
            border-color: #00f2fe;
            background: rgba(79, 172, 254, 0.1);
            transform: scale(1.02);
        }

        .upload-icon {
            font-size: 4rem;
            color: #4facfe;
            margin-bottom: 20px;
        }

        .upload-text {
            font-size: 1.2rem;
            color: #666;
            margin-bottom: 10px;
        }

        .upload-hint {
            color: #999;
            font-size: 0.9rem;
        }

        #fileInput {
            display: none;
        }

        .preview-section {
            display: none;
            margin-bottom: 30px;
        }

        .preview-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 20px;
        }

        .preview-box {
            background: #f8f9fa;
            border-radius: 10px;
            padding: 20px;
            text-align: center;
        }

        .preview-box h3 {
            margin-bottom: 15px;
            color: #333;
        }

        .preview-box canvas {
            max-width: 100%;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            background-image: 
                linear-gradient(45deg, #ccc 25%, transparent 25%), 
                linear-gradient(-45deg, #ccc 25%, transparent 25%), 
                linear-gradient(45deg, transparent 75%, #ccc 75%), 
                linear-gradient(-45deg, transparent 75%, #ccc 75%);
            background-size: 20px 20px;
            background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
        }

        .info-section {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
            display: none;
        }

        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 15px;
        }

        .info-item {
            text-align: center;
        }

        .info-label {
            font-size: 0.9rem;
            color: #666;
            margin-bottom: 5px;
        }

        .info-value {
            font-size: 1.1rem;
            font-weight: bold;
            color: #333;
        }

        .convert-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 15px 30px;
            font-size: 1.1rem;
            border-radius: 50px;
            cursor: pointer;
            transition: all 0.3s ease;
            display: none;
            margin: 20px auto;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }

        .convert-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }

        .convert-btn:active {
            transform: translateY(0);
        }

        .download-btn {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            color: white;
            border: none;
            padding: 15px 30px;
            font-size: 1.1rem;
            border-radius: 50px;
            cursor: pointer;
            transition: all 0.3s ease;
            display: none;
            margin: 20px auto;
            text-decoration: none;
            box-shadow: 0 4px 15px rgba(79, 172, 254, 0.3);
        }

        .download-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(79, 172, 254, 0.4);
        }

        .progress-bar {
            width: 100%;
            height: 6px;
            background: #f0f0f0;
            border-radius: 3px;
            overflow: hidden;
            margin: 20px 0;
            display: none;
        }

        .progress-fill {
            height: 100%;
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            width: 0%;
            transition: width 0.3s ease;
        }

        .status-message {
            text-align: center;
            padding: 10px;
            border-radius: 8px;
            margin: 15px 0;
            display: none;
        }

        .status-message.success {
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }

        .status-message.error {
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }

        .conversion-info {
            background: linear-gradient(135deg, rgba(79, 172, 254, 0.1) 0%, rgba(0, 242, 254, 0.1) 100%);
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 20px;
            display: none;
        }

        .conversion-info h4 {
            color: #333;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .conversion-info p {
            color: #666;
            line-height: 1.5;
        }

        @media (max-width: 768px) {
            .preview-container {
                grid-template-columns: 1fr;
            }
            
            .mode-selector {
                flex-direction: column;
                align-items: center;
            }
            
            .mode-option {
                min-width: 250px;
            }
            
            .header h1 {
                font-size: 1.5rem;
            }
            
            .content {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔄 PNG Alpha Converter</h1>
            <p>Premultiplied Alpha ↔ Non-premultiplied Alpha 변환</p>
        </div>
        
        <div class="content">
            <div class="conversion-mode">
                <div class="mode-title">변환 방향을 선택하세요</div>
                <div class="mode-selector">
                    <div class="mode-option selected" data-mode="pma-to-non-pma">
                        <div class="mode-icon">➡️</div>
                        <div class="mode-label">PMA → Non-PMA</div>
                        <div class="mode-description">Premultiplied Alpha를<br>일반 Alpha로 변환</div>
                    </div>
                    <div class="mode-option" data-mode="non-pma-to-pma">
                        <div class="mode-icon">⬅️</div>
                        <div class="mode-label">Non-PMA → PMA</div>
                        <div class="mode-description">일반 Alpha를<br>Premultiplied Alpha로 변환</div>
                    </div>
                </div>
            </div>

            <div class="conversion-info" id="conversionInfo">
                <h4 id="conversionTitle">🔄 변환 정보</h4>
                <p id="conversionDescription"></p>
            </div>

            <div class="upload-area" id="uploadArea">
                <div class="upload-icon">📁</div>
                <div class="upload-text">PNG 파일을 드래그하거나 클릭하여 선택하세요</div>
                <div class="upload-hint">최대 파일 크기: 10MB</div>
                <input type="file" id="fileInput" accept=".png" />
            </div>

            <div class="status-message" id="statusMessage"></div>
            <div class="progress-bar" id="progressBar">
                <div class="progress-fill" id="progressFill"></div>
            </div>

            <div class="info-section" id="infoSection">
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">파일명</div>
                        <div class="info-value" id="fileName">-</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">크기</div>
                        <div class="info-value" id="fileSize">-</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">해상도</div>
                        <div class="info-value" id="resolution">-</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">변환 모드</div>
                        <div class="info-value" id="conversionMode">-</div>
                    </div>
                </div>
            </div>

            <button class="convert-btn" id="convertBtn">변환 시작</button>

            <div class="preview-section" id="previewSection">
                <div class="preview-container">
                    <div class="preview-box">
                        <h3 id="originalTitle">원본</h3>
                        <canvas id="originalCanvas"></canvas>
                    </div>
                    <div class="preview-box">
                        <h3 id="convertedTitle">변환된 결과</h3>
                        <canvas id="convertedCanvas"></canvas>
                    </div>
                </div>
            </div>

            <a class="download-btn" id="downloadBtn" style="display: block; text-align: center;">변환된 파일 다운로드</a>
        </div>
    </div>

    <script>
        const uploadArea = document.getElementById('uploadArea');
        const fileInput = document.getElementById('fileInput');
        const statusMessage = document.getElementById('statusMessage');
        const progressBar = document.getElementById('progressBar');
        const progressFill = document.getElementById('progressFill');
        const infoSection = document.getElementById('infoSection');
        const convertBtn = document.getElementById('convertBtn');
        const previewSection = document.getElementById('previewSection');
        const downloadBtn = document.getElementById('downloadBtn');
        const conversionInfo = document.getElementById('conversionInfo');
        const modeOptions = document.querySelectorAll('.mode-option');
        
        let currentFile = null;
        let convertedImageData = null;
        let selectedMode = 'pma-to-non-pma';

        const modeDescriptions = {
            'pma-to-non-pma': {
                title: '➡️ PMA to Non-PMA 변환',
                description: 'Premultiplied Alpha 이미지의 RGB 값을 Alpha 값으로 나누어 원래 색상을 복원합니다. 투명도가 적용된 픽셀의 색상이 더 선명해집니다.',
                originalTitle: '원본 (PMA)',
                convertedTitle: '변환된 결과 (Non-PMA)',
                prefix: 'non_pma_'
            },
            'non-pma-to-pma': {
                title: '⬅️ Non-PMA to PMA 변환',
                description: '일반 Alpha 이미지의 RGB 값에 Alpha 값을 곱하여 Premultiplied Alpha로 변환합니다. GPU 렌더링과 블렌딩 최적화에 유용합니다.',
                originalTitle: '원본 (Non-PMA)',
                convertedTitle: '변환된 결과 (PMA)',
                prefix: 'pma_'
            }
        };

        // 모드 선택 이벤트
        modeOptions.forEach(option => {
            option.addEventListener('click', () => {
                modeOptions.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                selectedMode = option.dataset.mode;
                updateConversionInfo();
                updateUIForMode();
            });
        });

        // 초기 설정
        updateConversionInfo();

        // 파일 업로드 이벤트
        uploadArea.addEventListener('click', () => fileInput.click());
        uploadArea.addEventListener('dragover', handleDragOver);
        uploadArea.addEventListener('dragleave', handleDragLeave);
        uploadArea.addEventListener('drop', handleDrop);
        fileInput.addEventListener('change', handleFileSelect);
        convertBtn.addEventListener('click', convertImage);

        function updateConversionInfo() {
            const info = modeDescriptions[selectedMode];
            document.getElementById('conversionTitle').textContent = info.title;
            document.getElementById('conversionDescription').textContent = info.description;
            conversionInfo.style.display = 'block';
        }

        function updateUIForMode() {
            const info = modeDescriptions[selectedMode];
            document.getElementById('originalTitle').textContent = info.originalTitle;
            document.getElementById('convertedTitle').textContent = info.convertedTitle;
            document.getElementById('conversionMode').textContent = selectedMode === 'pma-to-non-pma' ? 'PMA → Non-PMA' : 'Non-PMA → PMA';
        }

        function handleDragOver(e) {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        }

        function handleDragLeave(e) {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
        }

        function handleDrop(e) {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleFile(files[0]);
            }
        }

        function handleFileSelect(e) {
            if (e.target.files.length > 0) {
                handleFile(e.target.files[0]);
            }
        }

        function handleFile(file) {
            if (!file.type.includes('png')) {
                showStatus('PNG 파일만 지원됩니다.', 'error');
                return;
            }

            if (file.size > 10 * 1024 * 1024) {
                showStatus('파일 크기는 10MB 이하여야 합니다.', 'error');
                return;
            }

            currentFile = file;
            loadImage(file);
        }

        function loadImage(file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = new Image();
                img.onload = function() {
                    displayImageInfo(file, img);
                    drawOriginalImage(img);
                    convertBtn.style.display = 'block';
                    showStatus('이미지가 성공적으로 로드되었습니다.', 'success');
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }

        function displayImageInfo(file, img) {
            document.getElementById('fileName').textContent = file.name;
            document.getElementById('fileSize').textContent = formatFileSize(file.size);
            document.getElementById('resolution').textContent = `${img.width} × ${img.height}`;
            updateUIForMode();
            infoSection.style.display = 'block';
        }

        function drawOriginalImage(img) {
            const canvas = document.getElementById('originalCanvas');
            const ctx = canvas.getContext('2d');
            
            const maxSize = 200;
            const scale = Math.min(maxSize / img.width, maxSize / img.height);
            canvas.width = img.width * scale;
            canvas.height = img.height * scale;
            
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }

        function convertImage() {
            if (!currentFile) return;

            showProgress(true);
            showStatus('변환 중...', 'success');
            
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = new Image();
                img.onload = function() {
                    processConversion(img);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(currentFile);
        }

        function processConversion(img) {
            // 임시 캔버스 생성
            const tempCanvas = document.createElement('canvas');
            const tempCtx = tempCanvas.getContext('2d');
            tempCanvas.width = img.width;
            tempCanvas.height = img.height;
            
            // 원본 이미지를 캔버스에 그리기
            tempCtx.drawImage(img, 0, 0);
            
            // 이미지 데이터 가져오기
            const imageData = tempCtx.getImageData(0, 0, img.width, img.height);
            const data = imageData.data;
            
            if (selectedMode === 'pma-to-non-pma') {
                // PMA를 Non-PMA로 변환
                for (let i = 0; i < data.length; i += 4) {
                    const alpha = data[i + 3] / 255;
                    
                    if (alpha > 0) {
                        // RGB 값을 alpha로 나누어 원래 색상 복원
                        data[i] = Math.min(255, Math.round(data[i] / alpha));     // Red
                        data[i + 1] = Math.min(255, Math.round(data[i + 1] / alpha)); // Green
                        data[i + 2] = Math.min(255, Math.round(data[i + 2] / alpha)); // Blue
                    }
                }
            } else {
                // Non-PMA를 PMA로 변환
                for (let i = 0; i < data.length; i += 4) {
                    const alpha = data[i + 3] / 255;
                    
                    // RGB 값에 alpha를 곱하여 premultiply
                    data[i] = Math.round(data[i] * alpha);     // Red
                    data[i + 1] = Math.round(data[i + 1] * alpha); // Green
                    data[i + 2] = Math.round(data[i + 2] * alpha); // Blue
                }
            }
            
            // 변환된 데이터를 캔버스에 다시 그리기
            tempCtx.putImageData(imageData, 0, 0);
            
            // 결과 이미지 표시
            displayConvertedImage(tempCanvas);
            convertedImageData = tempCanvas;
            
            updateProgress(100);
            showStatus('변환이 완료되었습니다!', 'success');
            showProgress(false);
            
            downloadBtn.style.display = 'block';
            previewSection.style.display = 'block';
        }

        function displayConvertedImage(canvas) {
            const displayCanvas = document.getElementById('convertedCanvas');
            const ctx = displayCanvas.getContext('2d');
            
            const maxSize = 200;
            const scale = Math.min(maxSize / canvas.width, maxSize / canvas.height);
            displayCanvas.width = canvas.width * scale;
            displayCanvas.height = canvas.height * scale;
            
            ctx.drawImage(canvas, 0, 0, displayCanvas.width, displayCanvas.height);
        }

        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (convertedImageData) {
                const info = modeDescriptions[selectedMode];
                convertedImageData.toBlob(function(blob) {
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${info.prefix}${currentFile.name}`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                }, 'image/png');
            }
        });

        function showStatus(message, type) {
            statusMessage.textContent = message;
            statusMessage.className = `status-message ${type}`;
            statusMessage.style.display = 'block';
            
            setTimeout(() => {
                statusMessage.style.display = 'none';
            }, 3000);
        }

        function showProgress(show) {
            progressBar.style.display = show ? 'block' : 'none';
            if (show) updateProgress(0);
        }

        function updateProgress(percent) {
            progressFill.style.width = percent + '%';
        }

        function formatFileSize(bytes) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        }
    </script>
</body>
</html>