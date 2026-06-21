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
# System Information & Environment Variables - Pseudocode

## Initialization

```text
IMPORT Operating System Module 'os'

START PROGRAM
```
---

## Get System Information

```text
FUNCTION getSystemInfo()

    RETURN

        Operating System Type
        Platform
        OS Release Version
        CPU Architecture
        Hostname
        Home Directory

        CPU Model
        Number of CPU Cores
        CPU Speed

        Node.js Version

        Total Memory
        Free Memory

END FUNCTION
```

---

## Get Environment Variables

```text
FUNCTION getEnvVars()

    DEFINE list of environment variable names

        PATH
        USERNAME
        OS
        COMPUTERNAME
        PROCESSOR_ARCHITECTURE
        NUMBER_OF_PROCESSORS
        APPDATA
        TEMP
        SYSTEMROOT
        PROGRAMFILES
        HOME
        USER
        SHELL
        LANG
        NODE_ENV

    CREATE empty result object

    FOR EACH variable name

        GET value from environment

        IF value exists
            STORE value
        ELSE
            STORE null

    RETURN result

END FUNCTION
```

---

## Convert Bytes to Human Readable Format

```text
FUNCTION formatBytes(bytes)

    IF bytes = 0
        RETURN "0 B"

    DEFINE units:
        B, KB, MB, GB

    CALCULATE appropriate unit

    CONVERT bytes to readable format

    RETURN formatted value

END FUNCTION
```

---

## Standalone Terminal Execution

```text
IF file is executed directly

    CREATE output object

        systemInfo = getSystemInfo()
        environmentVariables = getEnvVars()

    CONVERT output to formatted JSON

    PRINT JSON to terminal

END IF
```

---

## Program Flow

```text
START

Collect System Information

Collect Environment Variables

Format Data as JSON

Display Result in Terminal

END
```

### 2. `file-manager.js` (File Operations)

# File Manager code flow

## Initialization

```text
START

SET PROJECT_DIR = current project folder
```
---

## Helper: formatBytes(bytes)

```text
IF bytes = 0
    RETURN "0 B"

DEFINE sizes = [B, KB, MB, GB]

CALCULATE index based on byte size

RETURN converted size + unit
```

---

## Helper: getFilePath(filename)

```text
JOIN PROJECT_DIR and filename

IF file path is outside PROJECT_DIR
    THROW error "Access not allowed"

RETURN file path
```

---

## List Files

```text
FUNCTION listFiles(subFolder)

    GET target directory path

    IF directory does not exist
        RETURN empty list

    READ all items in directory

    FOR each item

        GET item information

        IF item is a file

            STORE:
                file name
                file size
                last modified date
                file extension

    RETURN file list
```

---

## Create File

```text
FUNCTION createFile(filename, content)

    GET full file path

    GET parent folder path

    IF parent folder does not exist
        CREATE folder

    IF file already exists
        THROW error

    WRITE content into file

    RETURN success message
```

---

## Read File

```text
FUNCTION readFile(filename)

    GET full file path

    IF file does not exist
        THROW error

    READ file content

    RETURN filename and content
```

---

## Update File

```text
FUNCTION updateFile(filename, content)

    GET full file path

    IF file does not exist
        THROW error

    OVERWRITE file with new content

    RETURN success message
```

---

## Delete File

```text
FUNCTION deleteFile(filename)

    GET full file path

    IF file does not exist
        THROW error

    DELETE file

    RETURN success message
```

---

## Command Line Interface

```text
IF file is run directly

    TRY

        IF command = "list"
            CALL listFiles()

        ELSE IF command = "create"
            CALL createFile()

        ELSE IF command = "read"
            CALL readFile()

        ELSE IF command = "update"
            CALL updateFile()

        ELSE IF command = "delete"
            CALL deleteFile()

        ELSE
            RETURN error "Unknown command"

        PRINT result as formatted JSON

    CATCH any error

        PRINT error as JSON

END
```






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
