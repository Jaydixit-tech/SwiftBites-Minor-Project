# SWIFTBITES - Indian Cuisine Website

A modern, interactive website for SWIFTBITES Indian restaurant, featuring 3D food models and animations.

## Features

- Interactive 3D food models using Three.js and React Three Fiber
- Smooth animations with Framer Motion
- Responsive design for all devices
- Modern UI with styled-components
- Interactive menu items with 3D previews
- Animated social media icons
- Custom scrollbar and loading states

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/swiftbites.git
cd swiftbites
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

The application will open in your default browser at `http://localhost:3000`.

## Project Structure

```
src/
  ├── components/
  │   ├── HeroSection.js
  │   ├── MenuSection.js
  │   ├── AboutSection.js
  │   └── Footer.js
  ├── styles/
  │   └── global.css
  ├── App.js
  └── index.js
public/
  ├── models/
  │   ├── indian_food.glb
  │   ├── butter_chicken.glb
  │   ├── biryani.glb
  │   └── paneer_tikka.glb
  └── index.html
```

## Technologies Used

- React
- Three.js
- React Three Fiber
- Framer Motion
- styled-components
- React Icons

## Adding 3D Models

1. Place your 3D models in the `public/models/` directory
2. Models should be in GLB/GLTF format
3. Update the model paths in the respective components

## Customization

- Colors: Edit the color variables in the styled components
- Animations: Adjust animation parameters in Framer Motion components
- 3D Models: Replace the existing models with your own
- Content: Update text content in the components

## Deployment

Build the project:
```bash
npm run build
# or
yarn build
```

The build files will be in the `build/` directory, ready for deployment.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Three.js community
- React Three Fiber team
- Framer Motion team 
