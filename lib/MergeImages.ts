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

  // Assuming images are of the same size for simplicity.
  // You might want to handle different sizes in a more complex way.
  const width = images[0].width;
  const height = images[0].height;

  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");
  if (context) {
    // Draw each image onto the canvas.
    images.forEach((image) => {
      context.drawImage(image, 0, 0, width, height);
    });
  }

  // Convert canvas to image.
  const mergedImage = new Image();
  mergedImage.src = canvas.toDataURL();

  return mergedImage;
}
