import { execSync } from "child_process";
import fs from "fs";
import https from "https";
import path from "path";

// GitHub Repository Info
const REPO_OWNER = "Nathanvititoe"; // Change to your GitHub username
const REPO_NAME = "cashflow-life"; // Change to your repository name
const GITHUB_API_URL = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contributors`;

// Function to get dependencies from package.json
function getDependencies(): string {
  const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
  const dependencies = Object.keys(packageJson.dependencies || {}).map(
    dep => `- **${dep}**: ${packageJson.dependencies[dep]}`
  );
  return dependencies.length ? dependencies.join("\n") : "No dependencies listed.";
}

// Function to get the latest commit messages
function getRecentCommits(): string {
  return execSync("git log -3 --pretty='- %s (%an)'").toString().trim();
}

// Function to get the last commit date
function getLastUpdated(): string {
  return execSync("git log -1 --format=%cd --date=iso").toString().trim();
}

// Function to fetch contributors from GitHub
function getContributors(): Promise<string> {
  return new Promise((resolve, reject) => {
    https
      .get(GITHUB_API_URL, { headers: { "User-Agent": "request" } }, res => {
        let data = "";
        res.on("data", chunk => {
          data += chunk;
        });
        res.on("end", () => {
          try {
            const contributors = JSON.parse(data)
              .map(
                (contributor: any) =>
                  `- [@${contributor.login}](${contributor.html_url}) (⭐ ${contributor.contributions} commits)`
              )
              .join("\n");
            resolve(contributors || "No contributors yet.");
          } catch (error) {
            reject("Could not fetch contributors.");
          }
        });
      })
      .on("error", err => {
        reject("Error fetching contributors: " + err.message);
      });
  });
}

// Generate README content dynamically
async function generateReadme() {
  const contributors = await getContributors();

  // Generate README content
  const readmeContent = `# 💰 That Cashflow Life

## 🚀 Overview
A financial calculator app built with [**React Native**](https://reactnative.dev/) and [**Expo**](https://expo.dev/), designed to help players and auditors do the math, checking and balances, their financial activities.

## 🛠 Our Project
- **Framework:** React Native + TypeScript  
- **Workflow:** Expo Go (Managed Workflow)  
- **Platform:** Developed for Android (via Android Studio), tested on iOS through the Expo Go app  

---

## 📦 Installation & Development Setup

### 🔧 Prerequisites
Ensure you have the following installed:
- **Ubuntu/WSL** (Recommended)
- **Node.js** (Latest LTS recommended)
- **Expo CLI**
- **Android Studio** (for Android development)

  Setup instructions:
  \`\`\`sh
  git clone https://github.com/Nathanvititoe/cashflow-life
  npm i expo -g # Install Expo globally
  npx expo install # Install all dependencies through Expo for compatibility
  npx expo start --go # Start Expo server in Expo Go mode
  \`\`\`

  - **Android Studio Setup:**
    - Install Android Studio and required SDKs
    - Create device and set camera to "webcam0" in the advanced options
    - Run \`npx expo start --go\` to launch the expo go server and connect via the emulator or physical device

---

## 📖 Basic User Instructions
### 1️⃣ Opening the App
* Launch the app on your phone via Expo Go or run \`expo start\`.
* The home screen displays options to scan a QR code or review financials.

### 2️⃣ Scanning a QR Code
* Make sure you authorize the app to use the camera.
* Tap the **Scan QR Code** button.
* The app will use your camera to scan a card.
* Once scanned, it will populate the financial statement based on the card.

### 3️⃣ Viewing Financial Statements
* Switch between **Before** and **After** views.
* Changes will be highlighted to show differences.

### 4️⃣ Auditor Verification
* The Auditor reviews the financial statement.
* If everything is correct, they press **Complete** to finalize the transaction.
---

## 📦 Dependencies
${getDependencies()}

## 🔄 Recent Commits
${getRecentCommits()}

## 👥 Contributors
${contributors}


---

_Last updated: ${getLastUpdated()}_
`;

  const readmePath = path.join(process.cwd(), "README.md");
  // Write the new README
  fs.writeFileSync(readmePath, readmeContent, "utf8");
  console.log(`README.md has been updated. ${new Date()}`);
}
generateReadme();
