//------------------------------------------------------
// MICRO JAM MODULE - TEMPLATE V1.0
// JAM THEME: BUTTON!
// ARCHIVE NAME: jam01_button_module.js
//------------------------------------------------------

// This is the main module where you'll implement your creative solution

var MyModule = {
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
        
        // Draw a welcome message on the new 800x800 canvas
        this.context.fillStyle = '#333';
        this.context.font = '24px Arial';
        this.context.textAlign = 'center';
        this.context.fillText('Welcome to Micro Jam!', canvas.width / 2, canvas.height / 2 - 20);
        this.context.fillText('Create your module inside this canvas.', canvas.width / 2, canvas.height / 2 + 20);
    },
    
    /**
     * Draw function - called to render the current state
     * @param {CanvasRenderingContext2D} context - The 2D rendering context
     */
    draw: function(context) {
        // This function will be called every frame by the showcase runner.
        // You can use it for animation loops.
        // For a static module, you might just draw once in setup().
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
    }
};