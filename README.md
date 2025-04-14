# Slides Presentation Viewer

A simple presentation viewer for HTML slides that combines all slides into a single interactive presentation.

## How to Run the Presentation

### Prerequisites
- Node.js installed on your computer (download from [nodejs.org](https://nodejs.org/))

### Running the Presentation
1. Open Terminal or Command Prompt
2. Navigate to this directory
3. Run: `node server.js`
4. Open your browser and go to [http://localhost:3000](http://localhost:3000)

## Using the Presentation
- Use the arrow buttons at the bottom to navigate between slides
- Click on the indicator dots to jump to a specific slide
- Use keyboard arrow keys (left/right) to navigate
- Press spacebar to advance to the next slide
- Click the fullscreen button in the top-right to enter/exit fullscreen mode

## Project Structure
- `index.html` - The main HTML file with the presentation layout
- `styles.css` - CSS styles for the presentation
- `main.js` - JavaScript code that handles slide loading and navigation
- `htmlslides/` - Directory containing individual HTML slide files
- `server.js` - Simple Node.js server to serve the presentation

## Structure Benefits
This structure follows web development best practices by:
- Separating HTML, CSS, and JavaScript into different files
- Making the codebase more maintainable and easier to update
- Improving readability and organization
- Following the separation of concerns principle 