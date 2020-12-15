class WebGLUtils {
  getGLContext = (canvas) => {
      var gl = canvas.getContext('webgl2');
      //0.0 -> 1.0
      gl.clearColor(1.0, 1.0, 1.0, 1.0);
      gl.clear(gl.DEPTH_BUFFER_BIT|gl.COLOR_BUFFER_BIT);
      return gl;
    }

    getShader = (gl, shaderSource, shaderType) => {
        var shader = gl.createShader(shaderType);
        gl.shaderSource(shader, shaderSource);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error(gl.getShaderInfoLog(shader));
        }
        return shader;
    }

    getProgram = (gl, vertexShaderSource, fragmentShaderSource) => {
      var vs = this.getShader(gl, vertexShaderSource, gl.VERTEX_SHADER);
      var fs = this.getShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER);
      var program = gl.createProgram();
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(program));
      }
      return program;
    }

    createAndBindBuffer = (bufferType, typeOfDrawing, data) => {
        var buffer = gl.createBuffer();
        gl.bindBuffer(bufferType, buffer);
        gl.bufferData(bufferType, data, typeOfDrawing);
        gl.bindBuffer(bufferType, null);
        return buffer;
    }

    linkGPUAndCPU = (obj, gl) => {
        var position = gl.getAttribLocation(obj.program, obj.gpuVariable);
        gl.enableVertexAttribArray(position);
        gl.bindBuffer(obj.channel || gl.ARRAY_BUFFER, obj.buffer);
        gl.vertexAttribPointer(position, obj.dims, obj.dataType || gl.FLOAT,
            obj.normalize || gl.FALSE, obj.stride || 0, obj.offset || 0);
        return position;
    }
}
