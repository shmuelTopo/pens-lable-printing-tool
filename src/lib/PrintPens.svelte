<script>
    // @ts-nocheck

    export let functionWrapper;
    export let pens;
    const pensPerPage = 9;
    let pages = [];
    let numOfPens = 0;
    import printPens from "../print.js";
    let penIdCounter = 0;
    let penNameFontSize = 0.3;
    let showLines = true;

    functionWrapper.reavaluate = function () {
        pages.length = 0;
        let penQuantity = 0;
        pens.forEach((p, i) => {
            p.penFontId = penIdCounter++;

            for (let i = 0; i < p.quantity; i++) {
                const pensOnLastPage = penQuantity % pensPerPage;
                const fullPages = (penQuantity - pensOnLastPage) / pensPerPage;
                if (pensOnLastPage === 0) {
                    pages.push([]);
                }
                pages[fullPages].push(p);
                penQuantity++;
                numOfPens++;
            }
        });
    };
    functionWrapper.reavaluate();
</script>

<button
    on:click={() => {
        const tempShowLines = showLines;
        showLines = false;
        printPens(pages, () => showLines = tempShowLines);
    }}>Save as Pdf</button
>
<button on:click={() => (showLines = !showLines)}
    >{showLines ? "Hide Lines" : "Show Lines"}</button
>

<div>
    Pen Name Font Size:
    <button
        on:click={() => {
            penNameFontSize += 0.01;
        }}>➕</button
    >
    <button
        on:click={() => {
            penNameFontSize -= 0.01;
        }}>➖</button
    >
</div>
<div class="paper">
    {#each pages as page, i}
        <div id="page-{i}" class="page">
            <div id="inner-page-{i}">
                {#each page as pen, j}
                    <div
                        id="page-{i}-pen-{i * (page.length - 1) + j}"
                        class="pen-tag {showLines ? 'outline' : ''}"
                    >
                        <div
                            class="font-size-control {showLines
                                ? ''
                                : 'hidden'}"
                        >
                            <button
                                on:click={() => {
                                    pen.fontSize ??= penNameFontSize;
                                    pen.setFontSize(pen.fontSize + 0.01);
                                }}>➕</button
                            >
                            <button
                                on:click={() => {
                                    pen.fontSize ??= penNameFontSize;
                                    pen.setFontSize(pen.fontSize - 0.01);
                                }}>➖</button
                            >
                        </div>

                        <div class="pen-name">
                            <p
                                style="font-size: {pen.fontSize ||
                                    penNameFontSize}em"
                                class="pen-font-id-{pen.penFontId}"
                            >
                                {pen.penName ||
                                    `Pen # ${i * page.length + j + 1}`}
                            </p>
                        </div>

                        <div class="pen-id"><p>{pen.id}</p></div>
                        <div class="empty">{showLines ? "⚪" : ""}</div>
                        <div class="pen-picture">
                            <img
                                class={pen.getSelectedImage().split("\\")[
                                    pen.getSelectedImage().split("\\").length -
                                        1
                                ]}
                                src={pen.getSelectedImage()}
                                alt=""
                            />
                        </div>

                        <div class="out-of-stock">
                            <p>
                                Sorry we've<br /> sold out <br /> Please check
                                <br />
                                back later... <br /> Thank you!
                            </p>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    {/each}
    <canvas id="myCanvas" />
</div>

<style>
    * {
        box-sizing: border-box;
    }
    .paper {
        padding: 1em;
        display: flex;
        gap: 1em;
        width: 100%;
        flex-wrap: wrap;
        font-size: 30px;
        line-height: 1.2;
    }
    .page {
        width: 21.59em;
        height: 27.94em;
        padding: 4.8em 3.3em;
        outline: black 1px solid;
        display: flex;
        flex-direction: column;
        background-color: white;
    }

    .pen-tag {
        height: 2em;
        width: 15em;

        display: flex;
        flex-direction: row-reverse;

        align-items: center;
        /* display: grid;
        grid-template-columns: 3.7em 7.3em 2em 1.5em 2.5em; */
        background-color: white;
        position: relative;
    }

    .outline {
        outline: 1px solid black;
    }

    .pen-tag > div {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .pen-tag p {
        font-size: 0.32em;
    }

    p {
        writing-mode: tb-rl;
        text-align: center;
        margin: 0;
    }

    .pen-name {
        width: 1.3em;
        height: 2em;
        display: flex;
        flex-direction: row-reverse;
        text-transform: uppercase;
        font-weight: bold;
        font-family: "Suez One", serif;
        padding: 3px;
    }

    .font-size-control {
        display: flex;
        flex-direction: column;
        position: absolute;
        right: -30px;
    }

    .font-size-control button {
        padding: 0;
    }

    .hidden {
        display: none !important;
    }

    .pen-id {
        width: 0.7em;
        height: 2em;
        display: flex;
        flex-direction: row-reverse;
    }

    .pen-id p {
        font-size: 0.4em;
    }

    .empty {
        width: 2em;
    }

    .pen-picture {
        height: 100%;
        display: flex;
        align-items: center;
    }

    img {
        max-width: 7.3em;
        max-height: 1.8em;
    }

    .out-of-stock {
        width: 3.7em;
        height: 2;
        line-height: 1.8;
        font-weight: bold;
        font-family: "Kaushan Script", cursive;
    }
</style>
