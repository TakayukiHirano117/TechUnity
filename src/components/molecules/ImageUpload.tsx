import { ImageIcon } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import React from "react";
import MainButton from "../atoms/button/MainButton";

const ImageUpload = ({ onInsertImage }) => {
	return (
		<CldUploadWidget
			signatureEndpoint="/api/sign-cloudinary-params"
			uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
			onSuccess={(results) => {
				console.log(results);
				onInsertImage(results.info.display_name, results.info.secure_url);
			}}
			options={{
				// cropping: true,
				maxFiles: 1,
				resourceType: "image",
				sources: ["local"],
				clientAllowedFormats: ["png", "jpeg", "jpg", "gif", "svg", "webp"],
				multiple: false,
				language: "ja",
				folder: "recruits",
			}}
		>
			{({ open }) => {
				return (
					<MainButton
						className="rounded-full font-bold flex gap-1"
						onClick={() => open()}
						variant={"outline"}
					>
						<ImageIcon size={24} />
						<span>画像を挿入</span>
					</MainButton>
				);
			}}
		</CldUploadWidget>
	);
};

export default ImageUpload;
