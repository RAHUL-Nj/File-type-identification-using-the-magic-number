const MAGIC_NUMBERS = {
  "JPEG": [255, 216, 255],
  "PNG": [137, 80, 78, 71, 13, 10, 26, 10],
  "GIF": [71, 73, 70, 56, 57, 97],
  "PDF": [37, 80, 68, 70],
  "ZIP": [80, 75, 3, 4],
  "EXE": [77, 90]
};

function identifyFileType(event) {
  const fileInput = event.target;
  const file = fileInput.files[0];
  
  if (file) {
      const reader = new FileReader();
      
      reader.onload = function(event) {
          const arrayBuffer = event.target.result;
          const byteArray = new Uint8Array(arrayBuffer).subarray(0, 4);
          const fileType = identifyFile(byteArray);
          displayResult(fileType);
      };
      
      reader.readAsArrayBuffer(file);
  }
}

function identifyFile(byteArray) {
  for (const [fileType, magicNumber] of Object.entries(MAGIC_NUMBERS)) {
      const match = magicNumber.every((value, index) => value === byteArray[index]);
      if (match) {
          return fileType;
      }
  }
  return "Unknown";
}

function displayResult(fileType) {
  const resultDiv = document.getElementById('result');
  resultDiv.innerText = `File type: ${fileType}`;
}
