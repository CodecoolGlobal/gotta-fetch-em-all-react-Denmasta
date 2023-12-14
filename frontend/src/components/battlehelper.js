// battle formula  ((((2/5+2)*B*60/D)/50)+2)*Z/255

let currentEnemyHp = Infinity;
let currentAllyHp = Infinity;

let isPlayerTurn = true;
let gameData = {
    enemy:{},
    ally:{},
    gameStart: true,
    gameOver:false,
    winner:'',
    info:''
};

let aiTurnDelay;

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
    if (!isPlayerTurn){
        clearTimeout(aiTurnDelay);
        aiTurnDelay = setTimeout(() => aiTurn(enemy, ally), 2000);
    }

}

function playerTurn(enemy,ally){
    let Z = Math.floor(Math.random() * (255 - 217)) + 217;
    let damage = Math.floor(((((2/5+2)*ally.stats[1].base_stat*60/enemy.stats[2].base_stat)/50)+2)*Z/255);
    currentEnemyHp = currentEnemyHp - damage < 0 ? 0 : currentEnemyHp - damage;
    gameData.enemy.hp = currentEnemyHp;
    gameData.ally.damage = damage;
    console.log(currentEnemyHp);
    gameOver(currentEnemyHp, enemy);
    isPlayerTurn = false;
    gameData.info = `${ally.name} attacked with ${ally.abilities[0].ability.name.replaceAll('-',' ')} and dealt ${damage} damage.`;
    /*clearTimeout(aiTurnDelay);
    aiTurnDelay = setTimeout(() => aiTurn(enemy, ally), 2000);*/
}

function aiTurn(enemy,ally){
    let Z = Math.floor(Math.random() * (255 - 217)) + 217  ;
    let damage = Math.floor(((((2/5+2)*enemy.stats[1].base_stat*60/ally.stats[2].base_stat)/50)+2)*Z/255);
    currentAllyHp = currentAllyHp - damage < 0 ? 0 : currentAllyHp - damage;
    gameData.ally.hp = currentAllyHp;
    gameData.enemy.damage = damage;
    console.log(currentAllyHp);
    gameData.info = `${enemy.name} attacked with ${enemy.abilities[0].ability.name.replaceAll('-',' ')} and dealt ${damage} damage.`
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
    gameData.info = '';
}

export default {
    gameLoop,
    gameData,
    resetBattle,
};