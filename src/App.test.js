// import { render, screen } from '@testing-library/react';
// import App from './App';
//
// test('renders learn react link', () => {
// 	render(<App />);
// 	const linkElement = screen.getByText(/learn react/i);
// 	expect(linkElement).toBeInTheDocument();
// });

import { render } from "@testing-library/react";
import SocialApp from "./App";

// Test that the App Component renders without crashing
describe("SocialApp Component renders without crashing", () => {
	test("renders SocialApp component", () => {
		render(<SocialApp />);
	});
});