import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

// ---------------------------------------------------------------------------
// Cloudinary configuration
// ---------------------------------------------------------------------------
const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || "dlq5bzbse";
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

const CLOUDINARY_BASE = `https://res.cloudinary.com/${CLOUD_NAME}`;

function normalizeCollectionKey(key) {
  if (key === "ready_to_wear") return "readyToWear";
  if (key === "custom_made_bridal") return "customBridal";
  return key;
}

// ---------------------------------------------------------------------------
// Cloudinary Admin API helpers
// ---------------------------------------------------------------------------
async function fetchCloudinaryResources(resourceType, folder, nextCursor) {
  const params = new URLSearchParams({
    type: "upload",
    prefix: folder,
    max_results: "500",
  });
  if (nextCursor) params.set("next_cursor", nextCursor);

  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/${resourceType}?${params}`;
  const res = await fetch(url, {
    headers: {
      Authorization:
        "Basic " + Buffer.from(`${API_KEY}:${API_SECRET}`).toString("base64"),
    },
  });

  if (!res.ok) {
    throw new Error(`Cloudinary API ${res.status}: ${await res.text()}`);
  }
  return res.json();
}

async function listAllResources(resourceType, folder) {
  const items = [];
  let cursor = undefined;

  do {
    const data = await fetchCloudinaryResources(resourceType, folder, cursor);
    items.push(...(data.resources || []));
    cursor = data.next_cursor;
  } while (cursor);

  return items;
}

function buildMediaEntry(resource) {
  const isVideo = resource.resource_type === "video";
  const type = isVideo ? "video" : "image";
  const src = resource.secure_url;
  const name = resource.public_id.split("/").pop();

  return { type, src, alt: name, title: name };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  if (!API_KEY || !API_SECRET) {
    console.error(
      "⚠  CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET must be set in .env.local"
    );
    process.exit(1);
  }

  const collections = {
    bespoke: {
      title: "Bespoke Atelier",
      description: "Individually Crafted Heritage",
      media: [],
    },
    readyToWear: {
      title: "Ready-to-Wear Series",
      description: "Contemporary Excellence",
      media: [],
    },
    customBridal: {
      title: "Custom Made & Bridals",
      description: "Bespoke Bridal Artistry",
      media: [],
    },
  };

  const folderMap = [
    { folder: "bespoke", key: "bespoke" },
    { folder: "ready_to_wear", key: "ready_to_wear" },
    { folder: "custom_made_bridal", key: "custom_made_bridal" },
  ];

  for (const { folder, key } of folderMap) {
    const normalizedKey = normalizeCollectionKey(key);
    try {
      const images = await listAllResources("image", folder);
      const videos = await listAllResources("video", folder);
      const media = [...images, ...videos]
        .map(buildMediaEntry)
        .sort((a, b) => a.src.localeCompare(b.src));
      collections[normalizedKey].media = media;
      console.log(`  ✓ ${folder}: ${media.length} items`);
    } catch (err) {
      console.warn(`  ✗ ${folder}: ${err.message}`);
    }
  }

  const gallery = Object.entries(collections).flatMap(([collectionKey, data]) =>
    data.media.map((m) => ({ ...m, collection: collectionKey }))
  );

  const outDir = path.join(projectRoot, "src", "data");
  await fs.mkdir(outDir, { recursive: true });

  const outPath = path.join(outDir, "collections.json");
  await fs.writeFile(
    outPath,
    JSON.stringify({ collections, gallery }, null, 2) + "\n",
    "utf8"
  );

  console.log(`\n✓ collections.json written (${gallery.length} total items)\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
