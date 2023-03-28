<script>
    export let removePen;
    export let pen;
    
    let penNameInput = pen.penName;
    let waitingForImage = false
    let imgSrc = pen.getSelectedImage()
    let imgIndex = pen.imageIndex
    
    function penNameInputCallback() {
        pen.setPenName(penNameInput)
    }

    function onError() {
        imgSrc = ''
        setTimeout(() => {
            imgSrc = pen.getSelectedImage()
        }, 500)
    }
</script>

<div class="pen">                                                   
    <div class="pen-info">
        <p>{pen.id}</p>
        <input
            on:change={penNameInputCallback}
            bind:value={penNameInput}
            type="text"
        />
        <button on:click={removePen}>❌</button>
    </div>
    <div class="image-info">
        <div class="image-select">
            {#each pen.images as url, i}
                <label>
                    <input type=radio on:click={() => {pen.setImageIndex(i); imgSrc = pen.getSelectedImage()}} bind:group={imgIndex} value={i}>
                </label>
            {/each}
           
        </div>
        <img class={waitingForImage ? 'waiting' : ''} on:error={onError} src={imgSrc} alt="pen" />
        <div class="quantityAddSubstract">
            <p>{pen.quantity}</p>
            <button on:click={() => {pen.add(); pen = pen}}>➕</button>
            <button on:click={() => {pen.substract(); pen = pen}} disabled={pen.quantity <= 1}>➖</button>
        </div>
        
    </div>
</div>

<style>
    .pen {
        border: 1px black solid;
        border-radius: 5px;
        padding: 6px 10px;
        height: 130px;
        background-color: rgb(221, 221, 221);
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }

    .pen-info {
        display: grid;
        align-items: start;
        gap: 5px;
        grid-template-columns: 60px 1fr 30px;
    }

    .image-info {
        display: grid;
        grid-template-columns: 30px 1fr 30px;
    }

    img {
        object-fit: cover;
        max-height: 100%;
        max-width:  100%;
    }
    .waiting {
        height: 60px;
        width: 60px;
    }
    input {
        min-width: 20px;
    }

    p {
        margin: 0;
    }

    .quantityAddSubstract > * {
        width: 25px;
        height: 25px;
        display: flex;
        justify-content: center;
    }

</style>
