## multiplPathResol
Some results could be found in results.log for various environment (prisma 15.3 vs 13.3, mySql vs PostgreSql)


NoSuchElementException: ke not found on multiple path resolution

**Repoducibility/Probability :**
  always fail

## To reproduce:
**Clone the repository:**
git clone https://github.com/mjamelot/MutationIntensive.git
cd multiplPathResol/
npm install

**Start the server**
npm-run prisma deploy


**get prisma token and copy in the index.js**
npm-run prisma token



**run test**
node index.js

**result of test**

