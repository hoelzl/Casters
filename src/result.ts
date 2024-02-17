export class Result {
    isGameInProgress(): boolean {
        return false;
    }
    hasPlayerWon(): boolean {
        return false;
    }
    hasPlayerDied(): boolean {
        return false;
    }
}

export class GameInProgress extends Result {
    isGameInProgress(): boolean {
        return true;
    }
}

export class PlayerWon extends Result {
    hasPlayerWon(): boolean {
        return true;
    }
}

export class PlayerDied extends Result {
    hasPlayerDied(): boolean {
        return true;
    }
}

