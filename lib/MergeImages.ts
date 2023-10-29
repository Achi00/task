export async function mergeImages(urls: string[]): Promise<HTMLImageElement> {
  const canvas = document.createElement("canvas");

  const loadImages = async () => {
    return Promise.all(
      urls.map((url) => {
        return new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = (error) => {
            console.error("Error loading image:", error);
            reject(error);
          };
          img.src = url;
        });
      })
    );
  };

  const images = await loadImages();

  const backgroundImage = images[0];
  const pngImage = images[1];

  // Decide canvas size based on which image is larger.
  canvas.width = Math.max(backgroundImage.width, pngImage.width);
  canvas.height = Math.max(backgroundImage.height, pngImage.height);

  const context = canvas.getContext("2d");
  if (context) {
    const bgXOffset = (canvas.width - backgroundImage.width) / 2;
    const bgYOffset = (canvas.height - backgroundImage.height) / 2;
    context.drawImage(
      backgroundImage,
      bgXOffset,
      bgYOffset,
      backgroundImage.width,
      backgroundImage.height
    );

    const pngXOffset = (canvas.width - pngImage.width) / 2;
    const pngYOffset = (canvas.height - pngImage.height) / 2;
    context.drawImage(
      pngImage,
      pngXOffset,
      pngYOffset,
      pngImage.width,
      pngImage.height
    );
  }

  const mergedImage = new Image();
  mergedImage.src = canvas.toDataURL();

  return mergedImage;
}
