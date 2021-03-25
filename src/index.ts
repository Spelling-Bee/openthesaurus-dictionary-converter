import fs from "fs";

export function readTextFile(source: string): string {
  const data = fs.readFileSync(source, "utf8");
  return data.toString();
}

export function removePattern(text: string, pattern: RegExp): string {
  return text.replace(pattern, "");
}

export function removeWhitespaces(text: string): string {
  return removePattern(text, / /g);
}

export function removeParentheses(text: string): string {
  return removePattern(text, /\([^\)]+\)/g);
}

export function replaceNewLineWithDelimeter(
  text: string,
  delimeter: string
): string {
  return text.replace(/\n/g, delimeter);
}

export function removeDuplicates(
  element: string,
  index: number,
  array: Array<string>
): boolean {
  return (
    array.map(word => word.toUpperCase()).indexOf(element.toUpperCase()) ===
    index
  );
}

export function removeCompoundWords(element: string): boolean {
  return !(element === "" || element.match(/(.+[- ].+)|\./g));
}

export function readDictionary(source: string): Array<string> {
  let dictAsString = readTextFile(source);
  dictAsString = removeParentheses(dictAsString);
  dictAsString = replaceNewLineWithDelimeter(dictAsString, ";");
  return dictAsString
    .split(";")
    .filter(removeCompoundWords)
    .map(removeWhitespaces)
    .filter(removeDuplicates);
}

export function transformDictToJSON(source: string, target: string) {
  const dict = readDictionary(source);
  const data = JSON.stringify(dict);

  fs.writeFileSync(target, data);
}

export default transformDictToJSON;
