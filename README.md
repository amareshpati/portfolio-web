# 🌿 Git-Inspired 3D Portfolio - Amaresh Pati

A premium, high-performance portfolio website built with **React**, **Three.js**, and **Framer Motion**. This project features stunning 3D animations, a dark-themed glassmorphic UI, and a fully responsive design tailored for developers.

## ✨ Features

- **3D Interactive Elements**: Integrated with `react-three-fiber` and `drei` for immersive 3D background stars and effects.
- **Glassmorphic Design**: Modern UI with sleek gradients, blurs, and premium color palettes.
- **Smooth Animations**: Powered by `framer-motion` for transitions and `react-tilt` for interactive cards.
- **Sectioned Layout**: Includes Bio, Skills, Experience, Education, Projects, and Contact sections.
- **Dynamic Content**: All data is centralized in a constants file for easy updating.
- **Resume Hosting**: Ready-to-use resume integration (PDF support).
- **Responsive Navigation**: Adaptive navbar with mobile-friendly drawer and smooth scrolling.

## 🛠️ Tech Stack

- **Frontend**: React.js, 
- **Styling**: Styled Components, Material UI (MUI)
- **3D Graphics**: Three.js, React Three Fiber, React Three Drei
- **Animations**: Framer Motion, React Tilt, Typewriter Effect
- **Icons**: MUI Icons

## 🚀 Getting Started

To use this project for yourself, please **create a fork** of this repository first. This allows you to have your own copy to modify and deploy.

### 1. Create a Fork

Click the **Fork** button at the top right of this page.

### 2. Clone Your Fork
```bash
git clone https://github.com/your-username/portfolio-web.git
cd portfolio-web
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run the Development Server
```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 🎨 How to Customize (For Forking)

If you'd like to use this template for your own portfolio, follow these steps:

### 1. Update Bio & Project Details

All data shown in the app is managed in a single file. Navigate to:

`src/data/constants.js`

Update the following constants with your information:

- `Bio`: Name, roles, description, GitHub, LinkedIn, etc.
- `skills`: Categorized list of your technical skills with icons.
- `experiences`: Your work history.
- `education`: Your academic background.
- `projects`: Details, images, and links to your work.

### 2. Replace Assets

The profile picture and project images are stored in the assets directories. Replace them with your own files:

- **Hero Image**: `src/images/HeroImage.jpg`
- **Project/Work Images**: `src/assets/images/`
- **Resume**: Replace `public/resume.pdf` with your own PDF. Ensure the filename matches if you don't want to change the code in `constants.js`.

### 3. Environment Variables

Check `.env.example` for any required environment variables (like contact form IDs or API keys). Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

## 📦 Deployment

The easiest way to deploy this project is via **Vercel**, **Netlify**, or **Cloudflare Pages**.

### Vercel / Netlify

1. Connect your GitHub repository.
2. Set the build command: `npm run build`
3. Set the output directory: `build`
4. Click **Deploy**.

### Cloudflare Pages (CI/CD)

For a robust CI/CD pipeline with Cloudflare:

1. Log in to the Cloudflare Dashboard and navigate to **Workers & Pages**.
2. Click **Create a project** > **Connect to Git**.
3. Select your repository.
4. Set **Framework preset** to `Create React App` (or use manual: Build command: `npm run build`, Build output directory: `build`).
5. Add any necessary environment variables.
6. Click **Save and Deploy**. Cloudflare will now automatically deploy your changes every time you push to your branch.

## 🤝 Contributing

Contributions are welcome! If you find a bug or have a feature request, please open an issue or submit a pull request.

## ☕ Support

If you liked this template idea, used it, and got any benefits out of it —  
consider buying me a coffee! It keeps me motivated to build and share more open-source work. 😄

<a href="https://www.buymeacoffee.com/amareshpati" target="_blank">
  <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="50" width="210" />
</a>

## 📜 License

This project is licensed under the MIT License. Feel free to use it for your own personal portfolio.

---


Built with ❤️ by [Amaresh Pati](https://github.com/amareshpati) &nbsp;|&nbsp; <a href="https://www.buymeacoffee.com/amareshpati" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="30" width="127" style="vertical-align: middle;"/></a>
