---
layout: default
title: "Arithmetic Circuits"
---

---
이 글은 정수와 소수가 회로에서 연산되는 과정을 비주얼적으로 표시한것이다. Claude Sonnet 4로 생성하였다.

<!-- <!DOCTYPE html> -->
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>정수 및 소수점 연산 회로</title>
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
        
        .circuit-section {
            margin-bottom: 50px;
            padding: 30px;
            background: #f8f9fa;
            border-radius: 15px;
            border-left: 5px solid #3498db;
        }
        
        .circuit-title {
            font-size: 1.8em;
            color: #2980b9;
            margin-bottom: 25px;
            font-weight: bold;
        }
        
        .circuit-canvas {
            width: 100%;
            height: 500px;
            border: 2px solid #34495e;
            border-radius: 10px;
            background: #ffffff;
            margin-bottom: 20px;
        }
        
        .controls {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-bottom: 20px;
            flex-wrap: wrap;
        }
        
        .control-group {
            display: flex;
            align-items: center;
            gap: 8px;
            background: white;
            padding: 10px 15px;
            border-radius: 25px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .control-group label {
            font-weight: 600;
            color: #2c3e50;
        }
        
        .control-group input, .control-group select {
            padding: 5px 10px;
            border: 1px solid #bdc3c7;
            border-radius: 5px;
            font-size: 14px;
        }
        
        button {
            padding: 10px 20px;
            background: linear-gradient(45deg, #3498db, #2980b9);
            color: white;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
        }
        
        button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(52, 152, 219, 0.4);
        }
        
        .description {
            background: #e8f4fd;
            padding: 20px;
            border-radius: 10px;
            border-left: 4px solid #3498db;
            margin-top: 20px;
        }
        
        .description h3 {
            color: #2980b9;
            margin-top: 0;
        }
        
        .signal {
            animation: pulse 1.5s ease-in-out infinite alternate;
        }
        
        @keyframes pulse {
            from { opacity: 0.6; }
            to { opacity: 1; }
        }
        
        .result-display {
            background: #2c3e50;
            color: #ecf0f1;
            padding: 15px;
            border-radius: 10px;
            font-family: 'Courier New', monospace;
            font-size: 16px;
            margin-top: 15px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔢 정수 및 소수점 연산 회로</h1>
        
        <!-- 정수 연산 회로 -->
        <div class="circuit-section">
            <div class="circuit-title">1. 정수 연산 회로 (Integer Arithmetic Circuit)</div>
            <div class="controls">
                <div class="control-group">
                    <label>A:</label>
                    <input type="number" id="intA" value="12" min="0" max="255">
                </div>
                <div class="control-group">
                    <label>B:</label>
                    <input type="number" id="intB" value="8" min="1" max="255">
                </div>
                <div class="control-group">
                    <label>연산:</label>
                    <select id="intOperation">
                        <option value="add">덧셈</option>
                        <option value="sub">뺄셈</option>
                        <option value="mul">곱셈</option>
                        <option value="div">나눗셈</option>
                    </select>
                </div>
                <button onclick="updateIntegerCircuit()">계산하기</button>
            </div>
            <canvas id="integerCanvas" class="circuit-canvas"></canvas>
            <div class="result-display" id="integerResult">결과: 20 (이진수: 10100)</div>
            <div class="description">
                <h3>정수 연산 회로 구성 요소:</h3>
                <p><strong>덧셈:</strong> 전가산기(Full Adder)를 병렬 연결한 병렬 가산기</p>
                <p><strong>뺄셈:</strong> 2의 보수를 이용한 가산기 (B의 비트 반전 + 1)</p>
                <p><strong>곱셈:</strong> 부분곱 생성기와 가산기 배열을 이용한 곱셈기</p>
                <p><strong>나눗셈:</strong> 비복원 나눗셈 알고리즘을 사용한 순차 나눗셈기</p>
            </div>
        </div>
        
        <!-- 소수점 연산 회로 -->
        <div class="circuit-section">
            <div class="circuit-title">2. 부동소수점 연산 회로 (Floating-Point Arithmetic Circuit)</div>
            <div class="controls">
                <div class="control-group">
                    <label>A:</label>
                    <input type="number" id="floatA" value="3.25" step="0.01">
                </div>
                <div class="control-group">
                    <label>B:</label>
                    <input type="number" id="floatB" value="1.5" step="0.01">
                </div>
                <div class="control-group">
                    <label>연산:</label>
                    <select id="operation">
                        <option value="add">덧셈</option>
                        <option value="sub">뺄셈</option>
                        <option value="mul">곱셈</option>
                        <option value="div">나눗셈</option>
                    </select>
                </div>
                <button onclick="updateFloatCircuit()">계산하기</button>
            </div>
            <canvas id="floatCanvas" class="circuit-canvas"></canvas>
            <div class="result-display" id="floatResult">결과: 4.75</div>
            <div class="description">
                <h3>부동소수점 연산 회로 구성 요소:</h3>
                <p><strong>지수 비교기:</strong> 두 수의 지수를 비교하여 가수부 정렬을 위한 시프트 양을 결정합니다.</p>
                <p><strong>가수부 정렬기:</strong> 지수가 작은 수의 가수부를 오른쪽으로 시프트합니다.</p>
                <p><strong>가수부 연산기:</strong> 정렬된 가수부들을 덧셈 또는 뺄셈합니다.</p>
                <p><strong>정규화기:</strong> 결과를 IEEE 754 표준에 맞게 정규화합니다.</p>
            </div>
        </div>
    </div>

    <script>
        // 캔버스 초기화
        const intCanvas = document.getElementById('integerCanvas');
        const intCtx = intCanvas.getContext('2d');
        const floatCanvas = document.getElementById('floatCanvas');
        const floatCtx = floatCanvas.getContext('2d');
        
        // 캔버스 크기 설정
        function resizeCanvas(canvas) {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }
        
        resizeCanvas(intCanvas);
        resizeCanvas(floatCanvas);
        
        // 정수 회로 그리기
        function drawIntegerCircuit() {
            const ctx = intCtx;
            const width = intCanvas.width;
            const height = intCanvas.height;
            
            ctx.clearRect(0, 0, width, height);
            drawGrid(ctx, width, height);
            
            const a = parseInt(document.getElementById('intA').value) || 0;
            const b = parseInt(document.getElementById('intB').value) || 1;
            const op = document.getElementById('intOperation').value;
            
            let result, opName, opSymbol;
            switch(op) {
                case 'add': 
                    result = a + b; 
                    opName = '덧셈 회로 (Adder)';
                    opSymbol = '+';
                    break;
                case 'sub': 
                    result = a - b; 
                    opName = '뺄셈 회로 (Subtractor)';
                    opSymbol = '-';
                    break;
                case 'mul': 
                    result = a * b; 
                    opName = '곱셈 회로 (Multiplier)';
                    opSymbol = '×';
                    break;
                case 'div': 
                    result = Math.floor(a / b); 
                    opName = '나눗셈 회로 (Divider)';
                    opSymbol = '÷';
                    break;
            }
            
            // 8비트로 제한
            const aBin = (a & 0xFF).toString(2).padStart(8, '0');
            const bBin = (b & 0xFF).toString(2).padStart(8, '0');
            
            // 제목
            ctx.fillStyle = '#2c3e50';
            ctx.font = 'bold 16px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(opName, width/2, 30);
            
            // 입력 표시
            ctx.font = '14px Arial';
            ctx.textAlign = 'left';
            ctx.fillText(`A = ${a} (${aBin})`, 50, 70);
            ctx.fillText(`B = ${b} (${bBin})`, 50, 90);
            
            // 연산별 회로 그리기
            switch(op) {
                case 'add':
                    drawAdderCircuit(ctx, width, height, a, b, result);
                    break;
                case 'sub':
                    drawSubtractorCircuit(ctx, width, height, a, b, result);
                    break;
                case 'mul':
                    drawMultiplierCircuit(ctx, width, height, a, b, result);
                    break;
                case 'div':
                    drawDividerCircuit(ctx, width, height, a, b, result);
                    break;
            }
            
            // 결과 표시
            const resultBin = result >= 0 ? result.toString(2) : (result >>> 0).toString(2);
            ctx.fillStyle = '#27ae60';
            ctx.font = 'bold 16px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(`결과: ${result} (${resultBin})`, width/2, height - 30);
        }
        
        function drawAdderCircuit(ctx, width, height, a, b, result) {
            const aBin = (a & 0xFF).toString(2).padStart(8, '0');
            const bBin = (b & 0xFF).toString(2).padStart(8, '0');
            
            const startX = 100;
            const startY = 150;
            const spacing = 80;
            
            // 단계별 계산 과정 표시
            ctx.fillStyle = '#2980b9';
            ctx.font = 'bold 12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('비트별 덧셈 과정', width/2, 120);
            
            let carry = 0;
            let stepResults = [];
            
            for (let i = 7; i >= 0; i--) {
                const x = startX + (7-i) * spacing;
                const y = startY;
                
                const bitA = parseInt(aBin[i]);
                const bitB = parseInt(bBin[i]);
                const sum = (bitA + bitB + carry) % 2;
                const newCarry = Math.floor((bitA + bitB + carry) / 2);
                
                // 각 단계의 계산 과정 저장
                stepResults.push({
                    bit: 7-i,
                    a: bitA,
                    b: bitB,
                    carryIn: carry,
                    sum: sum,
                    carryOut: newCarry,
                    calculation: `${bitA} + ${bitB} + ${carry} = ${bitA + bitB + carry}`
                });
                
                drawFullAdder(ctx, x, y, bitA, bitB, carry, sum, newCarry);
                
                // 중간 계산 과정 표시
                ctx.fillStyle = '#e67e22';
                ctx.font = '9px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(`${bitA}+${bitB}+${carry}=${bitA + bitB + carry}`, x, y + 55);
                ctx.fillText(`S=${sum}, C=${newCarry}`, x, y + 65);
                
                carry = newCarry;
            }
            
            // 최종 캐리 표시
            if (carry) {
                ctx.fillStyle = '#e74c3c';
                ctx.font = 'bold 14px Arial';
                ctx.textAlign = 'center';
                ctx.fillText('최종 캐리', startX + 8 * spacing, startY - 30);
                ctx.fillText(carry.toString(), startX + 8 * spacing, startY - 10);
            }
            
            // 단계별 결과 표시
            ctx.fillStyle = '#27ae60';
            ctx.font = '11px Arial';
            ctx.textAlign = 'left';
            ctx.fillText('단계별 계산:', 50, height - 120);
            
            for (let i = 0; i < Math.min(stepResults.length, 4); i++) {
                const step = stepResults[i];
                ctx.fillText(`비트${step.bit}: ${step.calculation} → 합=${step.sum}, 캐리=${step.carryOut}`, 
                    50, height - 100 + i * 15);
            }
        }
        
        function drawSubtractorCircuit(ctx, width, height, a, b, result) {
            const aBin = (a & 0xFF).toString(2).padStart(8, '0');
            const bBin = (b & 0xFF).toString(2).padStart(8, '0');
            
            // 2의 보수 계산 과정
            const notB = (~b & 0xFF);
            const notBBin = notB.toString(2).padStart(8, '0');
            const twosCompB = (notB + 1) & 0xFF;
            const twosCompBBin = twosCompB.toString(2).padStart(8, '0');
            
            const startX = 120;
            const startY = 140;
            
            // 단계 1: 원본 B 표시
            ctx.fillStyle = '#3498db';
            ctx.font = 'bold 12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('단계 1: 원본 B', startX, startY - 40);
            ctx.font = '11px Arial';
            ctx.fillText(`B = ${b} (${bBin})`, startX, startY - 25);
            
            // 단계 2: NOT 연산
            ctx.fillStyle = '#e67e22';
            ctx.font = 'bold 12px Arial';
            ctx.fillText('단계 2: 비트 반전 (~B)', startX + 200, startY - 40);
            ctx.font = '11px Arial';
            ctx.fillText(`~B = ${notB} (${notBBin})`, startX + 200, startY - 25);
            
            // NOT 게이트들과 변화 과정 표시
            for (let i = 0; i < 8; i++) {
                const x = startX - 100 + i * 30;
                const y = startY;
                drawNOTGate(ctx, x, y);
                
                // 입력과 출력 값 표시
                ctx.fillStyle = bBin[i] === '1' ? '#e74c3c' : '#7f8c8d';
                ctx.font = '10px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(bBin[i], x, y - 15);
                
                ctx.fillStyle = notBBin[i] === '1' ? '#e74c3c' : '#7f8c8d';
                ctx.fillText(notBBin[i], x, y + 20);
            }
            
            // 단계 3: +1 추가
            ctx.fillStyle = '#9b59b6';
            ctx.font = 'bold 12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('단계 3: +1 추가', startX + 400, startY - 40);
            ctx.font = '11px Arial';
            ctx.fillText(`~B + 1 = ${twosCompB} (${twosCompBBin})`, startX + 400, startY - 25);
            
            ctx.strokeStyle = '#9b59b6';
            ctx.lineWidth = 2;
            ctx.strokeRect(startX + 350, startY - 10, 100, 25);
            ctx.fillStyle = '#9b59b6';
            ctx.fillText('+1 가산기', startX + 400, startY + 5);
            
            // 단계 4: 최종 덧셈
            ctx.fillStyle = '#27ae60';
            ctx.font = 'bold 12px Arial';
            ctx.fillText('단계 4: A + (~B + 1)', startX + 200, startY + 60);
            ctx.font = '11px Arial';
            ctx.fillText(`${a} + ${twosCompB} = ${result}`, startX + 200, startY + 75);
            
            ctx.strokeStyle = '#27ae60';
            ctx.strokeRect(startX + 150, startY + 85, 100, 30);
            ctx.fillStyle = '#27ae60';
            ctx.fillText('최종 가산기', startX + 200, startY + 103);
            
            // 과정 요약
            ctx.fillStyle = '#2c3e50';
            ctx.font = '11px Arial';
            ctx.textAlign = 'left';
            ctx.fillText('계산 과정:', 50, height - 80);
            ctx.fillText(`1. B = ${b} → 2. ~B = ${notB} → 3. ~B+1 = ${twosCompB} → 4. A + (B의 2의보수) = ${a} + ${twosCompB} = ${result}`, 50, height - 65);
        }
        
        function drawMultiplierCircuit(ctx, width, height, a, b, result) {
            const aBin = (a & 0xFF).toString(2).padStart(8, '0');
            const bBin = (b & 0xFF).toString(2).padStart(8, '0');
            
            const startX = 150;
            const startY = 130;
            
            // 부분곱 계산 과정
            ctx.fillStyle = '#9b59b6';
            ctx.font = 'bold 12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('부분곱 생성 과정', startX + 100, startY - 30);
            
            // 간단한 4비트 x 4비트 곱셈으로 시연
            const a4 = a & 0x0F;
            const b4 = b & 0x0F;
            const a4Bin = a4.toString(2).padStart(4, '0');
            const b4Bin = b4.toString(2).padStart(4, '0');
            
            ctx.font = '11px Arial';
            ctx.textAlign = 'left';
            ctx.fillText(`A(4비트) = ${a4} (${a4Bin})`, 50, startY - 10);
            ctx.fillText(`B(4비트) = ${b4} (${b4Bin})`, 50, startY + 5);
            
            // 부분곱들 계산 및 표시
            let partialProducts = [];
            for (let i = 0; i < 4; i++) {
                let partialProduct = 0;
                if (b4Bin[3-i] === '1') {
                    partialProduct = a4 << i;
                }
                partialProducts.push(partialProduct);
                
                // 부분곱 표시
                ctx.fillStyle = partialProduct > 0 ? '#e74c3c' : '#7f8c8d';
                ctx.fillText(`부분곱 ${i}: ${a4Bin} × ${b4Bin[3-i]} × 2^${i} = ${partialProduct} (${partialProduct.toString(2).padStart(8, '0')})`, 
                    50, startY + 30 + i * 15);
            }
            
            // AND 게이트 배열로 부분곱 시각화
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    const x = startX + 200 + j * 25;
                    const y = startY + i * 20;
                    const aBit = parseInt(a4Bin[3-j]);
                    const bBit = parseInt(b4Bin[3-i]);
                    const product = aBit & bBit;
                    
                    drawANDGate(ctx, x, y, 12);
                    
                    // 입력 및 출력 표시
                    ctx.fillStyle = aBit ? '#e74c3c' : '#7f8c8d';
                    ctx.font = '8px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText(aBit.toString(), x - 8, y - 8);
                    
                    ctx.fillStyle = bBit ? '#e74c3c' : '#7f8c8d';
                    ctx.fillText(bBit.toString(), x + 8, y - 8);
                    
                    ctx.fillStyle = product ? '#e74c3c' : '#7f8c8d';
                    ctx.fillText(product.toString(), x, y + 15);
                }
            }
            
            // 부분곱 합계 과정
            ctx.fillStyle = '#27ae60';
            ctx.font = 'bold 12px Arial';
            ctx.textAlign = 'left';
            ctx.fillText('부분곱 합계:', 50, startY + 100);
            
            let runningSum = 0;
            for (let i = 0; i < partialProducts.length; i++) {
                runningSum += partialProducts[i];
                ctx.font = '10px Arial';
                ctx.fillText(`${i === 0 ? '' : '+ '}${partialProducts[i]} = ${runningSum}`, 50 + i * 80, startY + 115);
            }
            
            ctx.fillStyle = '#27ae60';
            ctx.font = 'bold 11px Arial';
            ctx.fillText(`최종 결과: ${a4} × ${b4} = ${runningSum}`, 50, startY + 135);
        }
        
        function drawDividerCircuit(ctx, width, height, a, b, result) {
            const quotient = Math.floor(a / b);
            const remainder = a % b;
            
            const startX = 200;
            const startY = 130;
            
            // 나눗셈 과정 단계별 표시
            ctx.fillStyle = '#e74c3c';
            ctx.font = 'bold 12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('장제법 나눗셈 과정', startX, startY - 40);
            
            // 나눗셈 단계들 시뮬레이션
            let dividend = a;
            let divisor = b;
            let steps = [];
            let tempQuotient = 0;
            
            ctx.font = '11px Arial';
            ctx.textAlign = 'left';
            ctx.fillStyle = '#2c3e50';
            ctx.fillText(`피제수: ${a}, 제수: ${b}`, 50, startY - 15);
            
            // 간단한 나눗셈 과정 시뮬레이션
            let currentDividend = dividend;
            let currentQuotient = 0;
            let stepCount = 0;
            
            while (currentDividend >= divisor && stepCount < 8) {
                let stepQuotient = Math.floor(currentDividend / divisor);
                let stepRemainder = currentDividend % divisor;
                
                steps.push({
                    step: stepCount + 1,
                    dividend: currentDividend,
                    operation: `${currentDividend} ÷ ${divisor}`,
                    quotient: stepQuotient,
                    remainder: stepRemainder
                });
                
                if (stepQuotient > 0) {
                    currentQuotient = currentQuotient * 10 + stepQuotient;
                    currentDividend = stepRemainder;
                    break; // 단순화를 위해 한 단계만 표시
                }
                stepCount++;
            }
            
            // 회로 구성 요소들
            ctx.strokeStyle = '#f39c12';
            ctx.lineWidth = 2;
            ctx.strokeRect(startX - 80, startY, 60, 25);
            ctx.fillStyle = '#f39c12';
            ctx.font = '10px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('피제수', startX - 50, startY + 15);
            ctx.fillText(a.toString(), startX - 50, startY + 35);
            
            ctx.strokeRect(startX + 40, startY, 60, 25);
            ctx.fillText('제수', startX + 70, startY + 15);
            ctx.fillText(b.toString(), startX + 70, startY + 35);
            
            // 제어 유닛
            ctx.strokeStyle = '#e74c3c';
            ctx.strokeRect(startX - 20, startY - 30, 40, 20);
            ctx.fillStyle = '#e74c3c';
            ctx.fillText('제어', startX, startY - 17);
            
            // 비교기
            ctx.strokeStyle = '#3498db';
            ctx.strokeRect(startX - 20, startY + 40, 40, 20);
            ctx.fillStyle = '#3498db';
            ctx.fillText('비교기', startX, startY + 53);
            
            // 뺄셈기
            ctx.strokeRect(startX - 20, startY + 70, 40, 20);
            ctx.fillText('뺄셈기', startX, startY + 83);
            
            // 결과 레지스터들
            ctx.strokeStyle = '#27ae60';
            ctx.strokeRect(startX - 80, startY + 100, 60, 25);
            ctx.fillStyle = '#27ae60';
            ctx.fillText('몫', startX - 50, startY + 115);
            ctx.fillText(quotient.toString(), startX - 50, startY + 135);
            
            ctx.strokeRect(startX + 40, startY + 100, 60, 25);
            ctx.fillText('나머지', startX + 70, startY + 115);
            ctx.fillText(remainder.toString(), startX + 70, startY + 135);
            
            // 계산 과정 표시
            ctx.fillStyle = '#2c3e50';
            ctx.font = '11px Arial';
            ctx.textAlign = 'left';
            ctx.fillText('계산 과정:', 50, height - 80);
            ctx.fillText(`${a} ÷ ${b} = ${quotient} ... ${remainder}`, 50, height - 65);
            ctx.fillText(`검증: ${quotient} × ${b} + ${remainder} = ${quotient * b + remainder}`, 50, height - 50);
            
            // 연결선들 (신호 흐름 표시)
            ctx.strokeStyle = '#7f8c8d';
            ctx.lineWidth = 1;
            drawArrow(ctx, startX - 20, startY + 12, startX - 20, startY + 40);
            drawArrow(ctx, startX, startY + 60, startX, startY + 70);
            drawArrow(ctx, startX - 20, startY + 90, startX - 50, startY + 100);
            drawArrow(ctx, startX + 20, startY + 90, startX + 70, startY + 100);
        }
        
        function drawArrow(ctx, fromX, fromY, toX, toY) {
            ctx.beginPath();
            ctx.moveTo(fromX, fromY);
            ctx.lineTo(toX, toY);
            ctx.stroke();
            
            // 화살표 머리
            const angle = Math.atan2(toY - fromY, toX - fromX);
            ctx.beginPath();
            ctx.moveTo(toX, toY);
            ctx.lineTo(toX - 8 * Math.cos(angle - Math.PI/6), toY - 8 * Math.sin(angle - Math.PI/6));
            ctx.moveTo(toX, toY);
            ctx.lineTo(toX - 8 * Math.cos(angle + Math.PI/6), toY - 8 * Math.sin(angle + Math.PI/6));
            ctx.stroke();
        }
        
        function drawNOTGate(ctx, x, y) {
            ctx.strokeStyle = '#e67e22';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(x - 10, y - 8);
            ctx.lineTo(x + 5, y);
            ctx.lineTo(x - 10, y + 8);
            ctx.closePath();
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(x + 8, y, 3, 0, 2 * Math.PI);
            ctx.stroke();
        }
        
        function drawANDGate(ctx, x, y, size = 12) {
            ctx.strokeStyle = '#9b59b6';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(x, y, size/2, -Math.PI/2, Math.PI/2);
            ctx.lineTo(x - size/2, y + size/2);
            ctx.lineTo(x - size/2, y - size/2);
            ctx.closePath();
            ctx.stroke();
        }
        
        function drawAdderUnit(ctx, x, y) {
            ctx.strokeStyle = '#27ae60';
            ctx.lineWidth = 2;
            ctx.strokeRect(x - 15, y - 10, 30, 20);
            ctx.fillStyle = '#27ae60';
            ctx.font = '10px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('+', x, y + 3);
        }
        
        function drawFullAdder(ctx, x, y, a, b, cin, sum, cout) {
            // 전가산기 박스
            ctx.strokeStyle = '#34495e';
            ctx.lineWidth = 2;
            ctx.strokeRect(x-25, y-25, 50, 50);
            
            // 배경색
            ctx.fillStyle = '#ecf0f1';
            ctx.fillRect(x-24, y-24, 48, 48);
            
            // FA 라벨
            ctx.fillStyle = '#2c3e50';
            ctx.font = 'bold 12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('FA', x, y+3);
            
            // 입력값 표시
            ctx.font = '10px Arial';
            ctx.fillStyle = a ? '#e74c3c' : '#7f8c8d';
            ctx.fillText(a.toString(), x-15, y-30);
            
            ctx.fillStyle = b ? '#e74c3c' : '#7f8c8d';
            ctx.fillText(b.toString(), x+15, y-30);
            
            ctx.fillStyle = cin ? '#e74c3c' : '#7f8c8d';
            ctx.fillText(cin.toString(), x-35, y+3);
            
            // 출력값 표시
            ctx.fillStyle = sum ? '#e74c3c' : '#7f8c8d';
            ctx.fillText(sum.toString(), x, y+40);
            
            ctx.fillStyle = cout ? '#e74c3c' : '#7f8c8d';
            ctx.fillText(cout.toString(), x+35, y+3);
            
            // 연결선 그리기
            ctx.strokeStyle = a ? '#e74c3c' : '#bdc3c7';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(x-15, y-25);
            ctx.lineTo(x-15, y-15);
            ctx.stroke();
            
            ctx.strokeStyle = b ? '#e74c3c' : '#bdc3c7';
            ctx.beginPath();
            ctx.moveTo(x+15, y-25);
            ctx.lineTo(x+15, y-15);
            ctx.stroke();
            
            if (cin) {
                ctx.strokeStyle = '#e74c3c';
                ctx.beginPath();
                ctx.moveTo(x-25, y);
                ctx.lineTo(x-15, y);
                ctx.stroke();
            }
            
            if (sum) {
                ctx.strokeStyle = '#e74c3c';
                ctx.beginPath();
                ctx.moveTo(x, y+25);
                ctx.lineTo(x, y+35);
                ctx.stroke();
            }
            
            if (cout) {
                ctx.strokeStyle = '#e74c3c';
                ctx.beginPath();
                ctx.moveTo(x+25, y);
                ctx.lineTo(x+35, y);
                ctx.stroke();
            }
        }
        
        // 부동소수점 회로 그리기
        function drawFloatCircuit() {
            const ctx = floatCtx;
            const width = floatCanvas.width;
            const height = floatCanvas.height;
            
            ctx.clearRect(0, 0, width, height);
            drawGrid(ctx, width, height);
            
            const a = parseFloat(document.getElementById('floatA').value) || 0;
            const b = parseFloat(document.getElementById('floatB').value) || 0;
            const op = document.getElementById('operation').value;
            
            let result;
            let opSymbol;
            switch(op) {
                case 'add': result = a + b; opSymbol = '+'; break;
                case 'sub': result = a - b; opSymbol = '-'; break;
                case 'mul': result = a * b; opSymbol = '×'; break;
                case 'div': result = a / b; opSymbol = '÷'; break;
            }
            
            // 제목
            ctx.fillStyle = '#2c3e50';
            ctx.font = 'bold 16px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(`IEEE 754 부동소수점 ${opSymbol} 연산 과정`, width/2, 30);
            
            // IEEE 754 분해
            const bitsA = floatToBits(a);
            const bitsB = floatToBits(b);
            const bitsResult = floatToBits(result);
            
            const partsA = extractFloatParts(bitsA);
            const partsB = extractFloatParts(bitsB);
            const partsResult = extractFloatParts(bitsResult);
            
            // 연산별 상세 과정 표시
            switch(op) {
                case 'add':
                case 'sub':
                    drawFloatAddSubProcess(ctx, width, height, a, b, result, partsA, partsB, partsResult, op);
                    break;
                case 'mul':
                    drawFloatMulProcess(ctx, width, height, a, b, result, partsA, partsB, partsResult);
                    break;
                case 'div':
                    drawFloatDivProcess(ctx, width, height, a, b, result, partsA, partsB, partsResult);
                    break;
            }
        }
        
        function floatToBits(num) {
            const buffer = new ArrayBuffer(4);
            const view = new DataView(buffer);
            view.setFloat32(0, num);
            return view.getUint32(0);
        }
        
        function extractFloatParts(bits) {
            return {
                sign: (bits >>> 31) & 1,
                exponent: (bits >>> 23) & 0xFF,
                mantissa: bits & 0x7FFFFF,
                exponentBias: ((bits >>> 23) & 0xFF) - 127,
                fullMantissa: ((bits >>> 23) & 0xFF) === 0 ? (bits & 0x7FFFFF) : (1 << 23) | (bits & 0x7FFFFF)
            };
        }
        
        function drawFloatAddSubProcess(ctx, width, height, a, b, result, partsA, partsB, partsResult, op) {
            const startY = 80;
            
            // opSymbol 정의
            const opSymbol = op === 'add' ? '+' : '-';
            
            // 단계 1: 입력 분해
            ctx.fillStyle = '#3498db';
            ctx.font = 'bold 12px Arial';
            ctx.textAlign = 'left';
            ctx.fillText('단계 1: IEEE 754 분해', 20, startY);
            
            ctx.font = '10px Arial';
            ctx.fillText(`A = ${a.toFixed(6)}`, 20, startY + 20);
            ctx.fillText(`  부호: ${partsA.sign}, 지수: ${partsA.exponent} (${partsA.exponentBias}), 가수: 0x${partsA.mantissa.toString(16)}`, 20, startY + 35);
            
            ctx.fillText(`B = ${b.toFixed(6)}`, 20, startY + 55);
            ctx.fillText(`  부호: ${partsB.sign}, 지수: ${partsB.exponent} (${partsB.exponentBias}), 가수: 0x${partsB.mantissa.toString(16)}`, 20, startY + 70);
            
            // 단계 2: 지수 비교 및 정렬
            ctx.fillStyle = '#e67e22';
            ctx.font = 'bold 12px Arial';
            ctx.fillText('단계 2: 지수 비교 및 가수부 정렬', 20, startY + 100);
            
            const expDiff = Math.abs(partsA.exponentBias - partsB.exponentBias);
            const largerExp = Math.max(partsA.exponentBias, partsB.exponentBias);
            
            ctx.font = '10px Arial';
            ctx.fillText(`지수 차이: |${partsA.exponentBias} - ${partsB.exponentBias}| = ${expDiff}`, 20, startY + 120);
            ctx.fillText(`큰 지수: ${largerExp + 127} (bias 제거: ${largerExp})`, 20, startY + 135);
            
            if (expDiff > 0) {
                const smallerIsA = partsA.exponentBias < partsB.exponentBias;
                ctx.fillText(`${smallerIsA ? 'A' : 'B'}의 가수부를 ${expDiff}비트 오른쪽 시프트`, 20, startY + 150);
            } else {
                ctx.fillText('지수가 같아 시프트 불필요', 20, startY + 150);
            }
            
            // 단계 3: 가수부 연산
            ctx.fillStyle = '#27ae60';
            ctx.font = 'bold 12px Arial';
            ctx.fillText('단계 3: 가수부 연산', 20, startY + 180);
            
            ctx.font = '10px Arial';
            const sameSign = partsA.sign === partsB.sign;
            const effectiveOp = (op === 'add') ? (sameSign ? '덧셈' : '뺄셈') : (sameSign ? '뺄셈' : '덧셈');
            ctx.fillText(`부호 비교: A(${partsA.sign}) ${op} B(${partsB.sign}) → 실제 연산: ${effectiveOp}`, 20, startY + 200);
            
            // 정규화된 가수부 계산 (간소화)
            const mantA = 1 + (partsA.mantissa / (1 << 23));
            const mantB = 1 + (partsB.mantissa / (1 << 23));
            ctx.fillText(`정규화된 가수: A=${mantA.toFixed(6)}, B=${mantB.toFixed(6)}`, 20, startY + 215);
            
            // 단계 4: 정규화
            ctx.fillStyle = '#9b59b6';
            ctx.font = 'bold 12px Arial';
            ctx.fillText('단계 4: 결과 정규화', 20, startY + 245);
            
            ctx.font = '10px Arial';
            ctx.fillText(`결과 = ${result.toFixed(6)}`, 20, startY + 265);
            ctx.fillText(`  부호: ${partsResult.sign}, 지수: ${partsResult.exponent} (${partsResult.exponentBias}), 가수: 0x${partsResult.mantissa.toString(16)}`, 20, startY + 280);
            
            // 회로 블록 다이어그램
            drawFloatProcessingBlocks(ctx, width, height, startY + 320);
            
            // 검증
            ctx.fillStyle = '#2c3e50';
            ctx.font = 'bold 11px Arial';
            ctx.fillText('검증:', 20, height - 40);
            ctx.font = '10px Arial';
            ctx.fillText(`${a.toFixed(6)} ${opSymbol} ${b.toFixed(6)} = ${result.toFixed(6)}`, 20, height - 25);
        }
        
        function drawFloatMulProcess(ctx, width, height, a, b, result, partsA, partsB, partsResult) {
            const startY = 80;
            
            // 곱셈 과정
            ctx.fillStyle = '#3498db';
            ctx.font = 'bold 12px Arial';
            ctx.textAlign = 'left';
            ctx.fillText('부동소수점 곱셈 과정', 20, startY);
            
            ctx.font = '10px Arial';
            ctx.fillText('단계 1: 부호 결정', 20, startY + 25);
            const resultSign = partsA.sign ^ partsB.sign;
            ctx.fillText(`부호: ${partsA.sign} XOR ${partsB.sign} = ${resultSign}`, 20, startY + 40);
            
            ctx.fillText('단계 2: 지수 덧셈', 20, startY + 65);
            ctx.fillText(`지수: ${partsA.exponentBias} + ${partsB.exponentBias} = ${partsA.exponentBias + partsB.exponentBias}`, 20, startY + 80);
            
            ctx.fillText('단계 3: 가수부 곱셈', 20, startY + 105);
            const mantA = 1 + (partsA.mantissa / (1 << 23));
            const mantB = 1 + (partsB.mantissa / (1 << 23));
            const mantProduct = mantA * mantB;
            ctx.fillText(`가수: ${mantA.toFixed(6)} × ${mantB.toFixed(6)} = ${mantProduct.toFixed(6)}`, 20, startY + 120);
            
            ctx.fillText('단계 4: 정규화', 20, startY + 145);
            ctx.fillText(`최종 결과: ${result.toFixed(6)}`, 20, startY + 160);
            
            drawFloatProcessingBlocks(ctx, width, height, startY + 200);
        }
        
        function drawFloatDivProcess(ctx, width, height, a, b, result, partsA, partsB, partsResult) {
            const startY = 80;
            
            // 나눗셈 과정
            ctx.fillStyle = '#3498db';
            ctx.font = 'bold 12px Arial';
            ctx.textAlign = 'left';
            ctx.fillText('부동소수점 나눗셈 과정', 20, startY);
            
            ctx.font = '10px Arial';
            ctx.fillText('단계 1: 부호 결정', 20, startY + 25);
            const resultSign = partsA.sign ^ partsB.sign;
            ctx.fillText(`부호: ${partsA.sign} XOR ${partsB.sign} = ${resultSign}`, 20, startY + 40);
            
            ctx.fillText('단계 2: 지수 뺄셈', 20, startY + 65);
            ctx.fillText(`지수: ${partsA.exponentBias} - ${partsB.exponentBias} = ${partsA.exponentBias - partsB.exponentBias}`, 20, startY + 80);
            
            ctx.fillText('단계 3: 가수부 나눗셈', 20, startY + 105);
            const mantA = 1 + (partsA.mantissa / (1 << 23));
            const mantB = 1 + (partsB.mantissa / (1 << 23));
            const mantQuotient = mantA / mantB;
            ctx.fillText(`가수: ${mantA.toFixed(6)} ÷ ${mantB.toFixed(6)} = ${mantQuotient.toFixed(6)}`, 20, startY + 120);
            
            ctx.fillText('단계 4: 정규화', 20, startY + 145);
            ctx.fillText(`최종 결과: ${result.toFixed(6)}`, 20, startY + 160);
            
            drawFloatProcessingBlocks(ctx, width, height, startY + 200);
        }
        
        function drawFloatProcessingBlocks(ctx, width, height, startY) {
            const blockY = startY;
            const blockHeight = 40;
            const blockWidth = 120;
            const spacing = 140;
            
            // 처리 블록들
            const blocks = [
                { name: '입력 분해기', color: '#3498db', x: 50 },
                { name: '지수 처리기', color: '#e67e22', x: 50 + spacing },
                { name: '가수 연산기', color: '#27ae60', x: 50 + spacing * 2 },
                { name: '정규화기', color: '#9b59b6', x: 50 + spacing * 3 }
            ];
            
            blocks.forEach(block => {
                ctx.strokeStyle = block.color;
                ctx.lineWidth = 2;
                ctx.strokeRect(block.x, blockY, blockWidth, blockHeight);
                ctx.fillStyle = block.color + '20';
                ctx.fillRect(block.x + 1, blockY + 1, blockWidth - 2, blockHeight - 2);
                
                ctx.fillStyle = block.color;
                ctx.font = 'bold 10px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(block.name, block.x + blockWidth/2, blockY + blockHeight/2 + 3);
            });
            
            // 연결 화살표
            ctx.strokeStyle = '#7f8c8d';
            ctx.lineWidth = 2;
            for (let i = 0; i < blocks.length - 1; i++) {
                const fromX = blocks[i].x + blockWidth;
                const toX = blocks[i + 1].x;
                const y = blockY + blockHeight / 2;
                
                drawArrow(ctx, fromX, y, toX, y);
            }
        }
        
        function drawFloatInput(ctx, x, y, label, value, sign, exp, mant) {
            // 박스
            ctx.strokeStyle = '#34495e';
            ctx.lineWidth = 2;
            ctx.strokeRect(x-40, y-25, 80, 50);
            ctx.fillStyle = '#ecf0f1';
            ctx.fillRect(x-39, y-24, 78, 48);
            
            // 라벨
            ctx.fillStyle = '#2c3e50';
            ctx.font = 'bold 14px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(label, x, y-5);
            ctx.font = '10px Arial';
            ctx.fillText(value.toFixed(2), x, y+10);
            
            // IEEE 754 분해 표시
            ctx.font = '8px Arial';
            ctx.fillText(`S:${sign} E:${exp.toString(16)} M:${mant.toString(16)}`, x, y+20);
        }
        
        function drawProcessingUnit(ctx, x, y, label, color) {
            // 박스
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.strokeRect(x-50, y-15, 100, 30);
            ctx.fillStyle = color + '20';
            ctx.fillRect(x-49, y-14, 98, 28);
            
            // 라벨
            ctx.fillStyle = color;
            ctx.font = 'bold 11px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(label, x, y+3);
        }
        
        function drawFloatOutput(ctx, x, y, result, op) {
            // 박스
            ctx.strokeStyle = '#27ae60';
            ctx.lineWidth = 3;
            ctx.strokeRect(x-40, y-25, 80, 50);
            ctx.fillStyle = '#27ae6020';
            ctx.fillRect(x-39, y-24, 78, 48);
            
            // 결과
            ctx.fillStyle = '#27ae60';
            ctx.font = 'bold 14px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('결과', x, y-8);
            ctx.font = '12px Arial';
            ctx.fillText(result.toFixed(3), x, y+8);
        }
        
        function drawConnections(ctx, centerY) {
            ctx.strokeStyle = '#7f8c8d';
            ctx.lineWidth = 1;
            
            // 연결선들
            ctx.beginPath();
            ctx.moveTo(120, centerY - 80);
            ctx.lineTo(250, centerY - 60);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(120, centerY + 40);
            ctx.lineTo(250, centerY - 60);
            ctx.stroke();
            
            // 처리 단계 연결
            const stages = [centerY - 60, centerY - 20, centerY + 20, centerY + 60];
            for (let i = 0; i < stages.length - 1; i++) {
                ctx.beginPath();
                ctx.moveTo(350, stages[i]);
                ctx.lineTo(350, stages[i + 1]);
                ctx.stroke();
            }
            
            ctx.beginPath();
            ctx.moveTo(350, centerY + 60);
            ctx.lineTo(480, centerY);
            ctx.stroke();
        }
        
        function drawGrid(ctx, width, height) {
            ctx.strokeStyle = '#ecf0f1';
            ctx.lineWidth = 1;
            
            // 수직선
            for (let x = 0; x < width; x += 20) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
                ctx.stroke();
            }
            
            // 수평선
            for (let y = 0; y < height; y += 20) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
                ctx.stroke();
            }
        }
        
        function updateIntegerCircuit() {
            const a = parseInt(document.getElementById('intA').value) || 0;
            const b = parseInt(document.getElementById('intB').value) || 1;
            const op = document.getElementById('intOperation').value;
            
            let result, remainder = 0;
            switch(op) {
                case 'add': 
                    result = a + b; 
                    break;
                case 'sub': 
                    result = a - b; 
                    break;
                case 'mul': 
                    result = a * b; 
                    break;
                case 'div': 
                    result = Math.floor(a / b);
                    remainder = a % b;
                    break;
            }
            
            const resultBin = result >= 0 ? result.toString(2) : (result >>> 0).toString(2);
            
            let resultText = `결과: ${result} (이진수: ${resultBin})`;
            if (op === 'div' && remainder > 0) {
                resultText += ` 나머지: ${remainder}`;
            }
            
            document.getElementById('integerResult').textContent = resultText;
            
            drawIntegerCircuit();
        }
        
        function updateFloatCircuit() {
            const a = parseFloat(document.getElementById('floatA').value) || 0;
            const b = parseFloat(document.getElementById('floatB').value) || 0;
            const op = document.getElementById('operation').value;
            
            let result;
            let opName;
            switch(op) {
                case 'add': result = a + b; opName = '덧셈'; break;
                case 'sub': result = a - b; opName = '뺄셈'; break;
                case 'mul': result = a * b; opName = '곱셈'; break;
                case 'div': result = a / b; opName = '나눗셈'; break;
            }
            
            // 특수값 처리
            let resultText = `결과 (${opName}): `;
            if (isNaN(result)) {
                resultText += 'NaN (Not a Number)';
            } else if (!isFinite(result)) {
                resultText += result > 0 ? '+∞ (양의 무한대)' : '-∞ (음의 무한대)';
            } else {
                resultText += result.toFixed(8);
            }
            
            // IEEE 754 비트 표현 추가
            if (isFinite(result) && !isNaN(result)) {
                const bits = floatToBits(result);
                const sign = (bits >>> 31) & 1;
                const exp = (bits >>> 23) & 0xFF;
                const mant = bits & 0x7FFFFF;
                resultText += `\nIEEE 754: S=${sign} E=${exp.toString(16)} M=${mant.toString(16)}`;
            }
            
            document.getElementById('floatResult').textContent = resultText;
            
            drawFloatCircuit();
        }
        
        // 초기 그리기
        drawIntegerCircuit();
        drawFloatCircuit();
        
        // 리사이즈 처리
        window.addEventListener('resize', function() {
            resizeCanvas(intCanvas);
            resizeCanvas(floatCanvas);
            drawIntegerCircuit();
            drawFloatCircuit();
        });
    </script>
</body>
</html>