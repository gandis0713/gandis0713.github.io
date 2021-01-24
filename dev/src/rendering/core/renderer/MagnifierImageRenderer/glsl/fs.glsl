precision mediump float;

varying vec2 fs_textCoord;

uniform sampler2D u_texture;
uniform vec2 u_mousePosition;
uniform highp mat4 u_MCPC;


void main() {
  float dist = distance(u_mousePosition, gl_FragCoord.xy);
  if(dist < 130.0 && dist > 120.0) 
  {
    vec4 color = texture2D(u_texture, fs_textCoord);
    gl_FragColor.r = clamp(color.r * 0.5, 0., 1.);
    gl_FragColor.g = clamp(color.g * 0.5, 0., 1.);
    gl_FragColor.b = clamp(color.b * 0.5, 0., 1.);
    gl_FragColor.a = clamp(color.a * 1.0, 0., 1.);
  }
  else if(dist <= 120.0)
  {
    vec4 coord = u_MCPC * vec4(u_mousePosition.xy, 0, 1);
    vec2 texCoord = vec2(coord.x / 2.0, 1.0 - (coord.y / 2.0));
    vec2 diff = (fs_textCoord - texCoord) / 3.0;
    gl_FragColor = texture2D(u_texture, texCoord + diff);
  }
  else
  {    
    gl_FragColor = texture2D(u_texture, fs_textCoord);
  }
}