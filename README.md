## Material library
Material library is Work-in-progress nextjs app for architects and investors for searching ideal materials for their projects. User can search the library and sort materials according to various metrics: costs, density, function, carbon footprint, etc.

The app uses database from table 7 csv file generated by https://github.com/ocni-dtu/table7

- Next.js, Vercel deployment, MongoDB
- Python for data manipulation & upload to MongoDB
- D3 and ChartJS for data visualization

The app has been deployed to vercel: https://material-library.vercel.app/


![data](https://github.com/Curiosit/material-library/assets/17218693/34ae3fca-2afd-4201-be90-95f11d66421e)



This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

![datamat](https://github.com/Curiosit/material-library/assets/17218693/e99afeaa-ba14-49ad-97cb-ab38f49e301d)


## Data exploration
Using D3 allowed to build data visualization graphics:

![beton2](https://github.com/Curiosit/material-library/assets/17218693/176c8b4d-a3ea-4935-b5a3-c840dd9e3fea)
Exploring all concrete and comparing with each other

![scatterplot](https://github.com/Curiosit/material-library/assets/17218693/e3743025-86ee-449a-b589-cd2e03056d02)
Exploring scatterplot of A1A3 carbon footrpint vs. C3C4 carbon footprint

## Forking and testing
First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.




