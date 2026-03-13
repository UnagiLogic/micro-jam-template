//------------------------------------------------------
// MICRO JAM MODULE - TEMPLATE V2.0
// JAM THEME: ESCAPE!
// ARCHIVE NAME: jam02_escape_module.js
//------------------------------------------------------

// Submission by: UnagiLogic
// Game: Ferret Shield Defense (Version 2)

var MyModule = {
    canvas: null,
    context: null,
    
    // Game State
    concentration: 0, // 0 to 100
    maxConcentration: 100,
    owlTimer: 0,
    owlMaxTime: 60 * 60,
    gameState: 'playing', 
    
    // Entities
    badgers: [],
    ferretX: 0, 
    ferretY: 0,
    ferretSize: 50,
    
    // Visuals
    ferretColor: '#d35400',
    stars: [], // To hold our star positions
    ferretActionTimer: 0, // Used to animate the ferret attacking
    showInitialInstruction: true, // To show the starting help text
    
    setup: function(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.ferretX = canvas.width / 2;
        this.ferretY = 700; // Position ferret on the mountaintop ground
        
        // Pre-generate stars so they don't flicker
        for (let i = 0; i < 100; i++) {
            this.stars.push({ x: Math.random() * 800, y: Math.random() * 600, r: Math.random() * 1.5 });
        }
        this.showInitialInstruction = true; // Reset on setup
        console.log("Ferret Defense V2 Initiated!");
    },
    
    draw: function(ctx) {
        // --- UPDATE LOGIC ---
        if (this.gameState === 'playing') {
            this.owlTimer++;
            
            // Reset ferret color after attacking
            if (this.ferretActionTimer > 0) {
                this.ferretActionTimer--;
            } else {
                this.ferretColor = '#d35400'; // Back to normal brown
            }

            // 1. Spawn Badgers (Increasing difficulty)
            // Spawn rate increases slightly as owl timer gets closer
            let spawnRate = 0.005 + (this.owlTimer / this.owlMaxTime) * 0.008; // Lower spawn rate
            if (Math.random() < spawnRate) {
                this.spawnBadger();
            }
            
            // 2. Move Badgers & Check Impacts
            for (let i = this.badgers.length - 1; i >= 0; i--) {
                let b = this.badgers[i];
                // Move towards ferret
                let dx = this.ferretX - b.x;
                let dy = this.ferretY - b.y;
                let dist = Math.sqrt(dx*dx + dy*dy);
                b.x += (dx / dist) * b.speed * 2;
                
                // Auto-attack badgers that get too close
                if (dist < 150 && this.concentration >= 2) {
                    this.concentration = Math.max(0, this.concentration - 2); // Cost to attack
                    this.badgers.splice(i, 1); 
                    
                    // Visual Feedback for auto-attack
                    this.ferretColor = '#f39c12'; // Flash a less bright orange for the attack
                    this.ferretActionTimer = 15;  // Animate for 15 frames
                }
            }
            
            // 3. Win/Loss
            if (this.owlTimer >= this.owlMaxTime) {
                this.gameState = 'lost'; 
            }
        }

        // --- DRAWING LOGIC ---
        
        // Background, Sky
        ctx.fillStyle = '#2c3e50'; // Dark blue night sky
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Stars
        ctx.fillStyle = 'white';
        for (const star of this.stars) {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
            ctx.fill();
        }

        // Full Moon
        ctx.fillStyle = '#f0f0f0';
        ctx.beginPath();
        ctx.arc(700, 100, 50, 0, Math.PI * 2);
        ctx.fill();

        // Far mountains
        ctx.fillStyle = '#6b4f3a'; // Brown mountain color
        ctx.beginPath();
        ctx.moveTo(0, 500);
        ctx.lineTo(200, 300);
        ctx.lineTo(450, 450);
        ctx.lineTo(650, 350);
        ctx.lineTo(800, 400);
        ctx.lineTo(800, 680);
        ctx.lineTo(800, 800);
        ctx.lineTo(0, 800);
        ctx.closePath();
        ctx.fill();

        // Foreground mountaintop (the ground)
        // Dirt layer
        ctx.fillStyle = '#8c6d52';
        ctx.beginPath();
        ctx.moveTo(0, 680);
        ctx.quadraticCurveTo(400, 720, 800, 680);
        ctx.lineTo(800, 800);
        ctx.lineTo(0, 800);
        ctx.closePath();
        ctx.fill();
        // Grass layer on top
        ctx.fillStyle = '#556B2F';
        ctx.beginPath();
        ctx.moveTo(0, 680);
        ctx.quadraticCurveTo(400, 720, 800, 680);
        ctx.lineTo(800, 690);
        ctx.quadraticCurveTo(400, 730, 0, 690);
        ctx.closePath();
        ctx.fill();
        
        // Draw Owl Timer
        let timePct = this.owlTimer / this.owlMaxTime;
        ctx.fillStyle = '#333';
        ctx.fillRect(200, 20, 400, 20);
        ctx.fillStyle = '#e74c3c'; 
        ctx.fillRect(200, 20, 400 * timePct, 20);
        ctx.fillStyle = 'white';
        ctx.font = '16px Arial';
        ctx.fillText("YAGOL THE OWL IS CASTING FIRE SHARDS", 400, 35);

        // Draw Shield (Hexagon)
        // Visual Feedback: If ferret is attacking (actionTimer > 0), shield flickers/weakens
        let shieldAlpha = 0.1 + (this.concentration / 100) * 0.6;
        if (this.ferretActionTimer > 0) shieldAlpha *= 0.5; // Flicker effect!
        
        ctx.save();
        ctx.globalAlpha = shieldAlpha;
        ctx.strokeStyle = '#58d68d'; 
        ctx.lineWidth = 8;
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            let angle = (Math.PI / 3) * i;
            let r = 120; 
            let x = this.ferretX + r * Math.cos(angle);
            let y = this.ferretY + r * Math.sin(angle);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = '#58d68d';
        ctx.fill();
        ctx.restore();

        // Draw Ferret (The Button)
        ctx.fillStyle = this.ferretColor; 
        ctx.beginPath();
        ctx.arc(this.ferretX, this.ferretY, this.ferretSize, 0, Math.PI*2);
        ctx.fill();
        
        // Ferret Eyes (Stress indicator - they narrow with concentration)
        let eyeNarrowAmount = (this.concentration / 100) * 5; // Narrows by up to 5px
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.ellipse(this.ferretX - 15, this.ferretY - 10, 10, 10 - eyeNarrowAmount, 0, 0, Math.PI*2);
        ctx.ellipse(this.ferretX + 15, this.ferretY - 10, 10, 10 - eyeNarrowAmount, 0, 0, Math.PI*2);
        ctx.fill();
        ctx.fillStyle = 'black'; // Pupils
        ctx.beginPath();
        // Pupils shrink as concentration goes up
        let pupilSize = 4 - (this.concentration/40); 
        ctx.arc(this.ferretX - 15, this.ferretY - 10, Math.max(1, pupilSize), 0, Math.PI*2);
        ctx.arc(this.ferretX + 15, this.ferretY - 10, Math.max(1, pupilSize), 0, Math.PI*2);
        ctx.fill();

        // Draw Badgers
        ctx.fillStyle = '#95a5a6';
        for (let b of this.badgers) {
            ctx.beginPath();
            ctx.arc(b.x, b.y, 20, 0, Math.PI*2);
            ctx.fill();
            ctx.fillStyle = 'black'; // Angry eyes
            ctx.fillText(">", b.x-5, b.y); 
            ctx.fillText("<", b.x+5, b.y); 
            ctx.fillStyle = '#95a5a6';
        }
        
        // Draw Concentration UI
        ctx.fillStyle = 'white';
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`${Math.floor(this.concentration)}%`, this.ferretX, this.ferretY + 80);

        // Show initial instruction at the start of the game
        if (this.showInitialInstruction) {
            ctx.fillStyle = 'white';
            ctx.font = '30px Arial';
            ctx.fillText("Click the ferret to cast a barrier spell!", this.ferretX, this.ferretY - 100);
        }

        // Add indicator to cast barrier when at 100%
        if (this.concentration >= 100) {
            ctx.fillStyle = '#58d68d'; // Use the shield color
            ctx.font = '30px Arial';
            ctx.fillText("CLICK FERRET TO CAST BARRIER!", this.ferretX, this.ferretY - 150);
        }

        // End Screens
        if (this.gameState === 'lost') {
            ctx.fillStyle = 'rgba(0,0,0,0.85)';
            ctx.fillRect(0,0,800,800);
            ctx.fillStyle = '#e74c3c';
            ctx.font = '60px Arial';
            ctx.fillText("THE OWL CASTED FIRE SHARD!", 400, 400, 780);
        } else if (this.gameState === 'won') {
            ctx.fillStyle = 'rgba(255,255,255,0.9)';
            ctx.fillRect(0,0,800,800);
            ctx.fillStyle = '#27ae60';
            ctx.font = '60px Arial';
            ctx.fillText("BARRIER CASTED!", 400, 400, 780);
        }
    },
    
    onClick: function(x, y) {
        if (this.gameState !== 'playing') return;

        // Click the ferret to increase concentration or cast barrier
        let dx = x - this.ferretX;
        let dy = y - this.ferretY;
        if (Math.sqrt(dx*dx + dy*dy) < this.ferretSize) {
            // If at 100%, clicking wins the game
            if (this.concentration >= 100) {
                this.gameState = 'won';
            } else {
                // Otherwise, concentration goes up by 2% per click
                this.concentration = Math.min(100, this.concentration + 2);
                this.showInitialInstruction = false; // Hide instruction after first click
            }
        }
    },

    spawnBadger: function() {
        // Spawn logic
        let side = (Math.random() < 0.5) ? 'left' : 'right'; // Only spawn from left or right
        let bx, by;
        by = 690; // Spawn on the ground level
        if (side === 'left') { bx = -50; } 
        if (side === 'right') { bx = 850; } 
        
        this.badgers.push({
            x: bx,
            y: by,
            speed: .05 + Math.random() * .35 // Increase or decrease speed variability
        });
    }
};