import { render, screen } from "@testing-library/react";
import { describe } from "vitest";
import Footer from "@/components/organisms/footer/Footer";
import { server } from "../mocks/server";

describe(Footer, () => {
	test("テスト", () => {
		render(<Footer />);
	});
});
