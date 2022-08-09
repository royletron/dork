import { join } from "path";
import type { Arguments, CommandBuilder } from "yargs";
import { loadYaml } from "../format";
import { DorkEngine } from "../format/Engine";

type Options = {
  config: string;
};

export const command: string = "run <config>";
export const desc: string = "Run <config> with Dork";

export const builder: CommandBuilder<Options, Options> = (yargs) =>
  yargs.positional("config", { type: "string", demandOption: true });

export const handler = async (argv: Arguments<Options>): Promise<void> => {
  const config = await loadYaml(join(process.cwd(), argv.config));
  const engine = new DorkEngine(config);
  await engine.run();
  process.exit(0);
};
