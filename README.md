This repository includes my completed frontend excercise. I've included a link to the latest deployed project and instructions on how to run the project locally. I've also included screenshots of the application for your reference.

Latest Vercel Link (2/23/2025): https://fetch-website-cfhvi0ja9-justin-logans-projects.vercel.app/

**Run Project Locally:** <br />
1.) **Run command to generate css:** npx tailwindcss -i ./input.css -o ./public/output.css --watch <br />
2.) **Run command to start project:** npm start <br />
3.) Navigate to localhost:3000 (if this didn't happen automatically) <br />

**Login Page:**<br />
![image](https://github.com/user-attachments/assets/cac75cdc-761c-4fd1-850f-452e096652da)

**Dog Search Page:**<br />
![image](https://github.com/user-attachments/assets/ebc5332a-e23f-4652-aa0b-b703786a468c)

________________________________________________________________
**Personal Notes**<br />
**Deploy New changes with Vercel:** <br />
1.) **Get output.css into dist file:** npx tailwindcss -i ./input.css -o ./dist/output.css --watch <br />
2.) **Run command to deploy project:** vercel --prod
3.) Navigate to generated link
