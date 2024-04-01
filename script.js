const eyesImgBase64 = "iVBORw0KGgoAAAANSUhEUgAAADcAAAAHCAYAAACsodXrAAAAfUlEQVQ4jc2U0QrAIAhFu7D//+W7h6GIM5ebsHyp5CR6tUByWAOgDpIYie3OHh6yQOTzfgCU9YmtxO1gQXJIghaanf3eqzZjV2JlXarcU8GvvO7VVxRcUTUT423cbCQB8FPnIuvoXGUi0s7Jh/Ln24j8HW9Zi/NAFNDb7uwJ3kUoCjT/6hgAAAAASUVORK5CYII=";

const eyes = new Image();
eyes.src = 'data:image/png;base64,' + eyesImgBase64;

const eyesCrop = {
  "0": [0, 0, 11, 7],
  "1": [11, 0, 22, 7],
  "2": [22, 0, 33, 7],
  "3": [33, 0, 44, 7],
  "4": [44, 0, 55, 7]
};

// const point = [0, 3, 1, 4];

function getLineWidth(line) {
    return line.length * 6 + 6;
  }

  function createEyesSecretImage(txt) {
    const text = txt.split("\n");
    let fwidth = 0;
    const fheight = 12;
    text.forEach(line => {
      const line_width = getLineWidth(line);
      if (line_width > fwidth) {
        fwidth = line_width;
      }
    });
    const margin = 1, space = 1;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const pic_size = [margin * 2 + fwidth - space, margin * 2 + (fheight) * text.length + space];
    canvas.width = pic_size[0];
    canvas.height = pic_size[1];
    const pos = { x: 0, y: 0 };
    text.forEach((line, i) => {
      pos.y = i * (11 + space);
      pos.x = 0;
      [...line].forEach((char, j) => {
        const [sx, sy, ex, ey] = eyesCrop[char];
        const pic_letter = eyes;
        ctx.drawImage(pic_letter, sx, sy, ex - sx, ey - sy, margin + pos.x, margin + pos.y, ex - sx, ey);
        // const pic_point = eyes;
        if (j % 2 === 0) {
          // if (i !== 0) {
            // ctx.drawImage(pic_point, point[0], point[1], point[2], point[3], margin + pos.x + 10, margin + pos.y, 1, 4);
          // }
          // if (j !== 0) {
            // if (i !== 0) {
              // ctx.drawImage(pic_point, point[0], point[1], point[2], point[3], margin + pos.x, margin + pos.y, 1, 4);
            // }
            // ctx.drawImage(pic_point, point[0], point[1], point[2], point[3], margin + pos.x, margin + pos.y + 6, 1, 4);
          // }
          pos.y += 6;
        } else {
          // ctx.drawImage(pic_point, point[0], point[1], point[2], point[3], margin + pos.x, margin + pos.y, 1, 4);
          pos.y -= 6;
        }
        pos.x += 6;
      });
    });
    const container = document.getElementById('secretImageContainer');
    container.removeChild(container.firstChild)
    container.appendChild(canvas);
  }

  function generateSecretImage() {
    const txt = document.getElementById('textInput').value;
    createEyesSecretImage(txt);
  }

  function downloadImage() {
    const canvas = document.querySelector('canvas');
    const link = document.createElement('a');
    link.download = 'secret_image.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  }