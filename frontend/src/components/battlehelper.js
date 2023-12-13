// battle formula  ((((2/5+2)*B*60/D)/50)+2)*Z/255

let currentEnemyHp = Infinity;
let currentAllyHp = Infinity;

let isPlayerTurn = true;
let gameData = {
    enemy:{},
    ally:{},
    gameStart: true,
    gameOver:false,
    winner:''
};

function gameLoop(enemy, ally){

    if (currentEnemyHp === enemy.stats[0].base_stat || currentEnemyHp === Infinity){
        currentEnemyHp = enemy.stats[0].base_stat;
    }

    if (currentAllyHp === ally.stats[0].base_stat || currentAllyHp === Infinity){
        currentAllyHp = ally.stats[0].base_stat
    }

    if (isPlayerTurn){
        gameData.gameStart = false;
        playerTurn(enemy,ally);
    }

}

function playerTurn(enemy,ally){
    let Z = Math.floor(Math.random() * (255 - 217)) + 217;
    let damage = ((((2/5+2)*ally.stats[1].base_stat*60/enemy.stats[2].base_stat)/50)+2)*Z/255;
    currentEnemyHp = Math.floor(currentEnemyHp - damage) < 0 ? 0 : Math.floor(currentEnemyHp - damage);
    gameData.enemy.hp = currentEnemyHp;
    gameData.ally.damage = damage;
    console.log(currentEnemyHp);
    gameOver(currentEnemyHp, enemy);
    isPlayerTurn = false;
    aiTurn(enemy, ally);
}

function aiTurn(enemy,ally){
    let Z = Math.floor(Math.random() * (255 - 217)) + 217  ;
    let damage = ((((2/5+2)*enemy.stats[1].base_stat*60/ally.stats[2].base_stat)/50)+2)*Z/255;
    currentAllyHp = Math.floor(currentAllyHp - damage) < 0 ? 0 : Math.floor(currentAllyHp - damage);
    gameData.ally.hp = currentAllyHp;
    gameData.enemy.damage = damage;
    console.log(currentAllyHp);
    gameOver(currentAllyHp);
    isPlayerTurn = true;
}
function gameOver(currentHp, enemy=''){
    if (currentHp <= 0){
        if (isPlayerTurn){
            gameData.winner = 'You won';
            gameData.gameOver = true;
            let currentPokemons = localStorage.getItem('currentPokemons');
            if (enemy !== '' && !currentPokemons.includes(enemy.name)) {
                currentPokemons += `,https://pokeapi.co/api/v2/pokemon/${enemy.name}`;
                console.log(currentPokemons);
            }
            localStorage.setItem('currentPokemons', currentPokemons);
        } else {
            gameData.winner = 'You lost';
            gameData.gameOver = true;
        }
    }
}

function resetBattle(enemy, ally) {
    console.log('hello');
    currentEnemyHp = Infinity;
    currentAllyHp = Infinity;
    console.log(currentEnemyHp);
    isPlayerTurn = true;
    gameData.gameOver = false;
    gameData.winner = '';
    gameData.gameStart = true;
}

export default {
    gameLoop,
    gameData,
    resetBattle,
};