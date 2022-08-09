import { readFile } from "fs-extra";
import { parse, stringify } from "yaml";

export const loadYaml = async (file: string): Promise<any> => {
  const content = await readFile(file, "utf8");
  return parse(content);
};
