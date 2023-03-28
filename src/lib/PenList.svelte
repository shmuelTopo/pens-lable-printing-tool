<script>
    export let itemLabel;
    export let highlighted;
    export let imgSrc
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<li class="autocomplete-items" class:autocomplete-active={highlighted} on:click>
    <span>{@html itemLabel}</span>
    <img src="{imgSrc}" alt="">
</li>

<style>
    li {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    img {
        max-height: 30px;
        max-width: 138px;
    }
    li.autocomplete-items {
        list-style: none;
        border-bottom: 1px solid #d4d4d4;
        z-index: 99;
        /*position the autocomplete items to be the same width as the container:*/
        top: 100%;
        left: 0;
        right: 0;
        padding: 10px;
        cursor: pointer;
        background-color: #fff;
    }

    li.autocomplete-items:hover {
        /*when hovering an item:*/
        background-color: rgb(241, 241, 241);
    }

    li.autocomplete-items:active {
        /*when navigating through the items using the arrow keys:*/
        background-color: rgb(235, 235, 235)!important;
    }

    .autocomplete-active {
        /*when navigating through the items using the arrow keys:*/
        background-color: DodgerBlue !important;
        color: #ffffff;
    }
</style>