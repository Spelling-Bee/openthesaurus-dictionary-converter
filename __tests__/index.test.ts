import {
  readTextFile,
  removePattern,
  removeWhitespaces,
  removeParentheses,
  readDictionary,
  replaceNewLineWithDelimeter,
  transformDictToJSON,
  removeDuplicates,
  removeCompoundWords
} from "../src";

describe("Generate German Dictionary as JSON", () => {
  describe("Pattern Manipulation", () => {
    test("Removes Pattern", () => {
      const s: string = "Hello World";
      expect(removePattern(s, /World/)).toBe("Hello ");
    });

    test("Removes all Whitespaces", () => {
      const s: string = "    HE LL O WO RL D";
      expect(removeWhitespaces(s)).toBe("HELLOWORLD");
    });

    test("Replaces New Line with Delimeter", () => {
      const s: string = "Hello; World\n Line; Break";
      expect(replaceNewLineWithDelimeter(s, ";")).toBe(
        "Hello; World; Line; Break"
      );
    });

    test("Removes Parentheses", () => {
      const s: string = "HELLO (BEAUTIFUL)WORLD";
      expect(removeParentheses(s)).toBe("HELLO WORLD");
    });
  });

  describe("Array Manipulation", () => {
    test("Remove Duplicates from Array", () => {
      const array = ["Hello", "World", "Hello", "Bombe", "World"];
      expect(array.filter(removeDuplicates).length).toBe(3);
    });

    test("Remove Compound Words from Array", () => {
      const array = ["Hello", "Com-Pound", "Wo rd"];
      expect(array.filter(removeCompoundWords).length).toBe(1);

      expect(array.filter(removeCompoundWords)).not.toContain("Com-Pound");
      expect(array.filter(removeCompoundWords)).not.toContain("Wo rd");
    });
  });

  describe("File Manipulation", () => {
    const txt = "./__tests__/mock-dict.txt";
    const json = "./__tests__/mock-dict.json";
    test("Reads Text File", () => {
      expect(readTextFile(txt)).toBe(
        "Hello; World...; T his; Is; M-y; I'm (Docfd)\nLine; Break; ein"
      );
    });

    test("Separate Dictionary", () => {
      const dict: Array<string> = readDictionary(txt);
      for (let element of ["Hello", "Is", "I'm", "Line", "Break"]) {
        expect(dict).toContain(element);
      }
    });

    test("Transform Dict to JSON", () => {
      transformDictToJSON(txt, json);

      const writtenDict: Array<string> = JSON.parse(readTextFile(json));
      const readDict: Array<string> = readDictionary(txt);
      expect(writtenDict.length).toBe(readDict.length);
      for (let i = 0; i < Math.min(writtenDict.length, readDict.length); i++) {
        expect(readDict[i]).toBe(writtenDict[i]);
      }
    });
  });
});
