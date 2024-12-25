import SampleButton from "@/components/atoms/button/SampleButton";
import SearchIcon from "@/components/atoms/SearchIcon";

export default function Home() {
	return (
		<div className="flex items-center justify-end">
      <SearchIcon className="hover:opacity-70 w-6 h-6 font-bold cursor-pointer" />
			<SampleButton text={"募集する"} className="rounded-full font-bold" />
		</div>
	);
}
