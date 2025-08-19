---
layout: default
title: "Simple Color PNG Generator"
---

---

<!-- <!DOCTYPE html> -->
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>투명 검은색 PNG 생성기</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #333;
        }
        
        .container {
            max-width: 1400px;
            margin: 0 auto;
            background: white;
            border-radius: 15px;
            padding: 30px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        
        h1 {
            text-align: center;
            color: #2c3e50;
            margin-bottom: 40px;
            font-size: 2.5em;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        }
        
        .controls {
            margin-bottom: 30px;
        }
        
        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
            color: #555;
        }
        
        input[type="number"], input[type="color"], input[type="range"] {
            padding: 8px;
            border: 2px solid #ddd;
            border-radius: 4px;
            margin-right: 10px;
        }
        
        input[type="number"] {
            width: 100px;
        }
        
        input[type="color"] {
            width: 60px;
            height: 40px;
            padding: 2px;
            cursor: pointer;
        }
        
        input[type="range"] {
            width: 200px;
            margin: 0 10px;
        }
        
        .color-controls {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 20px;
        }
        
        .alpha-control {
            display: flex;
            align-items: center;
            margin: 10px 0;
        }
        
        .alpha-value {
            background-color: #f0f0f0;
            padding: 5px 10px;
            border-radius: 3px;
            font-weight: bold;
            min-width: 40px;
            text-align: center;
        }
        
        button {
            background-color: #007bff;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            margin: 10px 5px;
            transition: background-color 0.3s;
        }
        
        button:hover {
            background-color: #0056b3;
        }
        
        .preview-area {
            border: 2px dashed #ccc;
            padding: 20px;
            text-align: center;
            margin: 20px 0;
            background-color: #fafafa;
            border-radius: 5px;
        }
        
        .checkerboard {
            background-image: 
                linear-gradient(45deg, #ccc 25%, transparent 25%), 
                linear-gradient(-45deg, #ccc 25%, transparent 25%), 
                linear-gradient(45deg, transparent 75%, #ccc 75%), 
                linear-gradient(-45deg, transparent 75%, #ccc 75%);
            background-size: 20px 20px;
            background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
            display: inline-block;
            padding: 10px;
            border-radius: 5px;
        }
        
        #preview {
            max-width: 300px;
            border: 1px solid #ddd;
        }
        
        .info {
            background-color: #e7f3ff;
            border: 1px solid #b3d9ff;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
        }
        
        .info h3 {
            margin-top: 0;
            color: #0066cc;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>커스텀 색상 PNG 생성기</h1>
        
        <div class="info">
            <h3>📝 설명</h3>
            <p>이 도구는 원하는 색상과 투명도(알파값)를 설정하여 PNG 이미지를 생성합니다. 
               알파값이 낮을수록 더 투명해지며, 체크무늬 배경에서 투명도를 확인할 수 있습니다. Claude Sonnet 4로 생성하였습니다.</p>
        </div>
        
        <div class="controls">
            <div class="color-controls">
                <div>
                    <label for="width">가로 크기 (px):</label>
                    <input type="number" id="width" value="200" min="1" max="2000">
                    
                    <label for="height">세로 크기 (px):</label>
                    <input type="number" id="height" value="200" min="1" max="2000">
                </div>
                
                <div>
                    <label for="colorPicker">색상 선택:</label>
                    <input type="color" id="colorPicker" value="#000000">
                    
                    <label for="hexColor">HEX 색상:</label>
                    <input type="text" id="hexColor" value="#000000" maxlength="7" style="width: 80px;">
                </div>
            </div>
            
            <div class="alpha-control">
                <label for="alphaSlider">투명도 (Alpha):</label>
                <input type="range" id="alphaSlider" min="0" max="255" value="0" step="1">
                <span class="alpha-value" id="alphaValue">0</span>
                <span style="margin-left: 10px; font-size: 14px; color: #666;">(0: 완전투명, 255: 불투명)</span>
            </div>
            
            <br>
            <button onclick="generateCustomPNG()">PNG 생성</button>
            <button onclick="downloadPNG()">PNG 다운로드</button>
        </div>
        
        <div class="preview-area">
            <h3>미리보기 (체크무늬 배경)</h3>
            <div class="checkerboard">
                <canvas id="preview"></canvas>
            </div>
            <p><small>투명도가 낮을수록 체크무늬 배경이 더 많이 보입니다.</small></p>
        </div>
        
        <div class="info">
            <h3>🎨 현재 색상 정보</h3>
            <p id="colorInfo">
                <strong>색상:</strong> 검은색 (Black)<br>
                <strong>RGB:</strong> (0, 0, 0)<br>
                <strong>HEX:</strong> #000000<br>
                <strong>Alpha:</strong> 0 (완전 투명)
            </p>
        </div>
    </div>

    <script>
        let canvas;
        let ctx;
        
        // 이벤트 리스너 설정
        document.addEventListener('DOMContentLoaded', function() {
            const colorPicker = document.getElementById('colorPicker');
            const hexColor = document.getElementById('hexColor');
            const alphaSlider = document.getElementById('alphaSlider');
            const alphaValue = document.getElementById('alphaValue');
            
            // 색상 선택기와 HEX 입력 동기화
            colorPicker.addEventListener('change', function() {
                hexColor.value = this.value;
                updateColorInfo();
                generateCustomPNG();
            });
            
            hexColor.addEventListener('input', function() {
                if (isValidHex(this.value)) {
                    colorPicker.value = this.value;
                    updateColorInfo();
                    generateCustomPNG();
                }
            });
            
            // 알파 슬라이더 이벤트
            alphaSlider.addEventListener('input', function() {
                alphaValue.textContent = this.value;
                updateColorInfo();
                generateCustomPNG();
            });
            
            // 초기 생성
            updateColorInfo();
            generateCustomPNG();
        });
        
        function isValidHex(hex) {
            return /^#[0-9A-F]{6}$/i.test(hex);
        }
        
        function hexToRgb(hex) {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        }
        
        function updateColorInfo() {
            const hex = document.getElementById('hexColor').value;
            const alpha = document.getElementById('alphaSlider').value;
            const rgb = hexToRgb(hex);
            
            if (rgb) {
                const alphaPercent = Math.round((alpha / 255) * 100);
                const transparency = alpha == 0 ? '완전 투명' : 
                                   alpha == 255 ? '불투명' : 
                                   `${alphaPercent}% 불투명`;
                
                document.getElementById('colorInfo').innerHTML = `
                    <strong>색상:</strong> ${hex}<br>
                    <strong>RGB:</strong> (${rgb.r}, ${rgb.g}, ${rgb.b})<br>
                    <strong>HEX:</strong> ${hex}<br>
                    <strong>Alpha:</strong> ${alpha} (${transparency})
                `;
            }
        }
        
        function generateCustomPNG() {
            const width = parseInt(document.getElementById('width').value);
            const height = parseInt(document.getElementById('height').value);
            const hex = document.getElementById('hexColor').value;
            const alpha = parseInt(document.getElementById('alphaSlider').value);
            
            const rgb = hexToRgb(hex);
            if (!rgb) return;
            
            // 캔버스 생성 또는 기존 캔버스 사용
            canvas = document.getElementById('preview');
            canvas.width = width;
            canvas.height = height;
            ctx = canvas.getContext('2d');
            
            // 투명도를 고려한 색상으로 채우기
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha / 255})`;
            ctx.fillRect(0, 0, width, height);
            
            console.log(`커스텀 PNG 생성 완료: ${width}x${height}px, 색상: ${hex}, 알파: ${alpha}`);
        }
        
        function downloadPNG() {
            if (!canvas) {
                alert('먼저 PNG를 생성해주세요!');
                return;
            }
            
            const hex = document.getElementById('hexColor').value.replace('#', '');
            const alpha = document.getElementById('alphaSlider').value;
            
            // Canvas를 PNG로 변환하여 다운로드
            canvas.toBlob(function(blob) {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `custom_color_${hex}_alpha${alpha}_${canvas.width}x${canvas.height}.png`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }, 'image/png');
        }
    </script>
</body>
</html>