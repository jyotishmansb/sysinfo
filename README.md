# System Information and File Manager

This repo contains two modules to manage file operations and collect system information using Node.js: `sys-manager.js` and `file-manager.js`. Both modules provide Command Line Interface (CLI) that outputs data in a structured JSON format.

## Collected Data (`sys-manager.js`)

The `sys-manager.js` module collects various system-level details and environment variables of the host machine. 

### System Information
The following hardware and operating system details are collected:
- **Operating System Details**:
  - `osType`: The operating system name (e.g., "Windows_NT", "Linux").
  - `platform`: The platform the OS is running on (e.g., "win32", "linux").
  - `release`: The OS release version.
  - `arch`: CPU architecture (e.g., "x64").
  - `hostname`: The computer's network name.
  - `homeDir`: The current user's home directory path.
- **CPU Details**:
  - `cpuModel`: The specific model name of the processor.
  - `cpuCores`: The total number of logical CPU cores available.
  - `cpuSpeed`: The clock speed of the processor in MHz.
- **Memory Details**:
  - `totalMemory`: The total amount of system RAM, formatted in a human-readable format (e.g., GB/MB).
  - `freeMemory`: The currently available system RAM, formatted in a human-readable format.
- **Runtime Info**:
  - `nodeVersion`: The currently active Node.js version executing the script.

### Environment Variables
A curated, safe list of environment variables is collected to provide context about the system paths and configurations:
`PATH`, `USERNAME`, `OS`, `COMPUTERNAME`, `PROCESSOR_ARCHITECTURE`, `NUMBER_OF_PROCESSORS`, `APPDATA`, `TEMP`, `SYSTEMROOT`, `PROGRAMFILES`, `HOME`, `USER`, `SHELL`, `LANG`, `NODE_ENV`.

---

## Code Flow and Strategy

### 1. `sys-manager.js` (System Information)
The Goal: Find out what's inside the computer 

**How it works step-by-step**:
- **Getting Started**: We import the built in `os` tool.

- **`getSystemInfo()` Function**:
  - **Asking Questions**: It asks the computer for basic details like its name and what operating system it uses.
  - **Checking the CPU**: It finds out what kind of processor you have and how fast it is running.
  - **Checking the Memory**: It looks at how much RAM you have. Because computers use huge numbers (like millions of bytes), we use a helper tool called `formatBytes` to translate those big numbers into easy words like "MB" or "GB".

- **`getEnvVars()` Function**:
  - Environment variables are like secret sticky notes the computer leaves around with important settings.
  - We have a safe list of sticky notes we want to look at (like your `USERNAME`). The function goes through the list and copies them down. If a note is missing, it just writes down "null".
- **Showing the Results**: If you run this script in your terminal, it gathers all the notes, packages them up neatly (into a format called JSON), and prints them right on your screen!

### 2. `file-manager.js` (File Operations)

**How it works**:
- **Setting the Safe Zone**: First, it figures out exactly where our project folder is. That folder becomes our "safe zone".
- **The Security Guard (`getFilePath`)**:
  - Before the script touches any file, it checks the file's location.
  - It makes sure the file is inside our safe zone. If someone tries to access system files outside the project,it stops them and throws an error!

- **The File Actions (CRUD)**:
  - **`listFiles` (Read)**: When you want to see what's in a folder, this function takes a look inside. It filters out other folders and only picks the actual files. For each file, it writes down helpful details like its name, how big it is, the exact time it was last modified, and its extension type (like `.txt` or `.js`).
  - **`createFile` (Create)**: This makes a brand-new file. If you tell it to put the file inside a folder that doesn't exist yet (like `newFolder/myFile.txt`), it's smart enough to build that new folder for you first automatically! However, if you try to create a file that already exists, it stops and warns you so you don't accidentally overwrite your hard work.
  - **`readFile` (Read)**: This safely opens up a file and reads all the text inside of it. If you ask it to read a file that isn't there, it will throw an error to let you know the file is missing.
  - **`updateFile` (Update)**: When you want to change what's inside a file, this function deletes the old text and replaces it entirely with the new text you provide. It double-checks that the file actually exists before trying to update it, preventing you from accidentally creating files when you meant to edit them.
  - **`deleteFile` (Delete)**: This deletes a file. It checks to make sure the file is actually there, and then completely removes it from the project.
- **Running in the Terminal**: 
  - When you type a command in your terminal (like `node file-manager.js create hello.txt "Hi!"`), the script listens to your command and safely runs the action.
  - It has a safety net called `try...catch`. This means if you make a mistake (like trying to read a file that isn't there), the program won't crash. It will just politely print an error message.


## JSON Output in Terminal for sys-manager.js

If you run this file directly:

```bash
node sys-manager.js
```

It will print all system information as JSON in the terminal.


##  JSON Output in Terminal for file-manager.js

```bash
node file-manager.js <command> <filename> <content>
```

### Commands

#### Create a file

```bash
node file-manager.js create test.js "Hello World"
```

#### Read a file

```bash
node file-manager.js read test.js
```

#### Update a file

```bash
node file-manager.js update test.js "Updated Content"
```

#### Delete a file

```bash
node file-manager.js delete test.js
```

#### List files

```bash
node file-manager.js list
```
