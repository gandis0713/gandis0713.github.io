---
layout: default
title: "WebGL Color Blending Tool"
---

---

<!-- <!DOCTYPE html> -->
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WebGL 블렌딩 연산 도구</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            color: #333;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            padding: 30px;
            backdrop-filter: blur(10px);
        }
        
        h1 {
            text-align: center;
            color: #2d3748;
            margin-bottom: 30px;
            font-size: 2.5rem;
            background: linear-gradient(45deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .controls {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin-bottom: 30px;
        }
        
        .color-section {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 15px;
            border: 1px solid #e9ecef;
        }
        
        .color-section h3 {
            margin-top: 0;
            color: #495057;
            font-size: 1.3rem;
            text-align: center;
        }
        
        .color-input-group {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            gap: 10px;
            margin-bottom: 15px;
        }
        
        .input-wrapper {
            display: flex;
            flex-direction: column;
        }
        
        label {
            font-weight: 600;
            margin-bottom: 5px;
            color: #6c757d;
            font-size: 0.9rem;
        }
        
        input[type="number"] {
            padding: 8px 12px;
            border: 2px solid #dee2e6;
            border-radius: 8px;
            font-size: 14px;
            transition: all 0.3s ease;
        }
        
        input[type="number"]:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }
        
        .color-preview {
            width: 100%;
            height: 60px;
            border-radius: 10px;
            border: 2px solid #dee2e6;
            margin-top: 10px;
        }
        
        .blend-controls {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 15px;
            border: 1px solid #e9ecef;
            margin-bottom: 20px;
        }
        
        .blend-controls h3 {
            margin-top: 0;
            color: #495057;
            text-align: center;
        }
        
        .blend-section {
            background: white;
            padding: 15px;
            border-radius: 10px;
            margin-bottom: 15px;
            border: 1px solid #dee2e6;
        }
        
        .blend-section h4 {
            margin: 0 0 15px 0;
            color: #495057;
            font-size: 1.1rem;
            text-align: center;
        }
        
        .blend-row {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 15px;
            margin-bottom: 15px;
        }
        
        .separate-toggle {
            text-align: center;
            margin-bottom: 20px;
        }
        
        .toggle-switch {
            position: relative;
            display: inline-block;
            width: 60px;
            height: 34px;
            margin-left: 10px;
        }
        
        .toggle-switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }
        
        .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            transition: .4s;
            border-radius: 34px;
        }
        
        .slider:before {
            position: absolute;
            content: "";
            height: 26px;
            width: 26px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            transition: .4s;
            border-radius: 50%;
        }
        
        input:checked + .slider {
            background-color: #667eea;
        }
        
        input:checked + .slider:before {
            transform: translateX(26px);
        }
        
        select {
            padding: 10px 15px;
            border: 2px solid #dee2e6;
            border-radius: 8px;
            font-size: 14px;
            background: white;
            transition: all 0.3s ease;
        }
        
        select:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }
        
        .result-section {
            text-align: center;
            background: #f8f9fa;
            padding: 30px;
            border-radius: 15px;
            border: 1px solid #e9ecef;
        }
        
        .result-color {
            width: 200px;
            height: 200px;
            margin: 20px auto;
            border-radius: 15px;
            border: 3px solid #dee2e6;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        
        .result-values {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 15px;
            margin-top: 20px;
        }
        
        .result-value {
            background: white;
            padding: 15px;
            border-radius: 10px;
            border: 1px solid #dee2e6;
        }
        
        .result-value label {
            display: block;
            font-weight: 600;
            color: #6c757d;
            margin-bottom: 5px;
        }
        
        .result-value span {
            font-size: 1.2rem;
            font-weight: bold;
            color: #2d3748;
        }
        
        .canvas-container {
            margin: 20px 0;
            text-align: center;
        }
        
        canvas {
            border: 2px solid #dee2e6;
            border-radius: 10px;
            background: white;
        }
        
        .formula {
            background: #e3f2fd;
            padding: 15px;
            border-radius: 10px;
            margin: 20px 0;
            font-family: 'Courier New', monospace;
            font-size: 14px;
            color: #1565c0;
            border-left: 4px solid #2196f3;
        }
        
        @media (max-width: 768px) {
            .controls {
                grid-template-columns: 1fr;
            }
            
            .color-input-group {
                grid-template-columns: 1fr 1fr;
            }
            
            .blend-row {
                grid-template-columns: 1fr;
            }
            
            .result-values {
                grid-template-columns: 1fr 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>WebGL 블렌딩 연산 도구</h1>
        
        <div class="controls">
            <div class="color-section">
                <h3>🎨 Source Color (새로 그려질 색상)</h3>
                <div class="color-input-group">
                    <div class="input-wrapper">
                        <label for="srcR">Red</label>
                        <input type="number" id="srcR" min="0" max="1" step="0.01" value="1">
                    </div>
                    <div class="input-wrapper">
                        <label for="srcG">Green</label>
                        <input type="number" id="srcG" min="0" max="1" step="0.01" value="0">
                    </div>
                    <div class="input-wrapper">
                        <label for="srcB">Blue</label>
                        <input type="number" id="srcB" min="0" max="1" step="0.01" value="0">
                    </div>
                    <div class="input-wrapper">
                        <label for="srcA">Alpha</label>
                        <input type="number" id="srcA" min="0" max="1" step="0.01" value="0.8">
                    </div>
                </div>
                <div class="color-preview" id="srcPreview"></div>
            </div>
            
            <div class="color-section">
                <h3>🖼️ Destination Color (기존 색상)</h3>
                <div class="color-input-group">
                    <div class="input-wrapper">
                        <label for="dstR">Red</label>
                        <input type="number" id="dstR" min="0" max="1" step="0.01" value="0">
                    </div>
                    <div class="input-wrapper">
                        <label for="dstG">Green</label>
                        <input type="number" id="dstG" min="0" max="1" step="0.01" value="0">
                    </div>
                    <div class="input-wrapper">
                        <label for="dstB">Blue</label>
                        <input type="number" id="dstB" min="0" max="1" step="0.01" value="1">
                    </div>
                    <div class="input-wrapper">
                        <label for="dstA">Alpha</label>
                        <input type="number" id="dstA" min="0" max="1" step="0.01" value="0.6">
                    </div>
                </div>
                <div class="color-preview" id="dstPreview"></div>
            </div>
        </div>
        
        <div class="blend-controls">
            <h3>⚙️ 블렌딩 설정</h3>
            
            <div class="separate-toggle">
                <label>
                    <input type="checkbox" id="separateBlend">
                    RGB/Alpha 분리 블렌딩
                </label>
                <label class="toggle-switch">
                    <input type="checkbox" id="separateToggle">
                    <span class="slider"></span>
                </label>
            </div>
            
            <div class="blend-section" id="rgbBlendSection">
                <h4>🎨 RGB 채널 블렌딩</h4>
                <div class="blend-row">
                    <div class="input-wrapper">
                        <label for="srcFactorRGB">Source Blend Factor (RGB)</label>
                        <select id="srcFactorRGB">
                            <option value="ZERO">ZERO</option>
                            <option value="ONE" selected>ONE</option>
                            <option value="SRC_COLOR">SRC_COLOR</option>
                            <option value="ONE_MINUS_SRC_COLOR">ONE_MINUS_SRC_COLOR</option>
                            <option value="DST_COLOR">DST_COLOR</option>
                            <option value="ONE_MINUS_DST_COLOR">ONE_MINUS_DST_COLOR</option>
                            <option value="SRC_ALPHA">SRC_ALPHA</option>
                            <option value="ONE_MINUS_SRC_ALPHA">ONE_MINUS_SRC_ALPHA</option>
                            <option value="DST_ALPHA">DST_ALPHA</option>
                            <option value="ONE_MINUS_DST_ALPHA">ONE_MINUS_DST_ALPHA</option>
                        </select>
                    </div>
                    <div class="input-wrapper">
                        <label for="dstFactorRGB">Destination Blend Factor (RGB)</label>
                        <select id="dstFactorRGB">
                            <option value="ZERO">ZERO</option>
                            <option value="ONE">ONE</option>
                            <option value="SRC_COLOR">SRC_COLOR</option>
                            <option value="ONE_MINUS_SRC_COLOR" selected>ONE_MINUS_SRC_COLOR</option>
                            <option value="DST_COLOR">DST_COLOR</option>
                            <option value="ONE_MINUS_DST_COLOR">ONE_MINUS_DST_COLOR</option>
                            <option value="SRC_ALPHA">SRC_ALPHA</option>
                            <option value="ONE_MINUS_SRC_ALPHA">ONE_MINUS_SRC_ALPHA</option>
                            <option value="DST_ALPHA">DST_ALPHA</option>
                            <option value="ONE_MINUS_DST_ALPHA">ONE_MINUS_DST_ALPHA</option>
                        </select>
                    </div>
                    <div class="input-wrapper">
                        <label for="blendEquationRGB">Blend Equation (RGB)</label>
                        <select id="blendEquationRGB">
                            <option value="FUNC_ADD" selected>ADD (+)</option>
                            <option value="FUNC_SUBTRACT">SUBTRACT (-)</option>
                            <option value="FUNC_REVERSE_SUBTRACT">REVERSE_SUBTRACT</option>
                        </select>
                    </div>
                </div>
            </div>
            
            <div class="blend-section" id="alphaBlendSection">
                <h4>👻 Alpha 채널 블렌딩</h4>
                <div class="blend-row">
                    <div class="input-wrapper">
                        <label for="srcFactorAlpha">Source Blend Factor (Alpha)</label>
                        <select id="srcFactorAlpha">
                            <option value="ZERO">ZERO</option>
                            <option value="ONE" selected>ONE</option>
                            <option value="SRC_COLOR">SRC_COLOR</option>
                            <option value="ONE_MINUS_SRC_COLOR">ONE_MINUS_SRC_COLOR</option>
                            <option value="DST_COLOR">DST_COLOR</option>
                            <option value="ONE_MINUS_DST_COLOR">ONE_MINUS_DST_COLOR</option>
                            <option value="SRC_ALPHA">SRC_ALPHA</option>
                            <option value="ONE_MINUS_SRC_ALPHA">ONE_MINUS_SRC_ALPHA</option>
                            <option value="DST_ALPHA">DST_ALPHA</option>
                            <option value="ONE_MINUS_DST_ALPHA">ONE_MINUS_DST_ALPHA</option>
                        </select>
                    </div>
                    <div class="input-wrapper">
                        <label for="dstFactorAlpha">Destination Blend Factor (Alpha)</label>
                        <select id="dstFactorAlpha">
                            <option value="ZERO">ZERO</option>
                            <option value="ONE">ONE</option>
                            <option value="SRC_COLOR">SRC_COLOR</option>
                            <option value="ONE_MINUS_SRC_COLOR" selected>ONE_MINUS_SRC_COLOR</option>
                            <option value="DST_COLOR">DST_COLOR</option>
                            <option value="ONE_MINUS_DST_COLOR">ONE_MINUS_DST_COLOR</option>
                            <option value="SRC_ALPHA">SRC_ALPHA</option>
                            <option value="ONE_MINUS_SRC_ALPHA">ONE_MINUS_SRC_ALPHA</option>
                            <option value="DST_ALPHA">DST_ALPHA</option>
                            <option value="ONE_MINUS_DST_ALPHA">ONE_MINUS_DST_ALPHA</option>
                        </select>
                    </div>
                    <div class="input-wrapper">
                        <label for="blendEquationAlpha">Blend Equation (Alpha)</label>
                        <select id="blendEquationAlpha">
                            <option value="FUNC_ADD" selected>ADD (+)</option>
                            <option value="FUNC_SUBTRACT">SUBTRACT (-)</option>
                            <option value="FUNC_REVERSE_SUBTRACT">REVERSE_SUBTRACT</option>
                        </select>
                    </div>
                </div>
            </div>
            
            <div class="blend-section" id="combinedBlendSection" style="display: none;">
                <h4>🔄 통합 블렌딩 (RGB + Alpha)</h4>
                <div class="blend-row">
                    <div class="input-wrapper">
                        <label for="srcFactor">Source Blend Factor</label>
                        <select id="srcFactor">
                            <option value="ZERO">ZERO</option>
                            <option value="ONE" selected>ONE</option>
                            <option value="SRC_COLOR">SRC_COLOR</option>
                            <option value="ONE_MINUS_SRC_COLOR">ONE_MINUS_SRC_COLOR</option>
                            <option value="DST_COLOR">DST_COLOR</option>
                            <option value="ONE_MINUS_DST_COLOR">ONE_MINUS_DST_COLOR</option>
                            <option value="SRC_ALPHA">SRC_ALPHA</option>
                            <option value="ONE_MINUS_SRC_ALPHA">ONE_MINUS_SRC_ALPHA</option>
                            <option value="DST_ALPHA">DST_ALPHA</option>
                            <option value="ONE_MINUS_DST_ALPHA">ONE_MINUS_DST_ALPHA</option>
                        </select>
                    </div>
                    <div class="input-wrapper">
                        <label for="dstFactor">Destination Blend Factor</label>
                        <select id="dstFactor">
                            <option value="ZERO">ZERO</option>
                            <option value="ONE">ONE</option>
                            <option value="SRC_COLOR">SRC_COLOR</option>
                            <option value="ONE_MINUS_SRC_COLOR" selected>ONE_MINUS_SRC_COLOR</option>
                            <option value="DST_COLOR">DST_COLOR</option>
                            <option value="ONE_MINUS_DST_COLOR">ONE_MINUS_DST_COLOR</option>
                            <option value="SRC_ALPHA">SRC_ALPHA</option>
                            <option value="ONE_MINUS_SRC_ALPHA">ONE_MINUS_SRC_ALPHA</option>
                            <option value="DST_ALPHA">DST_ALPHA</option>
                            <option value="ONE_MINUS_DST_ALPHA">ONE_MINUS_DST_ALPHA</option>
                        </select>
                    </div>
                    <div class="input-wrapper">
                        <label for="blendEquation">Blend Equation</label>
                        <select id="blendEquation">
                            <option value="FUNC_ADD" selected>ADD (+)</option>
                            <option value="FUNC_SUBTRACT">SUBTRACT (-)</option>
                            <option value="FUNC_REVERSE_SUBTRACT">REVERSE_SUBTRACT</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        

        
        <div class="result-section">
            <h3>📊 블렌딩 결과</h3>
            <div class="formula" id="formula"></div>
            <div class="result-color" id="resultPreview"></div>
            <div class="result-values">
                <div class="result-value">
                    <label>Red</label>
                    <span id="resultR">0.000</span>
                </div>
                <div class="result-value">
                    <label>Green</label>
                    <span id="resultG">0.000</span>
                </div>
                <div class="result-value">
                    <label>Blue</label>
                    <span id="resultB">0.000</span>
                </div>
                <div class="result-value">
                    <label>Alpha</label>
                    <span id="resultA">0.000</span>
                </div>
            </div>
        </div>
    </div>

    <script>
        class WebGLBlendTool {
            constructor() {
                this.setupEventListeners();
                this.initializeUI();
                this.calculate();
            }
            

            
            initializeUI() {
                // 기본적으로 분리 블렌딩 모드로 시작
                document.getElementById('separateToggle').checked = true;
                document.getElementById('separateBlend').checked = true;
                this.toggleSeparateBlend(true);
            }
            
            setupEventListeners() {
                const inputs = ['srcR', 'srcG', 'srcB', 'srcA', 'dstR', 'dstG', 'dstB', 'dstA'];
                const selects = ['srcFactorRGB', 'dstFactorRGB', 'blendEquationRGB', 
                               'srcFactorAlpha', 'dstFactorAlpha', 'blendEquationAlpha',
                               'srcFactor', 'dstFactor', 'blendEquation'];
                
                inputs.forEach(id => {
                    const element = document.getElementById(id);
                    if (element) {
                        element.addEventListener('input', () => this.calculate());
                    }
                });
                
                selects.forEach(id => {
                    const element = document.getElementById(id);
                    if (element) {
                        element.addEventListener('change', () => this.calculate());
                    }
                });
                
                // 분리 블렌딩 토글
                const separateToggle = document.getElementById('separateToggle');
                const separateBlend = document.getElementById('separateBlend');
                
                if (separateToggle) {
                    separateToggle.addEventListener('change', (e) => {
                        separateBlend.checked = e.target.checked;
                        this.toggleSeparateBlend(e.target.checked);
                    });
                }
                
                if (separateBlend) {
                    separateBlend.addEventListener('change', (e) => {
                        separateToggle.checked = e.target.checked;
                        this.toggleSeparateBlend(e.target.checked);
                    });
                }
            }
            
            toggleSeparateBlend(separate) {
                const rgbSection = document.getElementById('rgbBlendSection');
                const alphaSection = document.getElementById('alphaBlendSection');
                const combinedSection = document.getElementById('combinedBlendSection');
                
                if (separate) {
                    if (rgbSection) rgbSection.style.display = 'block';
                    if (alphaSection) alphaSection.style.display = 'block';
                    if (combinedSection) combinedSection.style.display = 'none';
                } else {
                    if (rgbSection) rgbSection.style.display = 'none';
                    if (alphaSection) alphaSection.style.display = 'none';
                    if (combinedSection) combinedSection.style.display = 'block';
                }
                
                this.calculate();
            }
            
            getBlendFactor(factorName, src, dst) {
                const factors = {
                    'ZERO': [0, 0, 0, 0],
                    'ONE': [1, 1, 1, 1],
                    'SRC_COLOR': [src[0], src[1], src[2], src[3]],
                    'ONE_MINUS_SRC_COLOR': [1-src[0], 1-src[1], 1-src[2], 1-src[3]],
                    'DST_COLOR': [dst[0], dst[1], dst[2], dst[3]],
                    'ONE_MINUS_DST_COLOR': [1-dst[0], 1-dst[1], 1-dst[2], 1-dst[3]],
                    'SRC_ALPHA': [src[3], src[3], src[3], src[3]],
                    'ONE_MINUS_SRC_ALPHA': [1-src[3], 1-src[3], 1-src[3], 1-src[3]],
                    'DST_ALPHA': [dst[3], dst[3], dst[3], dst[3]],
                    'ONE_MINUS_DST_ALPHA': [1-dst[3], 1-dst[3], 1-dst[3], 1-dst[3]]
                };
                
                return factors[factorName] || [0, 0, 0, 0];
            }
            
            getValue(id) {
                const element = document.getElementById(id);
                return element ? parseFloat(element.value) : 0;
            }
            
            getSelectValue(id) {
                const element = document.getElementById(id);
                return element ? element.value : '';
            }
            
            calculate() {
                const src = [
                    this.getValue('srcR'),
                    this.getValue('srcG'),
                    this.getValue('srcB'),
                    this.getValue('srcA')
                ];
                
                const dst = [
                    this.getValue('dstR'),
                    this.getValue('dstG'),
                    this.getValue('dstB'),
                    this.getValue('dstA')
                ];
                
                const separateToggle = document.getElementById('separateToggle');
                const isSeparate = separateToggle ? separateToggle.checked : true;
                
                let result = [0, 0, 0, 0];
                let formulaText = '';
                
                if (isSeparate) {
                    // RGB와 Alpha 분리 블렌딩
                    const srcFactorNameRGB = this.getSelectValue('srcFactorRGB');
                    const dstFactorNameRGB = this.getSelectValue('dstFactorRGB');
                    const srcFactorNameAlpha = this.getSelectValue('srcFactorAlpha');
                    const dstFactorNameAlpha = this.getSelectValue('dstFactorAlpha');
                    const equationRGB = this.getSelectValue('blendEquationRGB');
                    const equationAlpha = this.getSelectValue('blendEquationAlpha');
                    
                    const srcFactorRGB = this.getBlendFactor(srcFactorNameRGB, src, dst);
                    const dstFactorRGB = this.getBlendFactor(dstFactorNameRGB, src, dst);
                    const srcFactorAlpha = this.getBlendFactor(srcFactorNameAlpha, src, dst);
                    const dstFactorAlpha = this.getBlendFactor(dstFactorNameAlpha, src, dst);
                    
                    // RGB 채널 계산
                    for (let i = 0; i < 3; i++) {
                        const srcTerm = src[i] * srcFactorRGB[i];
                        const dstTerm = dst[i] * dstFactorRGB[i];
                        
                        if (equationRGB === 'FUNC_ADD') {
                            result[i] = srcTerm + dstTerm;
                        } else if (equationRGB === 'FUNC_SUBTRACT') {
                            result[i] = srcTerm - dstTerm;
                        } else if (equationRGB === 'FUNC_REVERSE_SUBTRACT') {
                            result[i] = dstTerm - srcTerm;
                        }
                        
                        result[i] = Math.max(0, Math.min(1, result[i]));
                    }
                    
                    // Alpha 채널 계산
                    const srcTermAlpha = src[3] * srcFactorAlpha[3];
                    const dstTermAlpha = dst[3] * dstFactorAlpha[3];
                    
                    if (equationAlpha === 'FUNC_ADD') {
                        result[3] = srcTermAlpha + dstTermAlpha;
                    } else if (equationAlpha === 'FUNC_SUBTRACT') {
                        result[3] = srcTermAlpha - dstTermAlpha;
                    } else if (equationAlpha === 'FUNC_REVERSE_SUBTRACT') {
                        result[3] = dstTermAlpha - srcTermAlpha;
                    }
                    
                    result[3] = Math.max(0, Math.min(1, result[3]));
                    
                    const opRGB = equationRGB === 'FUNC_ADD' ? '+' : 
                                 equationRGB === 'FUNC_SUBTRACT' ? '-' : '(dst - src)';
                    const opAlpha = equationAlpha === 'FUNC_ADD' ? '+' : 
                                   equationAlpha === 'FUNC_SUBTRACT' ? '-' : '(dst - src)';
                    
                    formulaText = `
                        <strong>분리 블렌딩 공식:</strong><br>
                        <strong>RGB:</strong> Result.rgb = (Source.rgb × ${srcFactorNameRGB}) ${opRGB} (Dest.rgb × ${dstFactorNameRGB})<br>
                        <strong>Alpha:</strong> Result.a = (Source.a × ${srcFactorNameAlpha}) ${opAlpha} (Dest.a × ${dstFactorNameAlpha})<br><br>
                        <strong>실제 계산:</strong><br>
                        RGB Source: [${src.slice(0,3).map(v => v.toFixed(3)).join(', ')}] × [${srcFactorRGB.slice(0,3).map(v => v.toFixed(3)).join(', ')}] = [${src.slice(0,3).map((v,i) => (v * srcFactorRGB[i]).toFixed(3)).join(', ')}]<br>
                        RGB Dest: [${dst.slice(0,3).map(v => v.toFixed(3)).join(', ')}] × [${dstFactorRGB.slice(0,3).map(v => v.toFixed(3)).join(', ')}] = [${dst.slice(0,3).map((v,i) => (v * dstFactorRGB[i]).toFixed(3)).join(', ')}]<br>
                        Alpha Source: ${src[3].toFixed(3)} × ${srcFactorAlpha[3].toFixed(3)} = ${(src[3] * srcFactorAlpha[3]).toFixed(3)}<br>
                        Alpha Dest: ${dst[3].toFixed(3)} × ${dstFactorAlpha[3].toFixed(3)} = ${(dst[3] * dstFactorAlpha[3]).toFixed(3)}
                    `;
                    
                } else {
                    // 통합 블렌딩
                    const srcFactorName = this.getSelectValue('srcFactor');
                    const dstFactorName = this.getSelectValue('dstFactor');
                    const equation = this.getSelectValue('blendEquation');
                    
                    const srcFactor = this.getBlendFactor(srcFactorName, src, dst);
                    const dstFactor = this.getBlendFactor(dstFactorName, src, dst);
                    
                    for (let i = 0; i < 4; i++) {
                        const srcTerm = src[i] * srcFactor[i];
                        const dstTerm = dst[i] * dstFactor[i];
                        
                        if (equation === 'FUNC_ADD') {
                            result[i] = srcTerm + dstTerm;
                        } else if (equation === 'FUNC_SUBTRACT') {
                            result[i] = srcTerm - dstTerm;
                        } else if (equation === 'FUNC_REVERSE_SUBTRACT') {
                            result[i] = dstTerm - srcTerm;
                        }
                        
                        result[i] = Math.max(0, Math.min(1, result[i]));
                    }
                    
                    const op = equation === 'FUNC_ADD' ? '+' : 
                              equation === 'FUNC_SUBTRACT' ? '-' : '(dst - src)';
                    
                    formulaText = `
                        <strong>통합 블렌딩 공식:</strong><br>
                        Result = (Source × ${srcFactorName}) ${op} (Dest × ${dstFactorName})<br><br>
                        <strong>실제 계산:</strong><br>
                        Source: [${src.map(v => v.toFixed(3)).join(', ')}] × [${srcFactor.map(v => v.toFixed(3)).join(', ')}] = [${src.map((v,i) => (v * srcFactor[i]).toFixed(3)).join(', ')}]<br>
                        Dest: [${dst.map(v => v.toFixed(3)).join(', ')}] × [${dstFactor.map(v => v.toFixed(3)).join(', ')}] = [${dst.map((v,i) => (v * dstFactor[i]).toFixed(3)).join(', ')}]
                    `;
                }
                
                this.updateUI(src, dst, result, formulaText, isSeparate);
            }
            
            updateUI(src, dst, result, formulaText, isSeparate) {
                // 색상 미리보기 업데이트
                const srcPreview = document.getElementById('srcPreview');
                const dstPreview = document.getElementById('dstPreview');
                const resultPreview = document.getElementById('resultPreview');
                
                if (srcPreview) {
                    srcPreview.style.backgroundColor = 
                        `rgba(${Math.round(src[0]*255)}, ${Math.round(src[1]*255)}, ${Math.round(src[2]*255)}, ${src[3]})`;
                }
                
                if (dstPreview) {
                    dstPreview.style.backgroundColor = 
                        `rgba(${Math.round(dst[0]*255)}, ${Math.round(dst[1]*255)}, ${Math.round(dst[2]*255)}, ${dst[3]})`;
                }
                
                if (resultPreview) {
                    resultPreview.style.backgroundColor = 
                        `rgba(${Math.round(result[0]*255)}, ${Math.round(result[1]*255)}, ${Math.round(result[2]*255)}, ${result[3]})`;
                }
                
                // 결과 값 업데이트
                const resultR = document.getElementById('resultR');
                const resultG = document.getElementById('resultG');
                const resultB = document.getElementById('resultB');
                const resultA = document.getElementById('resultA');
                
                if (resultR) resultR.textContent = result[0].toFixed(3);
                if (resultG) resultG.textContent = result[1].toFixed(3);
                if (resultB) resultB.textContent = result[2].toFixed(3);
                if (resultA) resultA.textContent = result[3].toFixed(3);
                
                // 공식 표시
                const formula = document.getElementById('formula');
                if (formula) {
                    formula.innerHTML = formulaText;
                }
            }
            

        }
        
        // 페이지 로드 시 도구 초기화
        window.addEventListener('load', () => {
            try {
                new WebGLBlendTool();
            } catch (error) {
                console.error('블렌딩 도구 초기화 실패:', error);
            }
        });
    </script>
</body>
</html>