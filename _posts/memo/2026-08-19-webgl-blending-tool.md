---
layout: default
title: "WebGL Blending Tool"
---

---

<!-- <!DOCTYPE html> -->
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WebGL Blending Tool</title>
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
            max-width: 1400px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            padding: 30px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        
        h1 {
            text-align: center;
            color: #333;
            margin-bottom: 30px;
            font-size: 2.5em;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        
        .main-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin-bottom: 30px;
        }
        
        .controls-section {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .preview-section {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .control-group {
            margin-bottom: 20px;
        }
        
        .control-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #555;
        }
        
        select, input[type="file"] {
            width: 100%;
            padding: 10px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 14px;
            transition: border-color 0.3s;
        }
        
        select:focus {
            outline: none;
            border-color: #667eea;
        }
        
        .file-input-wrapper {
            position: relative;
            overflow: hidden;
            display: inline-block;
            width: 100%;
        }
        
        .file-input-wrapper input[type=file] {
            position: absolute;
            left: -9999px;
        }
        
        .file-input-label {
            display: block;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 8px;
            cursor: pointer;
            text-align: center;
            transition: all 0.3s;
            border: 3px dashed rgba(255, 255, 255, 0.5);
            position: relative;
        }
        
        .file-input-label:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }
        
        .file-input-label.dragover {
            background: linear-gradient(135deg, #764ba2 0%, #f093fb 100%);
            border-color: white;
            transform: scale(1.02);
        }
        
        .file-input-label .drop-text {
            font-size: 12px;
            opacity: 0.9;
            margin-top: 5px;
        }
        
        .sub-controls {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-top: 15px;
        }
        
        .preview-images {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 20px;
        }
        
        .image-container {
            text-align: center;
        }
        
        .image-container h3 {
            margin-bottom: 10px;
            color: #666;
        }
        
        .image-container img, .image-container canvas {
            max-width: 100%;
            height: 200px;
            object-fit: contain;
            border: 2px solid #e0e0e0;
            border-radius: 10px;
            background: white;
        }
        
        #resultCanvas {
            width: 100%;
            height: 400px;
            border: 2px solid #e0e0e0;
            border-radius: 10px;
            background: white;
        }
        
        .equation-display {
            background: #2d3748;
            color: #63b3ed;
            padding: 20px;
            border-radius: 10px;
            font-family: 'Courier New', monospace;
            margin-top: 20px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .equation-display h3 {
            color: #ffd700;
            margin-bottom: 15px;
        }
        
        .equation-line {
            margin: 10px 0;
            font-size: 14px;
            line-height: 1.6;
        }
        
        .factor-name {
            color: #68d391;
            font-weight: bold;
        }
        
        .operator-name {
            color: #fbbf24;
            font-weight: bold;
        }
        
        .math-equation {
            background: #1a202c;
            padding: 15px;
            border-radius: 8px;
            margin-top: 20px;
            border: 1px solid #4a5568;
        }
        
        .math-equation h4 {
            color: #f687b3;
            margin-bottom: 10px;
            font-size: 14px;
        }
        
        .math-formula {
            color: #e2e8f0;
            font-family: 'Courier New', monospace;
            font-size: 13px;
            line-height: 1.8;
        }
        
        .math-symbol {
            color: #fbbf24;
            font-weight: bold;
        }
        
        .math-var {
            color: #9f7aea;
            font-style: italic;
        }
        
        .toggle-group {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
        }
        
        .toggle-btn {
            flex: 1;
            padding: 10px;
            background: #e0e0e0;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s;
            font-weight: 600;
        }
        
        .toggle-btn.active {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        
        .hidden {
            display: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>WebGL Blending Tool</h1>
        
        <div class="main-grid">
            <div class="controls-section">
                <h2>Controls</h2>
                
                <div class="control-group">
                    <label>Source Image:</label>
                    <div class="file-input-wrapper">
                        <input type="file" id="srcImage" accept="image/*">
                        <label for="srcImage" class="file-input-label" id="srcDropZone">
                            <div>Choose Source Image</div>
                            <div class="drop-text">or drag & drop here</div>
                        </label>
                    </div>
                </div>
                
                <div class="control-group">
                    <label>Destination Image:</label>
                    <div class="file-input-wrapper">
                        <input type="file" id="dstImage" accept="image/*">
                        <label for="dstImage" class="file-input-label" id="dstDropZone">
                            <div>Choose Destination Image</div>
                            <div class="drop-text">or drag & drop here</div>
                        </label>
                    </div>
                </div>
                
                <div class="control-group">
                    <label>Blend Function Type:</label>
                    <div class="toggle-group">
                        <button class="toggle-btn active" data-type="func">glBlendFunc</button>
                        <button class="toggle-btn" data-type="funcSeparate">glBlendFuncSeparate</button>
                    </div>
                </div>
                
                <div id="blendFuncControls">
                    <div class="sub-controls">
                        <div class="control-group">
                            <label>Source Factor:</label>
                            <select id="srcFactor">
                                <option value="0">ZERO</option>
                                <option value="1" selected>ONE</option>
                                <option value="768">SRC_COLOR</option>
                                <option value="769">ONE_MINUS_SRC_COLOR</option>
                                <option value="770">SRC_ALPHA</option>
                                <option value="771">ONE_MINUS_SRC_ALPHA</option>
                                <option value="772">DST_ALPHA</option>
                                <option value="773">ONE_MINUS_DST_ALPHA</option>
                                <option value="774">DST_COLOR</option>
                                <option value="775">ONE_MINUS_DST_COLOR</option>
                                <option value="776">SRC_ALPHA_SATURATE</option>
                                <option value="32769">CONSTANT_COLOR</option>
                                <option value="32770">ONE_MINUS_CONSTANT_COLOR</option>
                                <option value="32771">CONSTANT_ALPHA</option>
                                <option value="32772">ONE_MINUS_CONSTANT_ALPHA</option>
                            </select>
                        </div>
                        
                        <div class="control-group">
                            <label>Destination Factor:</label>
                            <select id="dstFactor">
                                <option value="0" selected>ZERO</option>
                                <option value="1">ONE</option>
                                <option value="768">SRC_COLOR</option>
                                <option value="769">ONE_MINUS_SRC_COLOR</option>
                                <option value="770">SRC_ALPHA</option>
                                <option value="771">ONE_MINUS_SRC_ALPHA</option>
                                <option value="772">DST_ALPHA</option>
                                <option value="773">ONE_MINUS_DST_ALPHA</option>
                                <option value="774">DST_COLOR</option>
                                <option value="775">ONE_MINUS_DST_COLOR</option>
                                <option value="32769">CONSTANT_COLOR</option>
                                <option value="32770">ONE_MINUS_CONSTANT_COLOR</option>
                                <option value="32771">CONSTANT_ALPHA</option>
                                <option value="32772">ONE_MINUS_CONSTANT_ALPHA</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <div id="blendFuncSeparateControls" class="hidden">
                    <div class="sub-controls">
                        <div class="control-group">
                            <label>Source RGB Factor:</label>
                            <select id="srcFactorRGB">
                                <option value="0">ZERO</option>
                                <option value="1" selected>ONE</option>
                                <option value="768">SRC_COLOR</option>
                                <option value="769">ONE_MINUS_SRC_COLOR</option>
                                <option value="770">SRC_ALPHA</option>
                                <option value="771">ONE_MINUS_SRC_ALPHA</option>
                                <option value="772">DST_ALPHA</option>
                                <option value="773">ONE_MINUS_DST_ALPHA</option>
                                <option value="774">DST_COLOR</option>
                                <option value="775">ONE_MINUS_DST_COLOR</option>
                                <option value="776">SRC_ALPHA_SATURATE</option>
                            </select>
                        </div>
                        
                        <div class="control-group">
                            <label>Destination RGB Factor:</label>
                            <select id="dstFactorRGB">
                                <option value="0" selected>ZERO</option>
                                <option value="1">ONE</option>
                                <option value="768">SRC_COLOR</option>
                                <option value="769">ONE_MINUS_SRC_COLOR</option>
                                <option value="770">SRC_ALPHA</option>
                                <option value="771">ONE_MINUS_SRC_ALPHA</option>
                                <option value="772">DST_ALPHA</option>
                                <option value="773">ONE_MINUS_DST_ALPHA</option>
                                <option value="774">DST_COLOR</option>
                                <option value="775">ONE_MINUS_DST_COLOR</option>
                            </select>
                        </div>
                        
                        <div class="control-group">
                            <label>Source Alpha Factor:</label>
                            <select id="srcFactorAlpha">
                                <option value="0">ZERO</option>
                                <option value="1" selected>ONE</option>
                                <option value="770">SRC_ALPHA</option>
                                <option value="771">ONE_MINUS_SRC_ALPHA</option>
                                <option value="772">DST_ALPHA</option>
                                <option value="773">ONE_MINUS_DST_ALPHA</option>
                                <option value="776">SRC_ALPHA_SATURATE</option>
                            </select>
                        </div>
                        
                        <div class="control-group">
                            <label>Destination Alpha Factor:</label>
                            <select id="dstFactorAlpha">
                                <option value="0" selected>ZERO</option>
                                <option value="1">ONE</option>
                                <option value="770">SRC_ALPHA</option>
                                <option value="771">ONE_MINUS_SRC_ALPHA</option>
                                <option value="772">DST_ALPHA</option>
                                <option value="773">ONE_MINUS_DST_ALPHA</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <div class="control-group">
                    <label>Blend Equation Type:</label>
                    <div class="toggle-group">
                        <button class="toggle-btn active" data-type="equation">glBlendEquation</button>
                        <button class="toggle-btn" data-type="equationSeparate">glBlendEquationSeparate</button>
                    </div>
                </div>
                
                <div id="blendEquationControls">
                    <div class="control-group">
                        <label>Blend Equation:</label>
                        <select id="blendEquation">
                            <option value="32774" selected>FUNC_ADD</option>
                            <option value="32778">FUNC_SUBTRACT</option>
                            <option value="32779">FUNC_REVERSE_SUBTRACT</option>
                            <option value="32775">MIN</option>
                            <option value="32776">MAX</option>
                        </select>
                    </div>
                </div>
                
                <div id="blendEquationSeparateControls" class="hidden">
                    <div class="sub-controls">
                        <div class="control-group">
                            <label>RGB Equation:</label>
                            <select id="blendEquationRGB">
                                <option value="32774" selected>FUNC_ADD</option>
                                <option value="32778">FUNC_SUBTRACT</option>
                                <option value="32779">FUNC_REVERSE_SUBTRACT</option>
                                <option value="32775">MIN</option>
                                <option value="32776">MAX</option>
                            </select>
                        </div>
                        
                        <div class="control-group">
                            <label>Alpha Equation:</label>
                            <select id="blendEquationAlpha">
                                <option value="32774" selected>FUNC_ADD</option>
                                <option value="32778">FUNC_SUBTRACT</option>
                                <option value="32779">FUNC_REVERSE_SUBTRACT</option>
                                <option value="32775">MIN</option>
                                <option value="32776">MAX</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <div class="control-group">
                    <label>Display Format:</label>
                    <select id="displayFormat">
                        <option value="rgba" selected>RGBA</option>
                        <option value="rgb">RGB</option>
                    </select>
                </div>
            </div>
            
            <div class="preview-section">
                <h2>Preview</h2>
                
                <div class="preview-images">
                    <div class="image-container">
                        <h3>Source</h3>
                        <img id="srcPreview" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999'%3ENo Image%3C/text%3E%3C/svg%3E" alt="Source">
                    </div>
                    <div class="image-container">
                        <h3>Destination</h3>
                        <img id="dstPreview" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999'%3ENo Image%3C/text%3E%3C/svg%3E" alt="Destination">
                    </div>
                </div>
                
                <div class="image-container">
                    <h3>Result</h3>
                    <canvas id="resultCanvas"></canvas>
                </div>
            </div>
        </div>
        
        <div class="equation-display">
            <h3>Blend Equation</h3>
            <div id="equationText">
                <div class="equation-line">Please load images and configure blend settings to see the equation.</div>
            </div>
        </div>
    </div>
    
    <script>
        // WebGL setup
        const canvas = document.getElementById('resultCanvas');
        const gl = canvas.getContext('webgl', { premultipliedAlpha: false });
        
        if (!gl) {
            alert('WebGL not supported!');
        }
        
        // Shader sources
        const vertexShaderSource = `
            attribute vec2 a_position;
            attribute vec2 a_texCoord;
            varying vec2 v_texCoord;
            
            void main() {
                gl_Position = vec4(a_position, 0.0, 1.0);
                v_texCoord = a_texCoord;
            }
        `;
        
        const fragmentShaderSource = `
            precision mediump float;
            uniform sampler2D u_texture;
            uniform float u_alpha;
            varying vec2 v_texCoord;
            
            void main() {
                vec4 color = texture2D(u_texture, v_texCoord);
                gl_FragColor = vec4(color.rgb, color.a * u_alpha);
            }
        `;
        
        // Create shader
        function createShader(gl, type, source) {
            const shader = gl.createShader(type);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error('Shader compile error:', gl.getShaderInfoLog(shader));
                gl.deleteShader(shader);
                return null;
            }
            
            return shader;
        }
        
        // Create program
        function createProgram(gl, vertexShader, fragmentShader) {
            const program = gl.createProgram();
            gl.attachShader(program, vertexShader);
            gl.attachShader(program, fragmentShader);
            gl.linkProgram(program);
            
            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                console.error('Program link error:', gl.getProgramInfoLog(program));
                gl.deleteProgram(program);
                return null;
            }
            
            return program;
        }
        
        // Setup WebGL
        const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
        const program = createProgram(gl, vertexShader, fragmentShader);
        
        // Get locations
        const positionLocation = gl.getAttribLocation(program, 'a_position');
        const texCoordLocation = gl.getAttribLocation(program, 'a_texCoord');
        const textureLocation = gl.getUniformLocation(program, 'u_texture');
        const alphaLocation = gl.getUniformLocation(program, 'u_alpha');
        
        // Create buffers
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            -1, -1,
             1, -1,
            -1,  1,
             1,  1,
        ]), gl.STATIC_DRAW);
        
        const texCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            0, 1,
            1, 1,
            0, 0,
            1, 0,
        ]), gl.STATIC_DRAW);
        
        // Image handling
        let srcTexture = null;
        let dstTexture = null;
        let srcImg = new Image();
        let dstImg = new Image();
        
        function createTexture(image) {
            const texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            return texture;
        }
        
        // File input handlers
        function handleImageFile(file, type) {
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    if (type === 'src') {
                        srcImg.onload = function() {
                            document.getElementById('srcPreview').src = srcImg.src;
                            srcTexture = createTexture(srcImg);
                            document.getElementById('srcDropZone').innerHTML = '<div>Source Image Loaded</div><div class="drop-text">drag & drop to replace</div>';
                            render();
                        };
                        srcImg.src = e.target.result;
                    } else {
                        dstImg.onload = function() {
                            document.getElementById('dstPreview').src = dstImg.src;
                            dstTexture = createTexture(dstImg);
                            document.getElementById('dstDropZone').innerHTML = '<div>Destination Image Loaded</div><div class="drop-text">drag & drop to replace</div>';
                            render();
                        };
                        dstImg.src = e.target.result;
                    }
                };
                reader.readAsDataURL(file);
            }
        }
        
        document.getElementById('srcImage').addEventListener('change', function(e) {
            const file = e.target.files[0];
            handleImageFile(file, 'src');
        });
        
        document.getElementById('dstImage').addEventListener('change', function(e) {
            const file = e.target.files[0];
            handleImageFile(file, 'dst');
        });
        
        // Drag and Drop functionality
        function setupDragAndDrop(dropZoneId, type) {
            const dropZone = document.getElementById(dropZoneId);
            
            // Prevent default drag behaviors
            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                dropZone.addEventListener(eventName, preventDefaults, false);
                document.body.addEventListener(eventName, preventDefaults, false);
            });
            
            function preventDefaults(e) {
                e.preventDefault();
                e.stopPropagation();
            }
            
            // Highlight drop zone when item is dragged over it
            ['dragenter', 'dragover'].forEach(eventName => {
                dropZone.addEventListener(eventName, highlight, false);
            });
            
            ['dragleave', 'drop'].forEach(eventName => {
                dropZone.addEventListener(eventName, unhighlight, false);
            });
            
            function highlight(e) {
                dropZone.classList.add('dragover');
            }
            
            function unhighlight(e) {
                dropZone.classList.remove('dragover');
            }
            
            // Handle dropped files
            dropZone.addEventListener('drop', handleDrop, false);
            
            function handleDrop(e) {
                const dt = e.dataTransfer;
                const files = dt.files;
                
                if (files.length > 0) {
                    handleImageFile(files[0], type);
                }
            }
        }
        
        // Setup drag and drop for both zones
        setupDragAndDrop('srcDropZone', 'src');
        setupDragAndDrop('dstDropZone', 'dst');
        
        // Toggle buttons
        document.querySelectorAll('.toggle-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const type = this.dataset.type;
                const parent = this.parentElement;
                
                parent.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                if (type === 'func' || type === 'funcSeparate') {
                    document.getElementById('blendFuncControls').classList.toggle('hidden', type !== 'func');
                    document.getElementById('blendFuncSeparateControls').classList.toggle('hidden', type !== 'funcSeparate');
                } else {
                    document.getElementById('blendEquationControls').classList.toggle('hidden', type !== 'equation');
                    document.getElementById('blendEquationSeparateControls').classList.toggle('hidden', type !== 'equationSeparate');
                }
                
                render();
            });
        });
        
        // Control change handlers
        document.querySelectorAll('select').forEach(select => {
            select.addEventListener('change', render);
        });
        
        // Get factor name
        function getFactorName(value) {
            const factors = {
                '0': 'ZERO',
                '1': 'ONE',
                '768': 'SRC_COLOR',
                '769': 'ONE_MINUS_SRC_COLOR',
                '770': 'SRC_ALPHA',
                '771': 'ONE_MINUS_SRC_ALPHA',
                '772': 'DST_ALPHA',
                '773': 'ONE_MINUS_DST_ALPHA',
                '774': 'DST_COLOR',
                '775': 'ONE_MINUS_DST_COLOR',
                '776': 'SRC_ALPHA_SATURATE',
                '32769': 'CONSTANT_COLOR',
                '32770': 'ONE_MINUS_CONSTANT_COLOR',
                '32771': 'CONSTANT_ALPHA',
                '32772': 'ONE_MINUS_CONSTANT_ALPHA'
            };
            return factors[value] || 'UNKNOWN';
        }
        
        // Get equation name
        function getEquationName(value) {
            const equations = {
                '32774': 'FUNC_ADD',
                '32778': 'FUNC_SUBTRACT',
                '32779': 'FUNC_REVERSE_SUBTRACT',
                '32775': 'MIN',
                '32776': 'MAX'
            };
            return equations[value] || 'UNKNOWN';
        }
        
        // Get factor formula
        function getFactorFormula(value, channel = 'color') {
            const factors = {
                '0': '0',
                '1': '1',
                '768': channel === 'color' ? 'S_c' : 'S_rgb',
                '769': channel === 'color' ? '(1 - S_c)' : '(1 - S_rgb)',
                '770': 'S_α',
                '771': '(1 - S_α)',
                '772': 'D_α',
                '773': '(1 - D_α)',
                '774': channel === 'color' ? 'D_c' : 'D_rgb',
                '775': channel === 'color' ? '(1 - D_c)' : '(1 - D_rgb)',
                '776': 'min(S_α, 1 - D_α)',
                '32769': 'C_c',
                '32770': '(1 - C_c)',
                '32771': 'C_α',
                '32772': '(1 - C_α)'
            };
            return factors[value] || '?';
        }
        
        // Get operator symbol
        function getOperatorSymbol(value) {
            const operators = {
                '32774': '+',
                '32778': '-',
                '32779': '-',  // reverse subtract
                '32775': 'min',
                '32776': 'max'
            };
            return operators[value] || '?';
        }
        
        // Update equation display
        function updateEquation() {
            const isFuncSeparate = document.querySelector('[data-type="funcSeparate"]').classList.contains('active');
            const isEquationSeparate = document.querySelector('[data-type="equationSeparate"]').classList.contains('active');
            const displayFormat = document.getElementById('displayFormat').value;
            
            let html = '';
            let mathHtml = '<div class="math-equation"><h4>Mathematical Formula:</h4><div class="math-formula">';
            
            if (isFuncSeparate) {
                const srcRGB = getFactorName(document.getElementById('srcFactorRGB').value);
                const dstRGB = getFactorName(document.getElementById('dstFactorRGB').value);
                const srcAlpha = getFactorName(document.getElementById('srcFactorAlpha').value);
                const dstAlpha = getFactorName(document.getElementById('dstFactorAlpha').value);
                
                const srcRGBFormula = getFactorFormula(document.getElementById('srcFactorRGB').value, 'rgb');
                const dstRGBFormula = getFactorFormula(document.getElementById('dstFactorRGB').value, 'rgb');
                const srcAlphaFormula = getFactorFormula(document.getElementById('srcFactorAlpha').value, 'alpha');
                const dstAlphaFormula = getFactorFormula(document.getElementById('dstFactorAlpha').value, 'alpha');
                
                if (isEquationSeparate) {
                    const eqRGB = getEquationName(document.getElementById('blendEquationRGB').value);
                    const eqAlpha = getEquationName(document.getElementById('blendEquationAlpha').value);
                    const eqRGBValue = document.getElementById('blendEquationRGB').value;
                    const eqAlphaValue = document.getElementById('blendEquationAlpha').value;
                    
                    html += `<div class="equation-line">RGB: Result = <span class="factor-name">${srcRGB}</span> × Source <span class="operator-name">${eqRGB}</span> <span class="factor-name">${dstRGB}</span> × Destination</div>`;
                    html += `<div class="equation-line">Alpha: Result = <span class="factor-name">${srcAlpha}</span> × Source <span class="operator-name">${eqAlpha}</span> <span class="factor-name">${dstAlpha}</span> × Destination</div>`;
                    
                    // Mathematical formula
                    if (eqRGBValue === '32775' || eqRGBValue === '32776') { // MIN or MAX
                        mathHtml += `<div><span class="math-var">R_out</span> = ${getOperatorSymbol(eqRGBValue)}(<span class="math-var">${srcRGBFormula}</span> <span class="math-symbol">×</span> <span class="math-var">S_r</span>, <span class="math-var">${dstRGBFormula}</span> <span class="math-symbol">×</span> <span class="math-var">D_r</span>)</div>`;
                        mathHtml += `<div><span class="math-var">G_out</span> = ${getOperatorSymbol(eqRGBValue)}(<span class="math-var">${srcRGBFormula}</span> <span class="math-symbol">×</span> <span class="math-var">S_g</span>, <span class="math-var">${dstRGBFormula}</span> <span class="math-symbol">×</span> <span class="math-var">D_g</span>)</div>`;
                        mathHtml += `<div><span class="math-var">B_out</span> = ${getOperatorSymbol(eqRGBValue)}(<span class="math-var">${srcRGBFormula}</span> <span class="math-symbol">×</span> <span class="math-var">S_b</span>, <span class="math-var">${dstRGBFormula}</span> <span class="math-symbol">×</span> <span class="math-var">D_b</span>)</div>`;
                    } else if (eqRGBValue === '32779') { // REVERSE_SUBTRACT
                        mathHtml += `<div><span class="math-var">RGB_out</span> = <span class="math-var">${dstRGBFormula}</span> <span class="math-symbol">×</span> <span class="math-var">D_rgb</span> <span class="math-symbol">-</span> <span class="math-var">${srcRGBFormula}</span> <span class="math-symbol">×</span> <span class="math-var">S_rgb</span></div>`;
                    } else {
                        mathHtml += `<div><span class="math-var">RGB_out</span> = <span class="math-var">${srcRGBFormula}</span> <span class="math-symbol">×</span> <span class="math-var">S_rgb</span> <span class="math-symbol">${getOperatorSymbol(eqRGBValue)}</span> <span class="math-var">${dstRGBFormula}</span> <span class="math-symbol">×</span> <span class="math-var">D_rgb</span></div>`;
                    }
                    
                    if (eqAlphaValue === '32775' || eqAlphaValue === '32776') { // MIN or MAX
                        mathHtml += `<div><span class="math-var">A_out</span> = ${getOperatorSymbol(eqAlphaValue)}(<span class="math-var">${srcAlphaFormula}</span> <span class="math-symbol">×</span> <span class="math-var">S_α</span>, <span class="math-var">${dstAlphaFormula}</span> <span class="math-symbol">×</span> <span class="math-var">D_α</span>)</div>`;
                    } else if (eqAlphaValue === '32779') { // REVERSE_SUBTRACT
                        mathHtml += `<div><span class="math-var">A_out</span> = <span class="math-var">${dstAlphaFormula}</span> <span class="math-symbol">×</span> <span class="math-var">D_α</span> <span class="math-symbol">-</span> <span class="math-var">${srcAlphaFormula}</span> <span class="math-symbol">×</span> <span class="math-var">S_α</span></div>`;
                    } else {
                        mathHtml += `<div><span class="math-var">A_out</span> = <span class="math-var">${srcAlphaFormula}</span> <span class="math-symbol">×</span> <span class="math-var">S_α</span> <span class="math-symbol">${getOperatorSymbol(eqAlphaValue)}</span> <span class="math-var">${dstAlphaFormula}</span> <span class="math-symbol">×</span> <span class="math-var">D_α</span></div>`;
                    }
                } else {
                    const eq = getEquationName(document.getElementById('blendEquation').value);
                    const eqValue = document.getElementById('blendEquation').value;
                    
                    html += `<div class="equation-line">RGB: Result = <span class="factor-name">${srcRGB}</span> × Source <span class="operator-name">${eq}</span> <span class="factor-name">${dstRGB}</span> × Destination</div>`;
                    html += `<div class="equation-line">Alpha: Result = <span class="factor-name">${srcAlpha}</span> × Source <span class="operator-name">${eq}</span> <span class="factor-name">${dstAlpha}</span> × Destination</div>`;
                    
                    // Mathematical formula
                    if (eqValue === '32775' || eqValue === '32776') { // MIN or MAX
                        mathHtml += `<div><span class="math-var">RGB_out</span> = ${getOperatorSymbol(eqValue)}(<span class="math-var">${srcRGBFormula}</span> <span class="math-symbol">×</span> <span class="math-var">S_rgb</span>, <span class="math-var">${dstRGBFormula}</span> <span class="math-symbol">×</span> <span class="math-var">D_rgb</span>)</div>`;
                        mathHtml += `<div><span class="math-var">A_out</span> = ${getOperatorSymbol(eqValue)}(<span class="math-var">${srcAlphaFormula}</span> <span class="math-symbol">×</span> <span class="math-var">S_α</span>, <span class="math-var">${dstAlphaFormula}</span> <span class="math-symbol">×</span> <span class="math-var">D_α</span>)</div>`;
                    } else if (eqValue === '32779') { // REVERSE_SUBTRACT
                        mathHtml += `<div><span class="math-var">RGB_out</span> = <span class="math-var">${dstRGBFormula}</span> <span class="math-symbol">×</span> <span class="math-var">D_rgb</span> <span class="math-symbol">-</span> <span class="math-var">${srcRGBFormula}</span> <span class="math-symbol">×</span> <span class="math-var">S_rgb</span></div>`;
                        mathHtml += `<div><span class="math-var">A_out</span> = <span class="math-var">${dstAlphaFormula}</span> <span class="math-symbol">×</span> <span class="math-var">D_α</span> <span class="math-symbol">-</span> <span class="math-var">${srcAlphaFormula}</span> <span class="math-symbol">×</span> <span class="math-var">S_α</span></div>`;
                    } else {
                        mathHtml += `<div><span class="math-var">RGB_out</span> = <span class="math-var">${srcRGBFormula}</span> <span class="math-symbol">×</span> <span class="math-var">S_rgb</span> <span class="math-symbol">${getOperatorSymbol(eqValue)}</span> <span class="math-var">${dstRGBFormula}</span> <span class="math-symbol">×</span> <span class="math-var">D_rgb</span></div>`;
                        mathHtml += `<div><span class="math-var">A_out</span> = <span class="math-var">${srcAlphaFormula}</span> <span class="math-symbol">×</span> <span class="math-var">S_α</span> <span class="math-symbol">${getOperatorSymbol(eqValue)}</span> <span class="math-var">${dstAlphaFormula}</span> <span class="math-symbol">×</span> <span class="math-var">D_α</span></div>`;
                    }
                }
            } else {
                const src = getFactorName(document.getElementById('srcFactor').value);
                const dst = getFactorName(document.getElementById('dstFactor').value);
                const srcFormula = getFactorFormula(document.getElementById('srcFactor').value, 'color');
                const dstFormula = getFactorFormula(document.getElementById('dstFactor').value, 'color');
                
                if (isEquationSeparate) {
                    const eqRGB = getEquationName(document.getElementById('blendEquationRGB').value);
                    const eqAlpha = getEquationName(document.getElementById('blendEquationAlpha').value);
                    const eqRGBValue = document.getElementById('blendEquationRGB').value;
                    const eqAlphaValue = document.getElementById('blendEquationAlpha').value;
                    
                    html += `<div class="equation-line">RGB: Result = <span class="factor-name">${src}</span> × Source <span class="operator-name">${eqRGB}</span> <span class="factor-name">${dst}</span> × Destination</div>`;
                    html += `<div class="equation-line">Alpha: Result = <span class="factor-name">${src}</span> × Source <span class="operator-name">${eqAlpha}</span> <span class="factor-name">${dst}</span> × Destination</div>`;
                    
                    // Mathematical formula
                    if (eqRGBValue === '32775' || eqRGBValue === '32776') { // MIN or MAX
                        mathHtml += `<div><span class="math-var">RGB_out</span> = ${getOperatorSymbol(eqRGBValue)}(<span class="math-var">${srcFormula}</span> <span class="math-symbol">×</span> <span class="math-var">S_rgb</span>, <span class="math-var">${dstFormula}</span> <span class="math-symbol">×</span> <span class="math-var">D_rgb</span>)</div>`;
                    } else if (eqRGBValue === '32779') { // REVERSE_SUBTRACT
                        mathHtml += `<div><span class="math-var">RGB_out</span> = <span class="math-var">${dstFormula}</span> <span class="math-symbol">×</span> <span class="math-var">D_rgb</span> <span class="math-symbol">-</span> <span class="math-var">${srcFormula}</span> <span class="math-symbol">×</span> <span class="math-var">S_rgb</span></div>`;
                    } else {
                        mathHtml += `<div><span class="math-var">RGB_out</span> = <span class="math-var">${srcFormula}</span> <span class="math-symbol">×</span> <span class="math-var">S_rgb</span> <span class="math-symbol">${getOperatorSymbol(eqRGBValue)}</span> <span class="math-var">${dstFormula}</span> <span class="math-symbol">×</span> <span class="math-var">D_rgb</span></div>`;
                    }
                    
                    if (eqAlphaValue === '32775' || eqAlphaValue === '32776') { // MIN or MAX
                        mathHtml += `<div><span class="math-var">A_out</span> = ${getOperatorSymbol(eqAlphaValue)}(<span class="math-var">${srcFormula}</span> <span class="math-symbol">×</span> <span class="math-var">S_α</span>, <span class="math-var">${dstFormula}</span> <span class="math-symbol">×</span> <span class="math-var">D_α</span>)</div>`;
                    } else if (eqAlphaValue === '32779') { // REVERSE_SUBTRACT
                        mathHtml += `<div><span class="math-var">A_out</span> = <span class="math-var">${dstFormula}</span> <span class="math-symbol">×</span> <span class="math-var">D_α</span> <span class="math-symbol">-</span> <span class="math-var">${srcFormula}</span> <span class="math-symbol">×</span> <span class="math-var">S_α</span></div>`;
                    } else {
                        mathHtml += `<div><span class="math-var">A_out</span> = <span class="math-var">${srcFormula}</span> <span class="math-symbol">×</span> <span class="math-var">S_α</span> <span class="math-symbol">${getOperatorSymbol(eqAlphaValue)}</span> <span class="math-var">${dstFormula}</span> <span class="math-symbol">×</span> <span class="math-var">D_α</span></div>`;
                    }
                } else {
                    const eq = getEquationName(document.getElementById('blendEquation').value);
                    const eqValue = document.getElementById('blendEquation').value;
                    
                    html += `<div class="equation-line">RGBA: Result = <span class="factor-name">${src}</span> × Source <span class="operator-name">${eq}</span> <span class="factor-name">${dst}</span> × Destination</div>`;
                    
                    // Mathematical formula
                    if (eqValue === '32775' || eqValue === '32776') { // MIN or MAX
                        mathHtml += `<div><span class="math-var">RGBA_out</span> = ${getOperatorSymbol(eqValue)}(<span class="math-var">${srcFormula}</span> <span class="math-symbol">×</span> <span class="math-var">S_c</span>, <span class="math-var">${dstFormula}</span> <span class="math-symbol">×</span> <span class="math-var">D_c</span>)</div>`;
                    } else if (eqValue === '32779') { // REVERSE_SUBTRACT
                        mathHtml += `<div><span class="math-var">RGBA_out</span> = <span class="math-var">${dstFormula}</span> <span class="math-symbol">×</span> <span class="math-var">D_c</span> <span class="math-symbol">-</span> <span class="math-var">${srcFormula}</span> <span class="math-symbol">×</span> <span class="math-var">S_c</span></div>`;
                    } else {
                        mathHtml += `<div><span class="math-var">RGBA_out</span> = <span class="math-var">${srcFormula}</span> <span class="math-symbol">×</span> <span class="math-var">S_c</span> <span class="math-symbol">${getOperatorSymbol(eqValue)}</span> <span class="math-var">${dstFormula}</span> <span class="math-symbol">×</span> <span class="math-var">D_c</span></div>`;
                    }
                }
            }
            
            mathHtml += '<div style="margin-top: 15px; font-size: 11px; color: #718096;">';
            mathHtml += '<div>Where:</div>';
            mathHtml += '<div>• S = Source pixel, D = Destination pixel</div>';
            mathHtml += '<div>• c = color channel (r, g, b, or a), rgb = RGB channels, α = alpha channel</div>';
            mathHtml += '<div>• C = Constant color/alpha (if using CONSTANT factors)</div>';
            mathHtml += '</div>';
            
            mathHtml += '</div></div>';
            
            html += `<div class="equation-line" style="margin-top: 15px; color: #a0aec0;">Display Format: <span style="color: #f687b3">${displayFormat.toUpperCase()}</span></div>`;
            html += mathHtml;
            
            document.getElementById('equationText').innerHTML = html;
        }
        
        // Render function
        function render() {
            if (!srcTexture || !dstTexture) {
                updateEquation();
                return;
            }
            
            // Resize canvas
            const maxWidth = Math.max(srcImg.width, dstImg.width);
            const maxHeight = Math.max(srcImg.height, dstImg.height);
            canvas.width = maxWidth;
            canvas.height = maxHeight;
            
            gl.viewport(0, 0, canvas.width, canvas.height);
            
            // Clear canvas
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);
            
            // Use program
            gl.useProgram(program);
            
            // Setup attributes
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.enableVertexAttribArray(positionLocation);
            gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
            
            gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
            gl.enableVertexAttribArray(texCoordLocation);
            gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);
            
            // Get blend settings
            const isFuncSeparate = document.querySelector('[data-type="funcSeparate"]').classList.contains('active');
            const isEquationSeparate = document.querySelector('[data-type="equationSeparate"]').classList.contains('active');
            const displayFormat = document.getElementById('displayFormat').value;
            
            // Disable blending for first pass (destination)
            gl.disable(gl.BLEND);
            
            // Draw destination image first
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, dstTexture);
            gl.uniform1i(textureLocation, 0);
            gl.uniform1f(alphaLocation, 1.0);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            
            // Enable blending for second pass (source)
            gl.enable(gl.BLEND);
            
            // Set blend function
            if (isFuncSeparate) {
                const srcRGB = parseInt(document.getElementById('srcFactorRGB').value);
                const dstRGB = parseInt(document.getElementById('dstFactorRGB').value);
                const srcAlpha = parseInt(document.getElementById('srcFactorAlpha').value);
                const dstAlpha = parseInt(document.getElementById('dstFactorAlpha').value);
                gl.blendFuncSeparate(srcRGB, dstRGB, srcAlpha, dstAlpha);
            } else {
                const src = parseInt(document.getElementById('srcFactor').value);
                const dst = parseInt(document.getElementById('dstFactor').value);
                gl.blendFunc(src, dst);
            }
            
            // Set blend equation
            if (isEquationSeparate) {
                const eqRGB = parseInt(document.getElementById('blendEquationRGB').value);
                const eqAlpha = parseInt(document.getElementById('blendEquationAlpha').value);
                gl.blendEquationSeparate(eqRGB, eqAlpha);
            } else {
                const eq = parseInt(document.getElementById('blendEquation').value);
                gl.blendEquation(eq);
            }
            
            // Draw source image with blending
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, srcTexture);
            gl.uniform1i(textureLocation, 0);
            
            // Adjust alpha based on display format
            if (displayFormat === 'rgb') {
                gl.uniform1f(alphaLocation, 1.0);
                gl.colorMask(true, true, true, false);
            } else {
                gl.uniform1f(alphaLocation, 1.0);
                gl.colorMask(true, true, true, true);
            }
            
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            
            // Reset color mask
            gl.colorMask(true, true, true, true);
            
            // Update equation display
            updateEquation();
        }
        
        // Load default gradient images for demo
        function createGradientImage(colors, isVertical = false) {
            const canvas = document.createElement('canvas');
            canvas.width = 256;
            canvas.height = 256;
            const ctx = canvas.getContext('2d');
            
            const gradient = isVertical 
                ? ctx.createLinearGradient(0, 0, 0, 256)
                : ctx.createLinearGradient(0, 0, 256, 0);
            
            colors.forEach((color, i) => {
                gradient.addColorStop(i / (colors.length - 1), color);
            });
            
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 256, 256);
            
            return canvas;
        }
        
        // Create default images
        function loadDefaultImages() {
            // Create source image (red to yellow gradient with transparency)
            const srcCanvas = createGradientImage(['rgba(255,0,0,0.8)', 'rgba(255,255,0,0.8)'], false);
            srcImg.onload = function() {
                document.getElementById('srcPreview').src = srcImg.src;
                srcTexture = createTexture(srcImg);
                render();
            };
            srcImg.src = srcCanvas.toDataURL();
            
            // Create destination image (blue to green gradient)
            const dstCanvas = createGradientImage(['rgba(0,0,255,1)', 'rgba(0,255,0,1)'], true);
            dstImg.onload = function() {
                document.getElementById('dstPreview').src = dstImg.src;
                dstTexture = createTexture(dstImg);
                render();
            };
            dstImg.src = dstCanvas.toDataURL();
        }
        
        // Initialize with default images
        loadDefaultImages();
    </script>
</body>
</html>