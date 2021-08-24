echo "=== Starting project setup ==="
if ! command -v 'node' > /dev/null; then
  echo "Node is not installed. Install before continuing."
  exit 1
fi
if ! command -v 'npm' > /dev/null; then
  echo "Npm is not installed. Install before continuing."
  exit 1
fi

echo "=== Node installed. Proceeding... ==="
echo "=== Npm installed. Proceeding... ==="

echo "=== Building dependencies ==="
npm install
echo "Setup Finished! Run \"npm run cy:test\" to run the tests on Chrome"
echo "Setup Finished! Run \"npm run cy:open\" to open the Cypress IDE"