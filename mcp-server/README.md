# SnapCut AI MCP Server

This is a Model Context Protocol (MCP) server for SnapCut AI, providing tools to interact with SnapCut AI features, pricing, and information.

## Installation

1. Install dependencies:
```bash
cd mcp-server
npm install
```

2. Build the server (optional):
```bash
npm run build
```

## Usage

### How to add to your Claude Desktop / MCP Client

Add this to your MCP configuration file (e.g., Claude Desktop config):

```json
{
  "mcpServers": {
    "snapcut-ai": {
      "command": "node",
      "args": [
        "d:\\project1\\snapcut-ai-06\\mcp-server\\dist\\index.js"
      ],
      "env": {}
    }
  }
}
```

Or if you prefer using TypeScript directly with tsx:

```json
{
  "mcpServers": {
    "snapcut-ai": {
      "command": "npx",
      "args": [
        "tsx",
        "d:\\project1\\snapcut-ai-06\\mcp-server\\src\\index.ts"
      ],
      "env": {}
    }
  }
}
```

## Available Tools

| Tool Name | Description |
|-----------|-------------|
| `get_snapcut_info` | Get comprehensive information about SnapCut AI including features, all plans, and links |
| `get_free_plan_limit` | Get the specific limits of the free SnapCut AI plan |
| `get_pro_plan_details` | Get detailed information about the Pro plan pricing and benefits |
