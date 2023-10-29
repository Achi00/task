"use client";
import { useState, useEffect, useRef } from "react";
import { useUser } from "@clerk/clerk-react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { addImageToUser } from "@/lib/actions/images.actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FaImages } from "react-icons/fa";
import { AiOutlineCloudUpload, AiOutlineInfoCircle } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { mergeImages } from "@/lib/MergeImages";

const page = () => {
  const [loading, setLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  // removed background image
  const [removedBgImage, setRemovedBgImage] = useState("");
  // background to choose
  const [backgroundImage, setBackgroundImage] = useState("");
  const [selectedBackgroundUrl, setSelectedBackgroundUrl] = useState("");
  const [mergedImageSrc, setMergedImageSrc] = useState("");

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { user } = useUser();

  const { register, handleSubmit } = useForm();

  // preview image
  useEffect(() => {
    console.log("useEffect executed");
    const uploadFileInput: HTMLInputElement | null =
      document.querySelector("#upload_file_input");

    const handleChange = (e: Event) => {
      const input = e.target as HTMLInputElement;
      const file = input.files?.[0];
      if (file) {
        console.log("File change detected:", file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
          console.log("File read as data URL:", reader.result);
        };
        reader.readAsDataURL(file);
      }
    };

    if (uploadFileInput) {
      uploadFileInput.addEventListener("change", handleChange);
    }

    return () => {
      if (uploadFileInput) {
        uploadFileInput.removeEventListener("change", handleChange);
      }
    };
  }, [selectedFile]);

  // combine image with background
  const pngImg = "/assets/images/test.png";
  const bgImg = "/assets/bg/bg1.jpg";

  const handleMergeImagesClick = async () => {
    if (!removedBgImage || !backgroundImage) {
      console.error("Background or foreground image is missing.");
      toast.error("Background or foreground image is missing.");
      return;
    }

    try {
      const newMergedImage = await mergeImages([
        backgroundImage,
        removedBgImage,
      ]);
      setMergedImageSrc(newMergedImage.src); // Update state with image source
    } catch (error) {
      console.error("Error merging images: ", error);
    }
  };

  // for preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }

    // Clear the input's value so the change event is always fired
    e.target.value = "";
  };

  if (!user) {
    return (
      <div className="w-full h-screen gap-4 flex flex-col justify-center items-center">
        <h1 className="xl:text-4xl lg:text-4xl md:text-2xl xs:text-xl font-bold">
          Searching user
        </h1>
        <h1 className="xl:text-2xl lg:text-2xl md:text-xl xs:text-lg font-medium">
          Please Wait
        </h1>
        <div className="loader"></div>
      </div>
    );
  }

  // upload image on cloudinary server
  const onSubmit = async (data: any) => {
    try {
      const mergedImageSrcBlob = await (await fetch(mergedImageSrc)).blob();
      const imageFile = new File([mergedImageSrcBlob], "merged-image.png", {
        type: "image/png",
      });

      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", "bg-remove");

      setLoading(true);

      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const uploadedImageData = await uploadResponse.json();
      const imageUrl = uploadedImageData.secure_url;

      await addImageToUser({
        userId: user.id,
        imageUrl: imageUrl,
      });

      toast.success(
        "Image uploaded successfully, you can see it on your profile page"
      );
      setLoading(false);
      console.log(imageUrl);
    } catch (error: any) {
      console.error(`${error.message} failed to upload image`);
      setLoading(false);
    }
  };

  // remove background

  const handleRemoveBgClick = async (event: any) => {
    event.preventDefault();

    if (!selectedFile) {
      console.error("No file selected.");
      toast.error("No file selected");
      return;
    }

    const url = "https://background-removal13.p.rapidapi.com/api/v1/uploadFile";
    const data = new FormData();
    data.append("file", selectedFile); // Use the actual file object

    const options = {
      method: "POST",
      headers: {
        "X-RapidAPI-Key": "532606fd5amshbfdbc1bd5ff8f44p190eb2jsnc5d1642e27ba",
        "X-RapidAPI-Host": "background-removal13.p.rapidapi.com",
      },
      body: data,
    };

    try {
      setRemoveLoading(true);
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.statusText);
      }
      const result = await response.json(); // Assume JSON response
      const base64Image = result.base64; // Adjust based on your API response structure
      const imageUrl = `data:image/jpeg;base64,${base64Image}`;
      setRemovedBgImage(imageUrl);
      setRemoveLoading(false);
      toast.success(
        "Image background removed successfully, now you can upload on server"
      );
    } catch (error: any) {
      toast.error("There was problem while processing image");
      console.error("Error during fetch operation:", error.message);
      setRemoveLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center mt-10 items-center">
      <Toaster />

      <div className="flex flex-col justify-center items-center form rounded-3xl ">
        <form
          className="rounded-2xl flex flex-col justify-center items-center gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Alert className="px-4 pt-6">
            <AiOutlineInfoCircle size={20} />
            <AlertTitle>Upload or take photo now!</AlertTitle>
            <AlertDescription>
              You can upload image or take photo if you are using mobile device
            </AlertDescription>
          </Alert>
          <AiOutlineCloudUpload size={40} />
          <Label className="block mb-2 text-sm font-medium text-gray-300 dark:text-white">
            Upload Image
          </Label>
          {/* <canvas ref={canvasRef}></canvas> */}
          <div className="file-input-wrapper">
            <Input
              {...register("profile")}
              className="actual-input"
              aria-describedby="file_input_help"
              id="upload_file_input"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            <label htmlFor="upload_file_input" className="overlay-label">
              {fileName ? (
                fileName
              ) : (
                <h1 className="cursor-pointer">Choose a file...</h1>
              )}
            </label>
          </div>
          <p
            className="mt-1 text-sm text-gray-200 dark:text-gray-300"
            id="file_input_help"
          >
            Upload from your device
          </p>
          <div className="flex gap-2 flex-wrap justify-center">
            {/* preview image */}
            {imagePreview && (
              <img
                className="rounded-2xl object-contain"
                src={imagePreview}
                width={300}
                height={300}
                alt="Preview"
                // layout="responsive"
              />
            )}
            <div className="image-container flex justify-center items-center">
              {backgroundImage && (
                <div
                  className="background-image rounded-md object-contain"
                  style={{
                    backgroundImage: `url(${backgroundImage})`,
                  }}
                />
              )}

              {removedBgImage && (
                <img
                  className="foreground-image rounded-2xl object-contain"
                  width={300}
                  height={300}
                  src={removedBgImage}
                  alt="Background Removed"
                />
              )}
            </div>
          </div>
          {imagePreview && (
            <Button
              className="flex gap-2 p-6 text-2xl"
              onClick={handleRemoveBgClick}
            >
              <FaImages size={25} />
              {removeLoading ? <h1>Processing...</h1> : <h1>Remove Bg</h1>}
            </Button>
          )}
          {mergedImageSrc && (
            <Button type="submit" className="flex gap-2 p-6 text-2xl">
              <FaImages size={25} />
              {loading ? <h1>Uploading...</h1> : <h1>Upload</h1>}
            </Button>
          )}
        </form>
        {/* background option */}
        {removedBgImage && (
          <div className="background-options flex flex-wrap justify-center items-center">
            {[
              "/assets/bg/bg1.jpg",
              "/assets/bg/bg2.jpg",
              "/assets/bg/bg3.jpg",
            ].map((bgUrl) => (
              <div key={bgUrl} className="relative m-2">
                <img
                  className={`w-25 object-contain cursor-pointer ${
                    selectedBackgroundUrl === bgUrl ? "opacity-50" : ""
                  }`}
                  src={bgUrl}
                  alt={`Background ${bgUrl}`}
                  onClick={() => {
                    setBackgroundImage(bgUrl);
                    setSelectedBackgroundUrl(bgUrl);
                  }}
                />
                {selectedBackgroundUrl === bgUrl && (
                  <div className="absolute top-0 right-0 p-1">
                    <div className="bg-blue text-white rounded-full w-6 h-6 flex items-center justify-center">
                      ✓
                    </div>
                  </div>
                )}
                {selectedBackgroundUrl === bgUrl && (
                  <div className="absolute bottom-0 left-0 p-8">
                    <h1 className="font-bold text-lg">Selected</h1>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        {/* merged image */}
        {removedBgImage && (
          <div className="p-4 flex flex-col gap-2 justify-center items-center">
            <Button onClick={handleMergeImagesClick}>Merge Images</Button>
            {mergedImageSrc && (
              <img
                width="350px"
                height="300px"
                src={mergedImageSrc}
                alt="Merged"
                className="object-contain"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
