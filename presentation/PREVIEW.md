# View the deck in Cursor

## View the PDF inside Cursor (recommended)

Cursor can show the PDF in the editor if a PDF viewer extension is installed.

### 1. Install the PDF viewer (one-time)

- **Ctrl+Shift+X** (Extensions) → search **“PDF Viewer”** by AdamRaichu → **Install**  
- Or when Cursor suggests **“This workspace has extension recommendations”**, click **Install**.

### 2. Open the deck file (not the folder)

- **Quick open:** **Ctrl+P** (Mac: **Cmd+P**) → type **`Artificial_Capital_Pitch_Deck.pdf`** → Enter.  
- Or in the **file explorer**, expand **`presentation`** and click the **file** **`Artificial_Capital_Pitch_Deck.pdf`** (the PDF, not the folder).

**If you see:** *“The file is not displayed in the text editor because it is a directory”*  
→ The editor thinks you opened a **folder**. Use **Ctrl+P** and type the filename **`Artificial_Capital_Pitch_Deck.pdf`** so the correct file opens, or expand `presentation` in the sidebar and click only the `.pdf` file.

### 3. Regenerate the PDF after editing the deck

In a terminal, from the `presentation` folder:

```bash
npm run build:pdf
```

---

## Other ways to view

- **HTML in Simple Browser:** Ctrl+Shift+P → **“Simple Browser: Show”** → paste:  
  `file:///c:/Users/nhzla/.cursor/ArtificialCapital/presentation/index.html`
- **Local server:** Ctrl+Shift+P → **“Tasks: Run Task”** → **“Preview deck (start server)”** → in Simple Browser open **http://localhost:3000**
