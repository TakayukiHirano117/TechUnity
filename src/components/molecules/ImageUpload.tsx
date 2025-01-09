import { ImageIcon } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import React from "react";
import MainButton from "../atoms/button/MainButton";

type ImageUploadType = {
	folder?: string;
	onInsertImage: (name: string, url: string) => void;
};

const ImageUpload = ({ folder, onInsertImage }: ImageUploadType) => {
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
				// cropping: true,
				maxFiles: 1,
				resourceType: "image",
				sources: ["local"],
				clientAllowedFormats: ["png", "jpeg", "jpg", "gif", "svg", "webp"],
				multiple: false,
				language: "ja",
				folder: folder,
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
