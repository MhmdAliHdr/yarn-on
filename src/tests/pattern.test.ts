// src/example.test.ts
import { describe, it, expect } from "vitest";
import { changeAuthor, changeDifficulty, changeImage, changePattern, changeTitle, savePattern } from "../utils/pattern";
import type { Pattern } from "../types/pattern";

describe("Saving a Pattern Test", () => {
  it("Pattern successfully saved", () => {
    localStorage.clear()
    const aPattern: Pattern = {"title": "Some Title 1", "author": "Some Author", "image": "Some Image", "difficulty": "Easy", "sections": []}
    savePattern(aPattern)
    const savedPatterns: Pattern[] = JSON.parse(localStorage.getItem("savedPatterns") ?? "[]")
    expect(savedPatterns.filter((p: Pattern) => {return (p.title == aPattern.title)}).length).toBe(1);
    localStorage.clear()
  });
});

describe("Changing the Current Pattern Test", () => {
  it("Current pattern successfully changed", () => {
    localStorage.clear()
    const aPattern1: Pattern = {"title": "Some Title 1", "author": "Some Author", "image": "Some Image", "difficulty": "Easy", "sections": []}
    const aPattern2: Pattern = {"title": "Some Title 2", "author": "Some Author", "image": "Some Image", "difficulty": "Easy", "sections": []}
    savePattern(aPattern1)
    savePattern(aPattern2)
    let currentPattern = aPattern1
    currentPattern = changePattern("Some Title 2")
    expect(currentPattern.title).toBe(aPattern2.title);
    localStorage.clear()
  });
});

describe("Changing Pattern Title Test", () => {
  it("Pattern title successfully changed", () => {
    const aPattern: Pattern = {"title": "Some Title", "author": "Some Author", "image": "", "difficulty": "Some Difficulty", "sections": []}
    const changedPattern: Pattern = changeTitle("New Title", aPattern)
    expect(changedPattern.title).toBe("New Title");
  });
});

describe("Changing Pattern Author Test", () => {
  it("Pattern author successfully changed", () => {
    const aPattern: Pattern = {"title": "Some Title", "author": "Some Author", "image": "", "difficulty": "Some Difficulty", "sections": []}
    const changedPattern: Pattern = changeAuthor("New Author", aPattern)
    expect(changedPattern.author).toBe("New Author");
  });
});

describe("Changing Pattern Difficulty Test", () => {
  it("Pattern difficulty successfully changed", () => {
    const aPattern: Pattern = {"title": "Some Title", "author": "Some Author", "image": "", "difficulty": "Easy", "sections": []}
    const changedPattern: Pattern = changeDifficulty("Intermediate", aPattern)
    expect(changedPattern.difficulty).toBe("Intermediate");
  });
});

describe("Changing Pattern Image Test", () => {
  it("Pattern image successfully changed", () => {
    const aPattern: Pattern = {"title": "Some Title", "author": "Some Author", "image": "Some Image", "difficulty": "Easy", "sections": []}
    const changedPattern: Pattern = changeImage("New Image", aPattern)
    expect(changedPattern.image).toBe("New Image");
  });
});