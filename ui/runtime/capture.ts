import type { Target } from './gl';

export type CaptureMimeType = 'image/png' | 'image/jpeg';

export function readTargetToDataUrl(
  gl: WebGL2RenderingContext,
  target: Target,
  type: CaptureMimeType,
  quality?: number,
): string {
  const { width, height } = target;
  const pixels = new Uint8Array(width * height * 4);
  gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
  gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);

  // WebGL reads bottom-up; canvas image data is top-down.

  const flipped = new Uint8ClampedArray(width * height * 4);
  const row = width * 4;
  for (let y = 0; y < height; y++) {
    flipped.set(pixels.subarray(y * row, (y + 1) * row), (height - 1 - y) * row);
  }
  for (let i = 3; i < flipped.length; i += 4) flipped[i] = 255;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  canvas.getContext('2d')!.putImageData(new ImageData(flipped, width, height), 0, 0);
  return canvas.toDataURL(type, quality);
}
