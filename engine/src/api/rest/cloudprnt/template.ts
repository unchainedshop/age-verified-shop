import { mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";

const convertItemToColumn = ({ name, quantity, price }: { name: string; quantity: number; price: number; }) => {
  const priceStr = Intl.NumberFormat("de-CH", { style: "currency", currency: "CHF" }).format(price);
  return `[column: left ${quantity}x ${name}; right ${priceStr}; short ${name}]`
}

export default async function (job: { input: { comment: string; total: number; orderNumber: string; orderDate: Date, items: Array<{ name: string; quantity: number; price: number; }> }; _id: string; }) {
  const tempDir = await mkdtemp(tmpdir() + "/");
  const inputFilePath = `${tempDir}/${job._id}.stm`;
  const { orderNumber, orderDate, items, total, comment } = job?.input || {};
    
  await writeFile(inputFilePath, `[bold: on]\
[magnify: width 2; height 2]\
Abholschein
[negative: on]\
unchained.shop
[plain]\
[align: center]
[magnify: width 1; height 1]
${orderNumber} / ${new Date(orderDate).toLocaleDateString("de-CH")}
[upperline: on]
[space: count 32]
[plain]
${items.map(convertItemToColumn).join(`
`)}
-------------------------------
[column: left Total; right ${Intl.NumberFormat("de-CH", { style: "currency", currency: "CHF" }).format(total)}]
-------------------------------
${comment}
[cut: feed; partial]
`)

  return inputFilePath;
}