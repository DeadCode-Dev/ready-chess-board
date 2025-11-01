# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/c72f47d5-6e08-427a-8553-c0f173013616

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/c72f47d5-6e08-427a-8553-c0f173013616) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## Features

### Chess Game Features
- **Full Chess Rules**: Includes castling, en passant, pawn promotion, check, and checkmate detection
- **Move History**: Track all moves made during the game
- **Captured Pieces**: View pieces captured by each player
- **Move Navigation**: Navigate backward and forward through move history

### New Features
- **React Icons**: Chess pieces now use FontAwesome icons from react-icons for a modern look
- **PGN Export**: Download game in PGN (Portable Game Notation) format
- **PGN Sharing**: Copy PGN to clipboard for easy sharing
- **Auto-Save**: Games automatically save to localStorage
- **Resume Games**: Continue unfinished games after page reload
- **Smart Game Management**: Dialog prompts to continue or start new game when an unfinished game exists
- **Finished Game Protection**: Prevents continuing games that ended in checkmate, stalemate, or draw
- **Position Analysis**: Analyze current board position using Lichess's free analysis board (opens in new tab)

### Chess Analysis API
This project integrates with **Lichess.org's free analysis board** for position analysis:
- Click the "Analyze" button to open the current position in Lichess's analysis board
- Lichess provides free access to Stockfish engine analysis
- No API key required
- Documentation: https://lichess.org/api

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- chess.js (Chess game logic)
- react-icons (Chess piece icons)

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/c72f47d5-6e08-427a-8553-c0f173013616) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
