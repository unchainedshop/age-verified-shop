import { mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";

export default async function (job: { input: { name: string; company: string }; _id: string; }) {
    const tempDir = await mkdtemp(tmpdir() + "/");

    const inputFilePath = `${tempDir}/${job._id}.stm`;
    
    await writeFile(inputFilePath, `[bold: on]\
[magnify: width 3; height 3]\
Star Eats
[negative: on]\
8A720\
[space: count 1]\
Micronics
[plain]\
[align: center]
[magnify: width 1; height 1]
Placed at March 24 2021 1:30PM
[upperline: on]
[space: count 48]
[plain]\
[bold: on]
[magnify: width 2; height 2]\
DELIVERY
[plain]\
[underline: on]
[space: count 48]
[plain]
[column: left 1XStar's lunch box A *; right $10.95; short lunch box A *]
------------------------------------------------
[column: left Subtotal; right $0.97]
[column: left Ammount paid; right $11.92]
[column: left item 1; right $10.00]
------------------------------------------------
[align: left]\
*Use special source as you like!
[cut: feed; partial]
`)


    return inputFilePath;
}