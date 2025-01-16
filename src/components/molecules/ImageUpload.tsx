import { CldUploadWidget } from "next-cloudinary";
import React, { memo, ReactElement } from "react";

type ImageUploadType = {
  folder?: string;
  onInsertImage: (name: string, url: string) => void;
  isCropping?: boolean;
  children: (open: () => void) => ReactElement;
};

const ImageUpload = memo(
  ({ folder, onInsertImage, isCropping, children }: ImageUploadType) => {
    return (
      <CldUploadWidget
        signatureEndpoint="/api/sign-cloudinary-params"
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        onSuccess={(results) => {
          if (
            results.info &&
            typeof results.info !== "string" &&
            results.info.display_name &&
            results.info.secure_url
          ) {
            onInsertImage(results.info.display_name, results.info.secure_url);
          } else {
            console.error("Invalid result info:", results);
          }
        }}
        options={{
          cropping: isCropping,
          maxFiles: 1,
          resourceType: "image",
          sources: ["local"],
          clientAllowedFormats: ["png", "jpeg", "jpg", "gif", "svg", "webp"],
          multiple: false,
          language: "ja",
          folder: folder,
        }}
      >
        {({ open }) => children(open)}
      </CldUploadWidget>
    );
  },
);

ImageUpload.displayName = "ImageUpload";

export default ImageUpload;
