# RoMod

![Version](https://img.shields.io/badge/version-1.0.0-brightgreen.svg)
## 📋 Information

Discord to Roblox remote moderation tool that utilizes roblox's cloud API. (MessagingService and Userrestrictions) 

- **Language**: Javascript (node.js) and Luau (roblox side).

### Features
- 🔧 Remote Kick
- 🔧 Remote Ban / Tempban + Unban
- 🔧 Ban checker

## ⚙️ Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/PPX005/RoMod.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd your-path/RoMod
    ```

3. **Install dependencies:**

    Run the following command to install all required dependencies listed in `package.json`:

    ```bash
    npm install
    ```
    
4. **Fill in the `config.json` file**
	```json
	{
	"token": "DISCORD TOKEN https://discord.com/developers/applications",
	"clientId": "BOT'S ID",
	"guildId": "GUILD ID where the bot is running (deployment purposes)",
	"UNIVERSE_ID" : "your game's universe id (not the same as the place id) create.roblox.com",
	"OPENCLOUD_KEY": "your cloud api key https://create.roblox.com/dashboard/credentials"
	}
	```
5. **Paste the `roblox/MSHandler.lua` contents into a **script** in `ServerScriptService` in the game you wish to remotely moderate (Roblox Studio)**
 
6. **Run the bot:**
   Run: (to create the commands in your server)
    ```bash
    node deploy-commands.js
    ```
    And then run: (to start the bot)
    ```bash
    node index.js
    ```
## Disclamer:
This is the first version of the bot. There will progressively be updates and new features will be added. There might be some issues and bugs which ill be happy to fix if asked politely. Discord: @ppx005

## How to configure the roblox opencloud key:
Make sure these permissions are enabled for the desired game:

![image](https://github.com/user-attachments/assets/d52db85f-6b6e-4846-8b13-e253d8d5049a)



