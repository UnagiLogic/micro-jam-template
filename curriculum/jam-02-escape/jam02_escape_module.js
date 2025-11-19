//------------------------------------------------------
// MICRO JAM MODULE - TEMPLATE V2.0
// JAM THEME: ESCAPE!
// ARCHIVE NAME: jam02_escape_module.js
//------------------------------------------------------

var MyModule = {
    // Canvas and context references
    canvas: null,
    context: null,
    
    // Game State
    escapeProgress: 0, // 0 to 100
    isEscaped: false,

    // Button Configuration
    buttonX: 0,
    buttonY: 0,
    buttonWidth: 200,
    buttonHeight: 80,
    
    /**
     * Setup function - called once when the module is initialized
     * @param {HTMLCanvasElement} canvas - The canvas element to work with
     */
    setup: function(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        
        // Center the button
        this.buttonX = (canvas.width - this.buttonWidth) / 2;
        this.buttonY = (canvas.height - this.buttonHeight) / 2;

        console.log('Jam #2 Setup Complete. Ready to Escape!');
    },
    
    /**
     * Draw function - called every frame
     * @param {CanvasRenderingContext2D} context - The 2D rendering context
     */
    draw: function(context) {
        // 1. Draw Background (The Threat)
        // TODO: Change this to visualize what you are escaping from!
        if (this.isEscaped) {
            context.fillStyle = '#aaffaa'; // Success color
        } else {
            context.fillStyle = '#f0f0f0'; // Default background
        }
        context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // 2. Draw the Button
        // TODO: Make this button look cool!
        context.fillStyle = '#ff4757';
        context.fillRect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);
        
        // Button Text
        context.fillStyle = 'white';
        context.font = '30px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText("ESCAPE", this.buttonX + this.buttonWidth/2, this.buttonY + this.buttonHeight/2);

        // 3. Draw Progress
        context.fillStyle = '#333';
        context.font = '20px Arial';
        context.fillText("Progress: " + this.escapeProgress + "%", this.canvas.width/2, 100);
    },
    
    /**
     * Click handler - called when the user clicks on the canvas
     * @param {number} x - X coordinate of the click
     * @param {number} y - Y coordinate of the click
     */
    onClick: function(x, y) {
        // Simple Hitbox Logic (We give them this part!)
        if (x >= this.buttonX && 
            x <= this.buttonX + this.buttonWidth &&
            y >= this.buttonY && 
            y <= this.buttonY + this.buttonHeight) {
            
            console.log('Button Clicked!');
            
            // TODO: Add your escape logic here!
            // Example: this.escapeProgress += 10;
            
            // Don't forget to check if they won!
        }
    }
};