# Valentine's Day Proposal Web Application

This project is a simple web application designed to ask someone to be your Valentine's date. It utilizes a modern tech stack with Tailwind CSS for styling and JavaScript for interactivity.

## Project Structure

```
vday
├── src
│   ├── index.html          # Main HTML document
│   ├── styles
│   │   └── tailwind.css    # Tailwind CSS file
│   ├── scripts
│   │   └── app.js          # Main JavaScript file
├── package.json            # npm configuration file
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
└── README.md               # Project documentation
```

## Getting Started

To get started with this project, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd vday
   ```

2. **Install dependencies**:
   Make sure you have Node.js installed. Then run:
   ```bash
   npm install
   ```

3. **Build the CSS**:
   Use PostCSS to process the Tailwind CSS file:
   ```bash
   npx postcss src/styles/tailwind.css -o src/styles/output.css
   ```

4. **Run the application**:
   Open `src/index.html` in your web browser to view the application.

## Features

- Modern and responsive design using Tailwind CSS.
- Interactive JavaScript functionality to submit a Valentine's date request.

## Contributing

Feel free to submit issues or pull requests if you have suggestions or improvements for the project.

## License

This project is open-source and available under the MIT License.