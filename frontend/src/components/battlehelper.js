// battle formula  ((((2/5+2)*B*60/D)/50)+2)*Z/255

let currentEnemyHp = Infinity;
let currentAllyHp = Infinity;

let isPlayerTurn = true;
let gameData = {
    enemy:{},
    ally:{},
    gameOver:false,
    winner:''
};

function gameLoop(enemy, ally){

    if (currentEnemyHp > enemy.stats[0].base_stat){
        currentEnemyHp = enemy.stats[0].base_stat; 
    }

    if (currentAllyHp > ally.stats[0].base_stat){
        currentAllyHp = ally.stats[0].base_stat
    }

    if (isPlayerTurn){
        playerTurn(enemy,ally);
    }

}

function playerTurn(enemy,ally){
    let Z = Math.floor(Math.random() * (255 - 217)) + 217  ;
    let damage = ((((2/5+2)*ally.stats[1].base_stat*60/enemy.stats[2].base_stat)/50)+2)*Z/255;
    currentEnemyHp -= damage;
    gameData.enemy.hp = currentEnemyHp;
    gameData.ally.damage = damage;
    console.log(currentEnemyHp);
    gameOver(currentEnemyHp);
    isPlayerTurn = false;
    aiTurn(enemy, ally);
}

function aiTurn(enemy,ally){
    let Z = Math.floor(Math.random() * (255 - 217)) + 217  ;
    let damage = ((((2/5+2)*enemy.stats[1].base_stat*60/ally.stats[2].base_stat)/50)+2)*Z/255;
    currentAllyHp -= damage;
    gameData.ally.hp = currentAllyHp;
    gameData.enemy.damage = damage;
    console.log(currentAllyHp);
    gameOver(currentAllyHp);
    isPlayerTurn = true;
}
function gameOver(currentHp){
    if (currentHp <= 0){
        if (isPlayerTurn){
            gameData.winner = 'player';
            gameData.gameOver = true;
        } else {
            gameData.winner = 'Ai';
            gameData.gameOver = true;
        }
    }
}

export default {gameLoop, gameData}