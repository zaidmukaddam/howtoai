import stdout from "@/stdout";
import initChatGPT from "@/init";
import { clear } from "console";
import cliMd from "cli-markdown";

export default async function (question: string) {
  try {
    const loadingMsg = new stdout.loading("Connecting to ChatGPT...");
    loadingMsg.start();

    const chatGPT = await initChatGPT();
    const start = Date.now();

    loadingMsg.setMessage(`thinking... [${Date.now() - start}ms]`);

    const response = await chatGPT.sendMessage(question);

    loadingMsg.stop();
    clear();

    stdout.info("== Question ==");
    stdout.info("Question: " + question);
    stdout.success("== Answer ==");
    stdout.log(cliMd(response));

    process.exit(0);
  } catch (e) {
    if (e instanceof Error) {
      stdout.error(e.message);
      process.exit(0);
    }
  }
}
