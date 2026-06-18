#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

const server = new Server(
  {
    name: 'snapcut-ai-mcp-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define our SnapCut AI tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'get_snapcut_info',
        description: 'Get information about SnapCut AI including features, pricing, and links',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'get_free_plan_limit',
        description: 'Get the limits of the free SnapCut AI plan',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'get_pro_plan_details',
        description: 'Get detailed information about the Pro plan pricing and features',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case 'get_snapcut_info': {
      return {
        content: [
          {
            type: 'text',
            text: `
SnapCut AI - Background Removal Tool
=====================================

What is SnapCut AI?
- AI-powered background removal tool
- Fast, private, and accurate
- Studio-quality edges

Key Features:
1. Sub-5s processing
2. Up to 5000×5000 high-res exports
3. Auto-deletes images after 24 hours
4. Developer API available
5. Fair pricing

Plans:
- Free: 5 images/day, up to 5MP
- Pro: ₹499/month, unlimited images, priority queue, API access (1k/month)
- Business: ₹2,499/month, everything in Pro, 10k API calls/month, team seats, webhooks & SLA

Links:
- Home Page: https://snapcut-ai.com/
- Dashboard: https://snapcut-ai.com/dashboard
- Contact Us: https://snapcut-ai.com/contact-us
            `.trim(),
          },
        ],
      };
    }

    case 'get_free_plan_limit': {
      return {
        content: [
          {
            type: 'text',
            text: `
SnapCut AI Free Plan Limits
============================
- 5 free images per day
- Max export resolution: 5MP
- Standard queue processing
- No card required to start
            `.trim(),
          },
        ],
      };
    }

    case 'get_pro_plan_details': {
      return {
        content: [
          {
            type: 'text',
            text: `
SnapCut AI Pro Plan Details
============================
- Price: ₹499 per month
- Benefits:
  - Unlimited images per day
  - Up to 25MP exports
  - Priority queue processing
  - Developer API access (1k calls/month)
- Payment: Processed via Razorpay
            `.trim(),
          },
        ],
      };
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('SnapCut AI MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Error running SnapCut AI MCP Server:', error);
  process.exit(1);
});
