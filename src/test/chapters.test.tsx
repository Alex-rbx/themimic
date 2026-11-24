import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Chapters } from "@/components/Chapters";
import { DEFAULT_CONTENT } from "@/lib/site-content";

afterEach(cleanup);

describe("Chapter access", () => {
  it("reveals Asylum rooms only after choosing chapter I and closes them on another click", () => {
    render(<Chapters asylum={DEFAULT_CONTENT.asylum} />);
    expect(screen.queryByRole("region", { name: "Asylum rooms" })).toBeNull();
    const asylum = screen.getByRole("button", { name: /Asylum/ });
    fireEvent.click(asylum);
    expect(screen.getByRole("region", { name: "Asylum rooms" })).toBeInTheDocument();
    expect(screen.getByText("Dorm B")).toBeInTheDocument();
    fireEvent.click(asylum);
    expect(screen.queryByRole("region", { name: "Asylum rooms" })).toBeNull();
  });

  it("keeps chapters II and III unavailable", () => {
    render(<Chapters asylum={DEFAULT_CONTENT.asylum} />);
    for (const chapter of ["II", "III"]) {
      const button = screen.getByRole("button", { name: `Chapter ${chapter} — locked` });
      expect(button).toBeDisabled();
      fireEvent.click(button);
      expect(screen.queryByRole("region", { name: "Asylum rooms" })).toBeNull();
    }
  });
});