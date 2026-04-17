# AI Role Discussion Platform - Usage Guide

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure your LLM API key:
- Copy `.env.example` to `.env.local`
- Add your LLM API key and configuration:
  ```
  VITE_LLM_API_KEY=your_api_key_here
  VITE_LLM_BASE_URL=https://opencode.ai/zen/go/v1/chat/completions
  VITE_LLM_DEFAULT_MODEL=qwen3.5-plus
  ```

## Running the Application

```bash
npm run dev
```

## Features

### Role Configuration
- Edit the hero and villain prompts to customize their personalities
- Set the number of discussion rounds (default: 10)

### Starting a Discussion
1. Enter a discussion topic
2. Click "Start Discussion"
3. Watch as the AI roles alternate responses
4. View the summary and key points when complete
5. Save the discussion to local storage

## Customization

- Modify prompts in the Role Editor
- Adjust discussion rounds
- Results are saved automatically to browser local storage

## Troubleshooting

- **API Key Issues**: Ensure your key is valid and has the correct format
- **Network Errors**: Check your internet connection and API status
- **Rate Limits**: LLM API has rate limits - wait and try again