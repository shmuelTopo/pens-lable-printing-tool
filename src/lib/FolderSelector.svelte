<script>
    import { open } from "@tauri-apps/api/dialog";

    export let folder = {};
    export let lable = "Select Folder";
    export let callback;
    export let folderId;
    const localStorageKey = `folder-selector-${folderId}`

    folder.path = localStorage.getItem(localStorageKey)
    callback()
    
    async function selectFolderPath() {
        // Open a selection dialog for directories
        const selected = await open({
            directory: true,
            multiple: false,
        });
        if (typeof selected === "string") {
            folder.path = selected;
            localStorage.setItem(localStorageKey, selected)
            folder = folder;
            if (callback) {
                callback();
            }
        }
    }
</script>

<div class="folder">
    <button on:click={selectFolderPath}>{lable}</button>
    <p>{folder.path || "Not selected yet"}</p>
</div>

<style>
    .folder {
        font-size: 0.7rem;
        display: flex;
        width: 100%;
        gap: 2rem;
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
