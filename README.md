# Javascript AWS Lambda Serverless Function

**Scenario:** 1 - Monolithic  
**Branch:** `Version_14`  
**Customer Version:** 14 (ES2020 / Node.js 14)  
**Runtime:** `nodejs14.x`  
**Excel:** Alternative_Tools_Enterprise_Mapping_Matrix.xlsx  

```bash
npm install
npm run build
npm test
npm run tool:oxlint
```

API (versioned):
- `GET /api/v1/health`
- `GET /api/v1/products`
- `GET /api/v1/products/:sku`
- `POST /api/v1/orders`

Alt tools under `tools/` (12): debtmap, cccc, Dolos, oxlint, OpenGrep, trivy, monocart-coverage-reports, gutcheck, CodeQL, knip, Opengrep, Git-Spark
