<script>
    import PenBox from './PenBox.svelte';
    export let pens;
    export let removePen
</script>

<div class="pens-selection">
    {#each pens as pen (pen.selectionId)}
        <PenBox removePen={() => removePen(pen)} pen={pen}></PenBox>
    {/each}
</div>

<style>
    .pens-selection {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr) ) ;
        gap: 5px;
    }
</style>
