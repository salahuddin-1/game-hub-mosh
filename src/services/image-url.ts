import noImage from "../assets/no_image.jpeg";

const getCroppedImageUrl = (url: string) => {
  if (!url) {
    return noImage;
  }

  const target = "media/";
  const startIndex = url.indexOf(target) + target.length;
  return url.slice(0, startIndex) + "crop/600/400/" + url.slice(startIndex);
};

export default getCroppedImageUrl;
