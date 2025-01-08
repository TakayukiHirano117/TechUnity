import { CldUploadWidget } from "next-cloudinary";
import React from "react";
import MainButton from "../atoms/button/MainButton";

const ImageUpload = () => {
	return (
		<CldUploadWidget
			signatureEndpoint="/api/sign-cloudinary-params"
			uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
			onSuccess={(results) => console.log(results.info.secure_url)}
			options={{
				// cropping: true,
				maxFiles: 1,
			}}
		>
			{({ open }) => {
				return (
					<MainButton className="rounded-full font-bold" onClick={() => open()}>
						Upload an Image
					</MainButton>
				);
			}}
		</CldUploadWidget>
	);
};

export default ImageUpload;
