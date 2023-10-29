export async function mergeImages(urls: string[]): Promise<HTMLImageElement> {
  // Create a new canvas element.
  const canvas = document.createElement("canvas");

  // Load images from URLs.
  const loadImages = async () => {
    return Promise.all(
      urls.map((url) => {
        return new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = url;
        });
      })
    );
  };

  const images = await loadImages();

  // Set canvas size based on the largest width and height of the images.
  canvas.width = Math.max(...images.map((img) => img.width));
  canvas.height = Math.max(...images.map((img) => img.height));

  const context = canvas.getContext("2d");
  if (context) {
    // Draw each image onto the canvas.
    images.forEach((image) => {
      const aspectRatio = image.width / image.height;
      let targetWidth, targetHeight;

      if (canvas.width / canvas.height > aspectRatio) {
        targetHeight = canvas.height;
        targetWidth = targetHeight * aspectRatio;
      } else {
        targetWidth = canvas.width;
        targetHeight = targetWidth / aspectRatio;
      }

      const offsetX = (canvas.width - targetWidth) / 2;
      const offsetY = (canvas.height - targetHeight) / 2;

      context.drawImage(image, offsetX, offsetY, targetWidth, targetHeight);
    });
  }

  // Convert canvas to image.
  const mergedImage = new Image();
  mergedImage.src = canvas.toDataURL();

  return mergedImage;
}
