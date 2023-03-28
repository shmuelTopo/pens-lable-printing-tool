<script>
    export let pens;


    export let submit;

    import Pen from "./PenList.svelte";

    function getPenName(id) {
        const penId = removeBold(id)
        const pens = JSON.parse(localStorage.getItem("pens-dataset"))
        if(!pens || !pens[penId] || !pens[penId].penName) return ""
        return ` - ${pens[penId].penName}`
    }

    function getPenImg(id) {
        const penId = removeBold(id)
        const pens = JSON.parse(localStorage.getItem("pens-dataset"))
        if(!pens || !pens[penId]) return ""
        return pens[penId].imgSrc
    }
    /* FILTERING pens DATA BASED ON INPUT */
    let filteredPens = [];

    const filterPens = () => {
        let storageArr = [];
        if (inputValue) {
            for(let i = 0, count = 0; i < pens.length && count < 10; i++) {
                const pen = pens[i]
                if (pen.toLowerCase().startsWith(inputValue.toLowerCase())) {
                    storageArr = [...storageArr, makeMatchBold(pen)];
                    count++
                }
            }
        }
        filteredPens = storageArr;
    };

    /* HANDLING THE INPUT */
    let searchInput; // use with bind:this to focus element
    let inputValue;

    $: if (!inputValue) {
        filteredPens = [];
        hiLiteIndex = null;
    }

    const clearInput = () => {
        inputValue = "";
        searchInput.focus();
    };

    const setInputVal = (penName) => {
        inputValue = removeBold(penName);
        filteredPens = [];
        hiLiteIndex = null;
    };

    const submitValue = () => {
        if (inputValue && pens.includes(inputValue)) {
            submit(inputValue);
            clearInput();
        }
    };

    const makeMatchBold = (str) => {
        // replace part of (country name === inputValue) with strong tags
        let matched = str.substring(0, inputValue.length);
        let makeBold = `<strong>${matched}</strong>`;
        let boldedMatch = str.replace(matched, makeBold);
        return boldedMatch;
    };

    const removeBold = (str) => {
        //replace < and > all characters between
        return str.replace(/<(.)*?>/g, "");
        // return str.replace(/<(strong)>/g, "").replace(/<\/(strong)>/g, "");
    };

    /* NAVIGATING OVER THE LIST OF COUNTRIES W HIGHLIGHTING */
    let hiLiteIndex = null;

    const navigateList = (e) => {
        if (e.key === "ArrowDown" && hiLiteIndex <= filteredPens.length - 1) {
            hiLiteIndex === null ? (hiLiteIndex = 0) : (hiLiteIndex += 1);
        } else if (e.key === "ArrowUp" && hiLiteIndex !== null) {
            hiLiteIndex === 0
                ? (hiLiteIndex = filteredPens.length - 1)
                : (hiLiteIndex -= 1);
        } else if (e.key === "Enter") {
            setInputVal(filteredPens[hiLiteIndex]);
        } else {
            return;
        }
    };
</script>

<svelte:window on:keydown={navigateList} />

<form autocomplete="off" on:submit|preventDefault={submitValue}>
    <div class="autocomplete">
        <input
            type="text"
            placeholder="Search Pens to add ..."
            bind:this={searchInput}
            bind:value={inputValue}
            on:input={filterPens}
        />
    </div>

    <!-- FILTERED LIST OF COUNTRIES -->
    {#if filteredPens.length > 0}
        <ul id="autocomplete-items-list">
            {#each filteredPens as pen, i}
                <Pen
                    itemLabel={`${pen}${getPenName(pen)}`}
                    highlighted={i === hiLiteIndex}
                    imgSrc={getPenImg(pen)}
                    on:click={() => {
                        setInputVal(pen);
                        submitValue();
                    }}
                />
            {/each}
        </ul>
    {/if}
</form>

<style>
    * {
        box-sizing: border-box;
    }
    form {
        position: relative;
    }
    div.autocomplete {
        /*the container must be positioned relative:*/
        position: relative;
        top: 0;
        left: 0;
        height: 50px;
        display: inline-block;
        width: 400px;
    }
    input {
        border: 1px solid black;
        border-radius: 5px;
        background-color: #f1f1f1;
        padding: 10px;
        font-size: 16px;
        margin: 0;
    }
    input[type="text"] {
        background-color: #f1f1f1;
        width: 400px;
    }

    #autocomplete-items-list {
        position: absolute;
        margin: 0;
        padding: 0;
        top: 40px;
        width: 400px;
        border: 1px solid #ddd;
        background-color: #ddd;
    }
</style>
