import { jsPDF } from "jspdf";
import * as htmlToImage from "html-to-image";

const pensPerPage = 9;
let numOfPens = 0;

export default async function print(pages, callback) {
    const myNewJsPdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "letter",
    });
 
    for (const [index, page] of pages.entries()) {
        if(index !== 0) myNewJsPdf.addPage('letter', 'p')
        const pageElement = document.getElementById(`page-${index}`)
        const node = document.getElementById(`inner-page-${index}`)
        pageElement.style.fontSize = '100px'

        const dataUrl = await htmlToImage.toPng(node);

        myNewJsPdf.addImage(dataUrl.split(',')[1], 'png', 33, 48, 150, 20.333 * page.length)
        pageElement.style.fontSize = '30px'
    }

    try {
        const hi = await myNewJsPdf.save(`pens tags - ${new Date().toLocaleDateString("en-US")}.pdf`, {returnPromise: true})
        callback()
    } catch(e) {
        console.error(e)
    }
};