//File CRUD Operations, Create, Read, Update, Delete files in the project

const fs = require('fs');     // For reading/writing files
const path = require('path'); // For handling file paths

// Base directory is now the entire project folder (e:\sysHack)
// const PROJECT_DIR = path.join(__dirname, '..');
const PROJECT_DIR = path.resolve(__dirname);

// ---- HELPERS ----

// Converts bytes to a readable format (e.g., 1024 → "1.00 KB")
function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
}

// Securely resolves a file path to ensure it stays inside the project folder
function getFilePath(filename) {
  const filePath = path.join(PROJECT_DIR, filename);
  
  // Security check: prevent escaping the project folder (e.g., "../../../Windows")
  if (!filePath.startsWith(PROJECT_DIR)) {
    throw new Error('Access outside project directory is not allowed.');
  }
  return filePath;
}

// ---- CRUD OPERATIONS ----

// LIST — Get files in a specific folder (defaults to project root)
function listFiles(subFolder = '') {
  const targetDir = getFilePath(subFolder);
  
  if (!fs.existsSync(targetDir)) return [];
  
  const fileNames = fs.readdirSync(targetDir);
  const files = [];

  for (let i = 0; i < fileNames.length; i++) {
    const name = fileNames[i];
    const filePath = path.join(targetDir, name);
    const stats = fs.statSync(filePath);

    // We only want to list files
    if (stats.isFile()) {
      files.push({
        name: subFolder ? path.join(subFolder, name).replace(/\\/g, '/') : name, // Keep relative path
        size: formatBytes(stats.size),
        modified: stats.mtime.toISOString(),
        extension: path.extname(name) || '.txt',
      });
    }
  }

  return files;
}

// CREATE — Make a new file
function createFile(filename, content) {
  const filePath = getFilePath(filename);

  // Create subfolders if they don't exist (e.g., "newfolder/test.js")
  const dirName = path.dirname(filePath);
  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName, { recursive: true });
  }

  if (fs.existsSync(filePath)) {
    throw new Error('File already exists: ' + filename);
  }

  fs.writeFileSync(filePath, content || '', 'utf-8');
  return { message: 'File created: ' + filename };
}

// READ — Get contents of a file
function readFile(filename) {
  const filePath = getFilePath(filename);

  if (!fs.existsSync(filePath)) {
    throw new Error('File not found: ' + filename);
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  return { name: filename, content: content };
}

// UPDATE — Change contents of an existing file
function updateFile(filename, content) {
  const filePath = getFilePath(filename);

  if (!fs.existsSync(filePath)) {
    throw new Error('File not found: ' + filename);
  }

  fs.writeFileSync(filePath, content, 'utf-8');
  return { message: 'File updated: ' + filename };
}

// DELETE — Remove a file
function deleteFile(filename) {
  const filePath = getFilePath(filename);

  if (!fs.existsSync(filePath)) {
    throw new Error('File not found: ' + filename);
  }

  fs.unlinkSync(filePath);
  return { message: 'File deleted: ' + filename };
}

//TERMINAL CLI, Run CRUD operations directly from terminal:
// node file-manager.js <command> <filename> <content>

if (require.main === module) {
  const command = process.argv[2];
  const filename = process.argv[3];
  const content = process.argv[4];

  try {
    let result;

    if (command === 'list') result = listFiles(filename || ''); // can pass subfolder
    else if (command === 'create') result = createFile(filename, content);
    else if (command === 'read') result = readFile(filename);
    else if (command === 'update') result = updateFile(filename, content);
    else if (command === 'delete') result = deleteFile(filename);
    else result = { error: 'Unknown command. Use list, create, read, update, or delete.' };

    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    console.log(JSON.stringify({ error: err.message }, null, 2));
  }
}


