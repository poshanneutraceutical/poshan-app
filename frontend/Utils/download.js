/**
 * Download a Blob as a file
 */
export const downloadBlob = (
  blob,
  fileName
) => {
  const url =
    window.URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;
  link.download = fileName;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  window.URL.revokeObjectURL(url);
};

/**
 * Download a Base64 file
 */
export const downloadBase64 = (
  base64,
  fileName,
  mimeType = "application/octet-stream"
) => {
  const byteCharacters =
    atob(base64);

  const byteNumbers = Array.from(
    byteCharacters,
    (character) =>
      character.charCodeAt(0)
  );

  const byteArray = new Uint8Array(
    byteNumbers
  );

  const blob = new Blob(
    [byteArray],
    {
      type: mimeType
    }
  );

  downloadBlob(blob, fileName);
};

/**
 * Download from URL
 */
export const downloadFromUrl = (
  url,
  fileName
) => {
  const link =
    document.createElement("a");

  link.href = url;
  link.download = fileName;
  link.target = "_blank";

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
};

/**
 * Download JSON file
 */
export const downloadJson = (
  data,
  fileName = "data.json"
) => {
  const blob = new Blob(
    [
      JSON.stringify(
        data,
        null,
        2
      )
    ],
    {
      type: "application/json"
    }
  );

  downloadBlob(blob, fileName);
};

/**
 * Download text file
 */
export const downloadText = (
  text,
  fileName = "file.txt"
) => {
  const blob = new Blob(
    [text],
    {
      type: "text/plain"
    }
  );

  downloadBlob(blob, fileName);
};