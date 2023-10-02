const tilesContainer = document.querySelector('.tiles');
const colors = ["Turquoise", "Lavender", "Coral", "Crimson", "gold", "SpringGreen", "Fuchsia", "RoyalBlue"];  
const colorsPicklist = [...colors,...colors]; // we want to make pair 
const tileCount = colorsPicklist.length; // total kitni tiles in game

// Build our tiles
for(let i=0;i<tileCount;i++){
    // index pick - random (0-titleCount)
    const randomIndex = Math.floor(Math.random()*colorsPicklist.length);
    const color = colorsPicklist[randomIndex];
    const tile = buildMyTile(color);

    // jo index ki tile bn gyi, usko krdo remove from parent array
    colorsPicklist.splice(randomIndex,1);
    tilesContainer.appendChild(tile);
}

// game state
let revealedCount = 0; //kitni tiles user ne shi answer krdi
let activeTile = null; // konsi open kr rkhi hai tile
let awaitingFinish = false; // iss duration mei user wait krega to reset tiles


// tiles ko create krke return kr ske
function buildMyTile(color){
    // Create a new tile element
    const element = document.createElement("div");

    // Set attributes for tiles
    element.classList.add("tile");
    element.setAttribute("data-color", color);
    element.setAttribute("data-revealed", "false");

    element.addEventListener('click',()=>{
        const revealed = element.getAttribute("data-revealed");

        // Check if user is waiting to reset tiles or if tile is already revealed
        if(awaitingFinish || revealed === "true" || element == activeTile){
            return;
        }

        element.style.backgroundColor = color;

        // If no tile is turned (currently active), then jisko click kiya h usko active bnao
        if(!activeTile){
            activeTile = element;
            return;
        }

        // Check if color matches the active tile
        const colorToMatch = activeTile.getAttribute("data-color");

        // Color Matches
        if(colorToMatch === color){
            // color matches, both tiles -> revealed
            element.setAttribute("data-revealed", "true");
            activeTile.setAttribute("data-revealed", "true");

            // Reset activeTile & awaitingMove
            activeTile = null;
            awaitingFinish = false;
            revealedCount +=2; 

            // Check if all tiles are revealed (game won)
            if(revealedCount === tileCount){
                alert("Yay, you won the game, pls refresh.");
            }
            return;
        }

        // Colors if not matched
        awaitingFinish = true;
        
        setTimeout(()=>{
            activeTile.style.backgroundColor = null;
            element.style.backgroundColor = null;
            awaitingFinish = false;
            activeTile = null;
        }, 1000)

    });

    return element;
}