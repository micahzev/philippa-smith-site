# Admin Guide — Managing Content

For anyone who needs to add, edit, or reorder works and projects on the site.

## Logging in

Go to your Studio URL (something like `https://philippasmith-studio.sanity.studio`) and sign in with the Google/GitHub/email account that was invited.

You'll see the **Content** panel on the left with three sections:
- **Projects (in display order)** — the carousels, in the order they appear on the site
- **All Works** — a flat list of every artwork (useful for finding and editing a specific piece)
- **Site Settings** — contact email and site meta description

---

## Adding a new carousel (project)

1. Click **Projects (in display order)** → **+ New Project**
2. Fill in:
   - **Project Name** — the title shown above the carousel (e.g., "Paintings 2024")
   - **Display Order** — a number. Lower = higher on the page. Use 10, 20, 30, 40… so you have room to insert between them later.
   - **Show on site** — toggle on when you're ready for it to appear publicly. Leave off while drafting.
   - **Works in this project** — click "Add item" to link existing Works, or "Add item → Create new Work" to make a new one inline.
3. Click **Publish** (bottom right). Changes appear on the site within ~30 seconds.

## Adding a new work (artwork)

You can create a Work two ways:

**From inside a Project** (recommended — keeps it linked):
- Open the Project → under "Works in this project", click "Add item" → "Create new Work"

**Standalone** (if you want to create it first and link later):
- Click **All Works** → **+ New Work**

Fields (all except Media Type are optional):
- **Piece Name** — e.g. "Summer Field"
- **Technique / Medium** — e.g. "Oil on linen"
- **Size** — e.g. "120 × 90 cm"
- **Year** — e.g. "2024"
- **Media Type** — Image or Video (toggle)
- **Image** — drag and drop, or click to upload. Sanity automatically compresses and resizes for the web — upload the highest quality you have.
- For videos:
  - **Video Poster Image** — a still frame shown before play. Required in practice so the carousel has something visible.
  - **Video File** — upload directly (best for videos under ~20MB)
  - **Video URL** — alternative for larger videos hosted elsewhere

Click **Publish** when done.

---

## Reordering carousels

Open any Project and change its **Display Order** number. Lower numbers come first.

Example: if you have projects at orders 10, 20, 30 and want to slot a new one between the second and third, set its order to 25.

## Reordering works inside a carousel

1. Open the Project
2. In the "Works in this project" list, **drag the handle** (≡ icon on the left of each item) up or down
3. Click **Publish**

## Hiding a project temporarily

Open the Project → toggle **Show on site** off → Publish.

The project stays in your CMS but disappears from the public site. Toggle back on anytime.

## Removing a work from a carousel (without deleting it)

Open the Project → find the work in the list → click the **⋮** menu on the right → **Remove**.

The Work document still exists — you've only removed the reference. To delete it entirely, go to **All Works** → open it → ⋮ menu → Delete.

---

## Editing the contact email

Click **Site Settings** → update **Contact Email** → Publish.

*Note: the current frontend reads the contact email from a constant in `index.html`. To make it fully dynamic from Site Settings, ask your developer to wire it up — it's a 3-line change.*

---

## Troubleshooting

**I published but don't see the change on the site**
- Wait 60 seconds (Sanity's CDN has a short cache)
- Hard-refresh your browser (Cmd/Ctrl + Shift + R)
- Make sure **Show on site** is toggled on for that Project

**The carousel shows "—/—" and no arrows work**
- The Project has no works linked, or all its works were deleted

**An image looks cropped weirdly**
- Open the Work → click the image → click the hotspot tool and drag the crop point to the focal area

**I need to undo something**
- Every document has a **Review changes** panel (top right) that shows full edit history — you can restore previous versions
