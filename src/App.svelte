<script>
  import PenInput from "./lib/PenInput.svelte";
  import PenDisplay from "./lib/PenDisplay.svelte";
  import penManager from "./penManager";
  import FolderSelector from "./lib/FolderSelector.svelte";
  import { Tabs, TabList, TabPanel, Tab } from "./tabs/tabs.js";
  import PrintPens from "./lib/PrintPens.svelte";

  let penNames = [];
  let penFolder = new penManager();
  let selectedPens = penFolder.selectedPens;
  let submitedPens = penFolder.submitedPens;
  let inputFolder = {path: ''};
  let printRefresherWrapper = {}

  async function loadPens() {
    if (!inputFolder.path) {
      return;
    }
    penNames = await penFolder.setFolder(inputFolder);
    // await penFolder.clearCache()
    penNames = penNames;
  }

  async function addPen(pen) {
    await penFolder.addPen(pen);
    selectedPens = penFolder.selectedPens;
  }

  function removePen(pen) {
    penFolder.removePenFromSelection(pen);
    selectedPens = penFolder.selectedPens;
  }

  function removePenFromCart(pen) {
    penFolder.removePenFromCart(pen);
    submitedPens = penFolder.submitedPens;
  }

  function addToCart() {
    penFolder.addToCart();
    selectedPens = penFolder.selectedPens;
    submitedPens = penFolder.submitedPens;
  }
</script>

<main class="container">
  <link rel="stylesheet" href="node_modules/svelte-material-ui/bare.css" />
  <Tabs>
    <TabList>
      <Tab>Home</Tab>
      <Tab>Cart</Tab>
      <Tab>Print</Tab>
    </TabList>

    <TabPanel>
      <h1>Welcome to the Pen Printing tool</h1>
      <button on:click={addToCart}>Add all to cart</button>
      <hr />
      <div class="inputFolder">
        <FolderSelector
          lable="Select Input Folder"
          callback={loadPens}
          folderId="input-pens"
          bind:folder={inputFolder}
        />
        <PenInput bind:pens={penNames} submit={addPen} />
      </div>

      <hr />

      <PenDisplay {removePen} pens={selectedPens} />
    </TabPanel>

    <TabPanel>
      <PenDisplay removePen={removePenFromCart} pens={submitedPens} />
    </TabPanel>

    <TabPanel>
      <PrintPens on:click={printRefresherWrapper.reavaluate() } functionWrapper={printRefresherWrapper} pens={submitedPens}></PrintPens>
    </TabPanel>
  </Tabs>
</main>

<style>
  main {
    padding: 2rem;
  }

  .inputFolder {
    display: flex;
  }

  button {
    font-size: 1rem;
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.5rem 1rem;
    font-weight: 500;
    font-family: inherit;
    color: #0f0f0f;
    background-color: #ffffff;
    transition: border-color 0.25s;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    outline: none;
    text-align: left;
  }

  button:hover {
    border-color: #396cd8;
    background-color: #f7f7f7;
  }
</style>
