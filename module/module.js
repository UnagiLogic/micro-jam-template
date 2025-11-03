// Micro Jam Template Module
// This is the main module where you'll implement your creative solution

const MyModule = {
    // Canvas and context references
    canvas: null,
    context: null,
    
    /**
     * Setup function - called once when the module is initialized
     * @param {HTMLCanvasElement} canvas - The canvas element to work with
     */
    setup: function(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        
        console.log('MyModule setup complete!');
        console.log('Canvas size:', canvas.width, 'x', canvas.height);
        
        // Example: Draw a welcome message
        this.context.fillStyle = '#333';
        this.context.font = '24px Arial';
        this.context.textAlign = 'center';
        this.context.fillText('Welcome to Micro Jam!', canvas.width / 2, canvas.height / 2 - 20);
        this.context.fillText('Click anywhere to interact', canvas.width / 2, canvas.height / 2 + 20);
    },
    
    /**
     * Draw function - called to render the current state
     * @param {CanvasRenderingContext2D} context - The 2D rendering context
     */
    draw: function(context) {
        // This function can be used for animation loops or continuous rendering
        // For now, it's just a placeholder
        
        // Example: You might implement animation logic here
        // requestAnimationFrame(() => this.draw(context));
    },
    
    /**
     * Click handler - called when the user clicks on the canvas
     * @param {number} x - X coordinate of the click
     * @param {number} y - Y coordinate of the click
     */
    onClick: function(x, y) {
        console.log('Clicked at:', x, y);
        
        // Example: Draw a circle at the click position
        if (this.context) {
            this.context.fillStyle = '#ff6b6b';
            this.context.beginPath();
            this.context.arc(x, y, 20, 0, Math.PI * 2);
            this.context.fill();
        }
    },

    /**
     * Button click handler - called when the action button is clicked
     */
    onButtonClick: function() {
        console.log('Action button clicked!');

        // Example: Clear the canvas and draw a message
        if (this.context && this.canvas) {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.context.fillStyle = '#333';
            this.context.font = '24px Arial';
            this.context.textAlign = 'center';
            this.context.fillText('Button was clicked!', this.canvas.width / 2, this.canvas.height / 2);
        }
    }
};

// Initialize the module when the page loads
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.querySelectorAll('#jamCanvas')[1] || document.getElementById('jamCanvas');
    const splashScreen = document.getElementById('splash-screen');
    
    if (canvas) {
        // Setup the module
        MyModule.setup(canvas);
        
        // Add click event listener
        canvas.addEventListener('click', function(event) {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            MyModule.onClick(x, y);
        });

        // --- Create and add the button programmatically ---
        const container = canvas.parentElement;
        if (container) {
            // Create a div to hold the button
            const controlsDiv = document.createElement('div');
            controlsDiv.style.marginTop = '20px';
            controlsDiv.style.textAlign = 'center';

            // Create the button and image elements
            const actionButton = document.createElement('button');
            actionButton.id = 'actionButton';
            const buttonImage = document.createElement('img');
            buttonImage.src = 'MicroJamButton.png';
            buttonImage.alt = 'Action Button';

            // Assemble and append to the DOM
            actionButton.appendChild(buttonImage);
            controlsDiv.appendChild(actionButton);
            container.parentElement.appendChild(controlsDiv);

            actionButton.addEventListener('click', () => MyModule.onButtonClick());
        }

         setTimeout(() => {
            if (splashScreen) {
                splashScreen.style.opacity = '0';
                // After the fade-out transition, disable pointer events so it doesn't block the canvas
                splashScreen.addEventListener('transitionend', () => {
                    splashScreen.style.pointerEvents = 'none';
                }, { once: true });
            }
        }, 3000);
        
        console.log('Canvas event listeners added');
    } else {
        console.error('Canvas element with id "jamCanvas" not found');
    }
});