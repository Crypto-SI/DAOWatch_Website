const fs = require('fs');
const path = require('path');
const mime = require('mime-types');
const Arweave = require('arweave');

// Initialize Arweave
const arweave = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https'
});

// Function to get all files in a directory
function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      fileList = getAllFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  }
  
  return fileList;
}

// Main deployment function
async function deployToArweave() {
  try {
    console.log('Starting deployment to Arweave...');
    
    // Load wallet
    console.log('Loading wallet...');
    const jwk = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
    
    // Get all files from the out directory
    console.log('Scanning files...');
    const outDir = path.join(__dirname, 'out');
    const files = getAllFiles(outDir);
    
    // Create path manifest
    console.log('Creating path manifest...');
    const manifest = {
      manifest: 'arweave/paths',
      version: '0.1.0',
      index: {
        path: 'index.html'
      },
      paths: {}
    };
    
    // Upload each file
    const fileUploads = [];
    for (const filePath of files) {
      const relativePath = path.relative(outDir, filePath).replace(/\\/g, '/');
      const data = fs.readFileSync(filePath);
      const contentType = mime.lookup(filePath) || 'application/octet-stream';
      
      console.log(`Preparing ${relativePath} (${contentType})...`);
      
      const transaction = await arweave.createTransaction({ data });
      transaction.addTag('Content-Type', contentType);
      
      await arweave.transactions.sign(transaction, jwk);
      
      fileUploads.push({
        transaction,
        relativePath,
        status: 'pending'
      });
    }
    
    // Post all transactions
    console.log('Uploading files...');
    for (const fileUpload of fileUploads) {
      try {
        const { transaction, relativePath } = fileUpload;
        const uploader = await arweave.transactions.getUploader(transaction);
        
        while (!uploader.isComplete) {
          await uploader.uploadChunk();
          console.log(`${relativePath}: ${uploader.pctComplete}% complete`);
        }
        
        manifest.paths[relativePath] = { id: transaction.id };
        fileUpload.status = 'completed';
        console.log(`✅ Uploaded ${relativePath}: ${transaction.id}`);
      } catch (error) {
        console.error(`❌ Failed to upload ${fileUpload.relativePath}:`, error);
        fileUpload.status = 'failed';
      }
    }
    
    // Upload the manifest
    console.log('Uploading manifest...');
    const manifestTransaction = await arweave.createTransaction({ 
      data: JSON.stringify(manifest) 
    });
    
    manifestTransaction.addTag('Content-Type', 'application/x.arweave-manifest+json');
    await arweave.transactions.sign(manifestTransaction, jwk);
    
    const manifestUploader = await arweave.transactions.getUploader(manifestTransaction);
    while (!manifestUploader.isComplete) {
      await manifestUploader.uploadChunk();
      console.log(`Manifest: ${manifestUploader.pctComplete}% complete`);
    }
    
    console.log(`\n🎉 Deployment complete!`);
    console.log(`Your site is now available at: https://arweave.net/${manifestTransaction.id}`);
    
    // Save the deployment info
    fs.writeFileSync('arweave-deployment.json', JSON.stringify({
      id: manifestTransaction.id,
      url: `https://arweave.net/${manifestTransaction.id}`,
      timestamp: new Date().toISOString(),
      files: fileUploads.map(f => ({ 
        path: f.relativePath, 
        id: f.transaction.id,
        status: f.status 
      }))
    }, null, 2));
    
  } catch (error) {
    console.error('Deployment failed:', error);
  }
}

// Check if wallet path is provided
if (process.argv.length < 3) {
  console.error('Please provide the path to your Arweave wallet: node deploy-arweave.js path/to/wallet.json');
  process.exit(1);
}

// Run the deployment
deployToArweave(); 