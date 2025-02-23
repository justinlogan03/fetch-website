Latest Vercel Link (2/23/2025): https://fetch-website-cfhvi0ja9-justin-logans-projects.vercel.app/

**Run Project Locally:** <br />
1.) **Run command to generate css:** npx tailwindcss -i ./input.css -o ./public/output.css --watch <br />
2.) **Run command to start project:** npm start <br />
3.) Navigate to localhost:3000 (if this didn't happen automatically) <br />

**Deploy New changes with Vercel:** <br />
1.) **Get output.css into dist file:** npx tailwindcss -i ./input.css -o ./dist/output.css --watch <br />
2.) **Run command to deploy project:** vercel --prod
3.) Navigate to generated link
