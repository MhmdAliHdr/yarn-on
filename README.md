# 🧶 Yarn On
A tool to make writing crochet and knitting patterns easier. Styling is taken care of, no need to worry about correct positionings or continously centering images. Yarn On is built to automatically structure a crochet
or knitting pattern by sections and rows. This tool is built using ReactJS and TypeScript and stylized using TailWindCSS. A live demo is available at: <a href="https://yarnon.mohammadali-hd3.workers.dev/">here</a>
## 🪡 Features
<ul>
  <li>Technicalities: Naming a pattern, setting an author and a difficulty level alongside an image of the final product.</li>
  <img href="https://jumpshare.com/s/KZnGuFc7iz3zEiUaaf1l"></img>
  <li>Sectioning: Splitting a pattern into different sections (A sweater into front and back panels and sleeves), each section including rows</li>
  <li>Clarifying Images: It is possible to add images per row.</li>
  <li>Automatic row numbering: The rows are numbered as you add/remove them. Users are free to write the rows in any format they please, but we do recommend the standards of comma separated stitches (sc, sc, sc, sc).</li>
  <li>Saving/Loading patterns: Patterns are saved locally in your browser. Do note that this means patterns are lost in case of a crash, remember to constantly press the save button.</li>
  <li>Exporting a pattern as PDF: This makes use of the <a href="https://www.npmjs.com/package/react-to-pdf">react-to-pdf</a> NPM package</li>
</ul>

## 🧦 Running Locally
For our more technical users who would prefer an offline version, you can simply clone or download this repository's code, then run the following commands:
### Install dependenciesm
Run the following command in the directory of the cloned repository:
```npm install```
### Run on localhost
Run the following command:
```npm run dev```
Then surf to "http://localhost:5173"

## 🧵 Notes
<ul>
  <li>We have chosen to save patterns in the local storage of the browser in order to avoid requiring users to sign up for an account.</li>
  <li>Adding images requires uploading them to a cloud service (such as <a href="https://cloudinary.com/">Cloudinary</a>) and inputting its URL</li>
  <li>Only one image per row are permitted. Users can always collage multiple photos and upload them instead</li>
  <li>For best image quality, make sure your images are square</li>
</ul>

## ✂️ Submit Issues
For any issues/bugs and suggestions, please send an email to: amby.haidar.dev@gmail.com
>>>>>>> a88a620c5f5b8662b18311ac074cdf5548942c60
