precision mediump float;

varying vec2 fs_textCoord;

uniform sampler2D u_texture;
uniform vec2 u_mousePosition;
uniform vec2 u_mousePositionTC;
uniform mat3 u_EdgeMat3;
uniform highp mat4 u_MCPC;


void main() {
  float width = 5.0;
  // sobel ref : https://www.sciencedirect.com/topics/engineering/sobel-operator
  float xDet[9];
  xDet[0] = xDet[6] = -1.0;
  xDet[1] = xDet[4] = xDet[7] = 0.0;
  xDet[2] = xDet[8] = 1.0;
  xDet[3] = -2.0;
  xDet[5] = 2.0;
  float yDet[9];
  yDet[0] = yDet[2] = -1.0;
  yDet[3] = yDet[4] = yDet[5] = 0.0;
  yDet[6] = yDet[8] = 1.0;
  yDet[1] = -2.0;
  yDet[7] = 2.0;

  float sharpenMat3[9];
  sharpenMat3[0] = -1.0;
  sharpenMat3[1] = -1.0;
  sharpenMat3[2] = -1.0;
  sharpenMat3[3] = -1.0;
  sharpenMat3[4] = 9.0;
  sharpenMat3[5] = -1.0;
  sharpenMat3[6] = -1.0;
  sharpenMat3[7] = -1.0;
  sharpenMat3[8] = -1.0;
  // float xDet[9] = float[9](-1.0, 0.0, 1.0, -2.0, 0.0, 2.0, -1.0, 0.0, 1.0); // webgl2 only
  // float yDet[9] = float[9](-1.0, -2.0, -1.0, 0.0, 0.0, 0.0, 1.0, 2.0, 1.0); // webgl2 only
  if(u_mousePosition.x - width > gl_FragCoord.x) // draw image with edge effect.
  {
    gl_FragColor = vec4(0, 0, 0, 1);
    for(int i = -2; i <= 0; i++)
    {
      for(int j = 1; j <= 3; j++) // due to shift +Y axis litle bit. need to be check.
      {
        float x = (gl_FragCoord.x + float(i)) / 2.0;
        float y = (gl_FragCoord.y + float(j)) / 2.0;
        vec4 coord = u_MCPC * vec4(x, y, 0, 1);
        gl_FragColor.rgb += texture2D(u_texture, vec2(coord.x, 1.0 - coord.y)).rrr * yDet[(i + 2) * 3 + (j - 1)];
        gl_FragColor.rgb += texture2D(u_texture, vec2(coord.x, 1.0 - coord.y)).rrr * xDet[(i + 2) * 3 + (j - 1)];
      }
    }

    // gl_FragColor = vec4(0, 0, 0, 0);
    // for(int i = -1; i <= 1; i++)
    // {
    //   for(int j = 1; j <= 3; j++) // due to shift +Y axis litle bit. need to be check.
    //   {
    //     float x = (gl_FragCoord.x + float(i)) / 2.0;
    //     float y = (gl_FragCoord.y + float(j)) / 2.0;
    //     vec4 coord = u_MCPC * vec4(x, y, 0, 1);
    //     gl_FragColor += texture2D(u_texture, vec2(coord.x, 1.0 - coord.y)) * sharpenMat3[(i + 1) * 3 + (j - 1)];
    //   }
    // }
  }
  else if(u_mousePosition.x + width >= gl_FragCoord.x && u_mousePosition.x - width <= gl_FragCoord.x) // draw vertical line.
  {
    vec4 color = texture2D(u_texture, fs_textCoord);
    gl_FragColor.r = clamp(color.r * 0.5, 0., 1.);
    gl_FragColor.g = clamp(color.g * 0.5, 0., 1.);
    gl_FragColor.b = clamp(color.b * 0.5, 0., 1.);
    gl_FragColor.a = clamp(color.a * 1.0, 0., 1.);
  }
  else
  {
    gl_FragColor = texture2D(u_texture, fs_textCoord); // draw original image.
  }
}