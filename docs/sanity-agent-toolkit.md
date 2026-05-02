# Sanity Agent Toolkit Integration

This document covers the [Sanity Agent Toolkit](https://github.com/sanity-io/agent-toolkit) integration for the DAOWatch project. The toolkit enables AI-powered content workflows through an MCP (Model Context Protocol) server and local best-practice skills.

## What's Installed

| File/Directory | Purpose |
| :--- | :--- |
| `.mcp.json` | MCP server configuration pointing to `https://mcp.sanity.io` |
| `AGENTS.md` | Knowledge router — helps AI agents find Sanity guidance by topic |
| `skills/` | Local best-practice references for offline AI agent use |

### Skills Included

| Skill | Description |
| :--- | :--- |
| `sanity-best-practices/` | GROQ, schema design, Visual Editing, images, Portable Text, Studio, TypeGen, localization, migrations, and framework integration guides |
| `content-modeling-best-practices/` | Structured content principles: separation of concerns, references vs embedding, content reuse |
| `seo-aeo-best-practices/` | SEO/AEO with EEAT principles, structured data (JSON-LD), technical SEO patterns |
| `content-experimentation-best-practices/` | A/B testing methodology, statistical foundations, experiment design |
| `portable-text-conversion/` | Converting HTML/Markdown to Portable Text |
| `portable-text-serialization/` | Serializing Portable Text to various formats |

## Setup

### 1. MCP Server Authentication

The MCP server uses OAuth via your Sanity CLI login. To authenticate:

```bash
# Option A: Auto-configure for your editor (recommended)
npx sanity@latest mcp configure

# Option B: If multiple providers are available, specify one:
npx sanity@latest mcp configure --provider github
# Or: google, sanity
```

This will open a browser window for OAuth authentication. Once authenticated, your AI editor can interact directly with your Sanity project.

### 2. Deploy Schema (Required Before MCP Content Operations)

After making any schema changes, deploy to the Content Lake:

```bash
npx sanity schema deploy
```

This is **required** before MCP content tools can work with your content.

### 3. Editor-Specific Configuration

#### Cursor

The `.mcp.json` in the project root is automatically picked up by Cursor. Alternatively:

1. Open **Command Palette** (`Cmd+Shift+P`) → **View: Open MCP Settings**
2. Add the Sanity MCP server:
   ```json
   {
     "mcpServers": {
       "Sanity": {
         "type": "http",
         "url": "https://mcp.sanity.io"
       }
     }
   }
   ```

#### VS Code (Kilo Code / Continue / other MCP clients)

1. Open **Command Palette** (`Cmd+Shift+P`) → **MCP: Open User Configuration**
2. Add:
   ```json
   {
     "servers": {
       "Sanity": {
         "type": "http",
         "url": "https://mcp.sanity.io"
       }
     }
   }
   ```

#### Claude Code

```bash
claude mcp add Sanity -t http https://mcp.sanity.io --scope user
```

## MCP Tools Available

Once authenticated, your AI agent can use these tools:

### Content Operations

| Tool | Use For |
|------|---------|
| `query_documents` | Run GROQ queries directly against your dataset |
| `get_document` | Fetch a single document by exact ID |
| `create_documents_from_json` | Create draft documents from JSON |
| `create_documents_from_markdown` | Create draft documents from markdown |
| `patch_document_from_json` | Apply precise modifications to document fields |
| `patch_document_from_markdown` | Patch a field using markdown content |
| `publish_documents` | Publish one or more drafts |
| `unpublish_documents` | Unpublish documents (move back to drafts) |
| `discard_drafts` | Discard drafts while keeping published documents |

### Schema & Development

| Tool | Use For |
|------|---------|
| `get_schema` | Get full schema of the current workspace |
| `list_workspace_schemas` | List all available workspace schema names |
| `deploy_schema` | Deploy schema types to the cloud |
| `search_docs` / `read_docs` | Search and read Sanity documentation |
| `list_sanity_rules` / `get_sanity_rules` | Load best-practice development rules |
| `migration_guide` | Get guides for migrating from other CMSs |

### Media & AI

| Tool | Use For |
|------|---------|
| `generate_image` | AI image generation for a document field |
| `transform_image` | AI transformation of an existing image |

### Releases

| Tool | Use For |
|------|---------|
| `create_version` | Create a version document for a release |
| `version_replace_document` | Replace version contents from another document |
| `version_discard` | Discard document versions from a release |
| `version_unpublish_document` | Mark document to be unpublished when release runs |

### Project Management

| Tool | Use For |
|------|---------|
| `list_projects` / `list_organizations` | List projects and organizations |
| `create_project` | Create a new Sanity project |
| `list_datasets` / `create_dataset` / `update_dataset` | Manage datasets |
| `add_cors_origin` | Add CORS origins for client-side requests |
| `list_embeddings_indices` / `semantic_search` | Semantic search on embeddings |

## Usage Examples

Once MCP is connected, you can ask your AI agent things like:

- "Query all published blog posts and show me their titles"
- "Create a new draft blog post about DAO governance"
- "Publish the draft with ID xyz123"
- "Generate an AI image for the hero section of my latest post"
- "Deploy the current schema to the Content Lake"
- "Search Sanity docs for Visual Editing setup"

## Knowledge Router (AGENTS.md)

The `AGENTS.md` file in the project root acts as a knowledge router for AI agents. When the MCP server is available, agents use `list_sanity_rules` and `get_sanity_rules` for always up-to-date guidance. When offline, they fall back to the local `skills/` directory.

### Key Topics in the Knowledge Router

| Topic | When to Use | Reference File |
| :--- | :--- | :--- |
| Schema design | Creating/modifying content models | `skills/sanity-best-practices/references/schema.md` |
| GROQ queries | Writing or optimizing queries | `skills/sanity-best-practices/references/groq.md` |
| Next.js integration | Pages Router, data fetching | `skills/sanity-best-practices/references/nextjs.md` |
| Images | urlFor, crops, hotspots | `skills/sanity-best-practices/references/image.md` |
| Portable Text | Rich text rendering | `skills/sanity-best-practices/references/portable-text.md` |
| SEO | Metadata, sitemaps, JSON-LD | `skills/sanity-best-practices/references/seo.md` |
| TypeGen | TypeScript type generation | `skills/sanity-best-practices/references/typegen.md` |

## Keeping Skills Updated

The local skills are a snapshot from the [agent-toolkit repo](https://github.com/sanity-io/agent-toolkit). To update:

```bash
# Clone the latest toolkit
git clone --depth 1 https://github.com/sanity-io/agent-toolkit.git /tmp/sanity-agent-toolkit

# Copy updated skills
cp -r /tmp/sanity-agent-toolkit/skills/* ./skills/
cp /tmp/sanity-agent-toolkit/AGENTS.md ./AGENTS.md

# Clean up
rm -rf /tmp/sanity-agent-toolkit
```

## Troubleshooting

### MCP authentication fails
- Run `npx sanity@latest login` first to establish a CLI session
- Then run `npx sanity@latest mcp configure`
- If multiple providers are available, use `--provider <name>` (google, github, or sanity)

### MCP tools can't find content
- Ensure you've deployed your schema: `npx sanity schema deploy`
- Verify your project ID matches in `.env.local` and `sanity.config.ts`

### Skills not loading
- Check that `AGENTS.md` exists in the project root
- Verify the `skills/` directory structure is intact
- The MCP server's `list_sanity_rules`/`get_sanity_rules` tools can also load rules remotely

## Resources

- [Sanity Agent Toolkit GitHub](https://github.com/sanity-io/agent-toolkit)
- [Sanity MCP Server Docs](https://www.sanity.io/docs/compute-and-ai/mcp-server)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Agent Skills Specification](https://agentskills.io)
