import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import { generator as commandGenerator } from "../generators/commandGenerator";
import settings from "../src/setttings.json"
import yargs from "yargs";

async function main(): Promise<boolean> {
    const argv = await yargs
        .option("dryrun", {
            alias: "dry",
            description: "Does a dry-run, doesn't write to any output and just dumps the finished html.",
            type: "boolean"
        })
        .help()
        .alias("help", "h")
        .argv;

    let html: string = (await readFile(join(__dirname, "../src/commands.html"))).toString()

    html = await commandGenerator(html, settings.data.commands);

    if (argv.dryrun) {
        console.log(html);
        return true;
    } else {
        try {
            await writeFile(join(__dirname, "../out/commands.html"), html);
        } catch (error) {
            console.error(" Error:")
            console.error(error);
            return false;
        }
    }

    return true;
}

main().then((failed: boolean) => {
    if (failed) {
        console.log("\n The generation has succeeded. (0)\n");
    } else {
        console.error("\n The generation has failed. (1)\n");
    }
    process.exit(Number(!failed));
});
