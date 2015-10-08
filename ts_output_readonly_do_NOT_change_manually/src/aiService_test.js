describe("aiService", function () {
    it("R finds an immediate winning move", function () {
        var move = aiService.createComputerMove([['#', '#', '#', '#', '#', '#', '#', '#', '#', 'R', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
            ['#', '#', '#', '#', '#', '#', '#', '#', 'R', '', 'R', '#', '#', '#', '#', '#', '#', '#', '#'],
            ['#', '#', '#', '#', '#', '#', '#', 'R', '', 'R', '', '', '#', '#', '#', '#', '#', '#', '#'],
            ['', '', '', '', '', '', 'R', '', 'R', '', 'R', '', 'R', '', '', '', '', '', ''],
            ['#', '', '', '', '', '', '', '', '', 'R', '', '', '', '', '', '', '', '', '#'],
            ['#', '#', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '#', '#'],
            ['#', '#', '#', 'G', '', '', '', '', '', '', '', '', '', '', '', '', '#', '#', '#'],
            ['#', '#', 'G', '', 'G', '', '', '', '', '', '', '', '', '', '', '', '', '#', '#'],
            ['#', 'G', '', 'G', '', 'G', '', '', '', '', '', '', '', '', '', '', '', '', '#'],
            ['G', '', 'G', '', 'G', '', '', '', 'G', '', '', '', '', '', '', '', '', '', ''],
            ['#', '#', '#', '#', '#', '#', '#', '', '', '', '', '', '#', '#', '#', '#', '#', '#', '#'],
            ['#', '#', '#', '#', '#', '#', '#', '#', '', '', '', '#', '#', '#', '#', '#', '#', '#', '#'],
            ['#', '#', '#', '#', '#', '#', '#', '#', '#', '', '#', '#', '#', '#', '#', '#', '#', '#', '#']], 1, 2, 0);
        var expectedMove = [{ endMatch: { endMatchScores: [1, 0, 0] } },
            { set: { key: 'board', value: [['#', '#', '#', '#', '#', '#', '#', '#', '#', 'R', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
                        ['#', '#', '#', '#', '#', '#', '#', '#', 'R', '', 'R', '#', '#', '#', '#', '#', '#', '#', '#'],
                        ['#', '#', '#', '#', '#', '#', '#', 'R', '', 'R', '', 'R', '#', '#', '#', '#', '#', '#', '#'],
                        ['', '', '', '', '', '', 'R', '', 'R', '', 'R', '', 'R', '', '', '', '', '', ''],
                        ['#', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '#'],
                        ['#', '#', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '#', '#'],
                        ['#', '#', '#', 'G', '', '', '', '', '', '', '', '', '', '', '', '', '#', '#', '#'],
                        ['#', '#', 'G', '', 'G', '', '', '', '', '', '', '', '', '', '', '', '', '#', '#'],
                        ['#', 'G', '', 'G', '', 'G', '', '', '', '', '', '', '', '', '', '', '', '', '#'],
                        ['G', '', 'G', '', 'G', '', '', '', 'G', '', '', '', '', '', '', '', '', '', ''],
                        ['#', '#', '#', '#', '#', '#', '#', '', '', '', '', '', '#', '#', '#', '#', '#', '#', '#'],
                        ['#', '#', '#', '#', '#', '#', '#', '#', '', '', '', '#', '#', '#', '#', '#', '#', '#', '#'],
                        ['#', '#', '#', '#', '#', '#', '#', '#', '#', '', '#', '#', '#', '#', '#', '#', '#', '#', '#']] } },
            { set: { key: 'delta', value: { rowS: 4, colS: 9, rowE: 2, colE: 11, playerNo: 2 } } }];
        expect(angular.equals(move, expectedMove)).toBe(true);
    });
    it("G finds an immediate winning move", function () {
        var move = aiService.createComputerMove([['#', '#', '#', '#', '#', '#', '#', '#', '#', 'R', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
            ['#', '#', '#', '#', '#', '#', '#', '#', 'R', '', 'R', '#', '#', '#', '#', '#', '#', '#', '#'],
            ['#', '#', '#', '#', '#', '#', '#', 'R', '', 'R', '', '', '#', '#', '#', '#', '#', '#', '#'],
            ['', '', '', '', '', '', '', '', '', '', 'R', '', 'R', '', '', '', '', '', ''],
            ['#', '', '', '', '', '', '', '', '', 'R', '', 'R', '', '', '', '', '', '', '#'],
            ['#', '#', '', '', '', '', '', '', '', '', 'R', '', '', '', '', '', '', '#', '#'],
            ['#', '#', '#', 'G', '', '', '', '', '', '', '', '', '', '', '', '', '#', '#', '#'],
            ['#', '#', 'G', '', 'G', '', '', '', '', '', '', '', '', '', '', '', '', '#', '#'],
            ['#', 'G', '', 'G', '', 'G', '', '', '', '', '', '', '', '', '', '', '', '', '#'],
            ['G', '', 'G', '', 'G', '', '', '', 'G', '', '', '', '', '', '', '', '', '', ''],
            ['#', '#', '#', '#', '#', '#', '#', '', '', '', '', '', '#', '#', '#', '#', '#', '#', '#'],
            ['#', '#', '#', '#', '#', '#', '#', '#', '', '', '', '#', '#', '#', '#', '#', '#', '#', '#'],
            ['#', '#', '#', '#', '#', '#', '#', '#', '#', '', '#', '#', '#', '#', '#', '#', '#', '#', '#']], 1, 2, 1);
        var expectedMove = [{ endMatch: { endMatchScores: [0, 1, 0] } },
            { set: { key: 'board', value: [['#', '#', '#', '#', '#', '#', '#', '#', '#', 'R', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
                        ['#', '#', '#', '#', '#', '#', '#', '#', 'R', '', 'R', '#', '#', '#', '#', '#', '#', '#', '#'],
                        ['#', '#', '#', '#', '#', '#', '#', 'R', '', 'R', '', '', '#', '#', '#', '#', '#', '#', '#'],
                        ['', '', '', '', '', '', '', '', '', '', 'R', '', 'R', '', '', '', '', '', ''],
                        ['#', '', '', '', '', '', '', '', '', 'R', '', 'R', '', '', '', '', '', '', '#'],
                        ['#', '#', '', '', '', '', '', '', '', '', 'R', '', '', '', '', '', '', '#', '#'],
                        ['#', '#', '#', 'G', '', '', '', '', '', '', '', '', '', '', '', '', '#', '#', '#'],
                        ['#', '#', 'G', '', 'G', '', '', '', '', '', '', '', '', '', '', '', '', '#', '#'],
                        ['#', 'G', '', 'G', '', 'G', '', '', '', '', '', '', '', '', '', '', '', '', '#'],
                        ['G', '', 'G', '', 'G', '', 'G', '', '', '', '', '', '', '', '', '', '', '', ''],
                        ['#', '#', '#', '#', '#', '#', '#', '', '', '', '', '', '#', '#', '#', '#', '#', '#', '#'],
                        ['#', '#', '#', '#', '#', '#', '#', '#', '', '', '', '#', '#', '#', '#', '#', '#', '#', '#'],
                        ['#', '#', '#', '#', '#', '#', '#', '#', '#', '', '#', '#', '#', '#', '#', '#', '#', '#', '#']] } },
            { set: { key: 'delta', value: { rowS: 9, colS: 8, rowE: 9, colE: 6, playerNo: 2 } } }];
        expect(angular.equals(move, expectedMove)).toBe(true);
    });
    it("Y finds an immediate winning move", function () {
        var move = aiService.createComputerMove([['#', '#', '#', '#', '#', '#', '#', '#', '#', 'R', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
            ['#', '#', '#', '#', '#', '#', '#', '#', 'R', '', 'R', '#', '#', '#', '#', '#', '#', '#', '#'],
            ['#', '#', '#', '#', '#', '#', '#', 'R', '', 'R', '', '', '#', '#', '#', '#', '#', '#', '#'],
            ['', '', '', '', '', '', '', '', '', '', 'R', '', 'R', '', '', '', '', '', ''],
            ['#', '', '', '', '', '', '', '', '', 'R', '', 'R', '', '', '', '', '', '', '#'],
            ['#', '#', '', '', '', '', '', '', '', '', 'R', '', '', '', '', '', '', '#', '#'],
            ['#', '#', '#', 'G', '', '', '', '', '', '', '', '', '', '', '', 'Y', '#', '#', '#'],
            ['#', '#', 'G', '', 'G', '', '', '', '', '', '', '', 'Y', '', '', '', 'Y', '#', '#'],
            ['#', 'G', '', 'G', '', 'G', '', '', '', '', '', '', '', 'Y', '', 'Y', '', 'Y', '#'],
            ['G', '', 'G', '', 'G', '', '', '', 'G', '', '', '', 'Y', '', 'Y', '', 'Y', '', 'Y'],
            ['#', '#', '#', '#', '#', '#', '#', '', '', '', '', '', '#', '#', '#', '#', '#', '#', '#'],
            ['#', '#', '#', '#', '#', '#', '#', '#', '', '', '', '#', '#', '#', '#', '#', '#', '#', '#'],
            ['#', '#', '#', '#', '#', '#', '#', '#', '#', '', '#', '#', '#', '#', '#', '#', '#', '#', '#']], 1, 3, 2);
        var expectedMove = [{ endMatch: { endMatchScores: [0, 0, 1] } },
            { set: { key: 'board', value: [['#', '#', '#', '#', '#', '#', '#', '#', '#', 'R', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
                        ['#', '#', '#', '#', '#', '#', '#', '#', 'R', '', 'R', '#', '#', '#', '#', '#', '#', '#', '#'],
                        ['#', '#', '#', '#', '#', '#', '#', 'R', '', 'R', '', '', '#', '#', '#', '#', '#', '#', '#'],
                        ['', '', '', '', '', '', '', '', '', '', 'R', '', 'R', '', '', '', '', '', ''],
                        ['#', '', '', '', '', '', '', '', '', 'R', '', 'R', '', '', '', '', '', '', '#'],
                        ['#', '#', '', '', '', '', '', '', '', '', 'R', '', '', '', '', '', '', '#', '#'],
                        ['#', '#', '#', 'G', '', '', '', '', '', '', '', '', '', '', '', 'Y', '#', '#', '#'],
                        ['#', '#', 'G', '', 'G', '', '', '', '', '', '', '', '', '', 'Y', '', 'Y', '#', '#'],
                        ['#', 'G', '', 'G', '', 'G', '', '', '', '', '', '', '', 'Y', '', 'Y', '', 'Y', '#'],
                        ['G', '', 'G', '', 'G', '', '', '', 'G', '', '', '', 'Y', '', 'Y', '', 'Y', '', 'Y'],
                        ['#', '#', '#', '#', '#', '#', '#', '', '', '', '', '', '#', '#', '#', '#', '#', '#', '#'],
                        ['#', '#', '#', '#', '#', '#', '#', '#', '', '', '', '#', '#', '#', '#', '#', '#', '#', '#'],
                        ['#', '#', '#', '#', '#', '#', '#', '#', '#', '', '#', '#', '#', '#', '#', '#', '#', '#', '#']] } },
            { set: { key: 'delta', value: { rowS: 7, colS: 12, rowE: 7, colE: 14, playerNo: 3 } } }];
        expect(angular.equals(move, expectedMove)).toBe(true);
    });
    it("R finds a winning move that will lead to winning in 2 steps", function () {
        var move = aiService.createComputerMove([['#', '#', '#', '#', '#', '#', '#', '#', '#', 'R', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
            ['#', '#', '#', '#', '#', '#', '#', '#', 'R', '', '', '#', '#', '#', '#', '#', '#', '#', '#'],
            ['#', '#', '#', '#', '#', '#', '#', 'R', '', 'R', '', 'R', '#', '#', '#', '#', '#', '#', '#'],
            ['', '', '', '', '', '', 'R', '', 'R', '', 'R', '', '', '', '', '', '', '', ''],
            ['#', '', '', '', '', '', '', '', '', '', '', 'R', '', '', '', '', '', '', '#'],
            ['#', '#', '', '', '', '', '', '', '', '', 'R', '', '', '', '', '', '', '#', '#'],
            ['#', '#', '#', 'G', '', '', '', '', '', '', '', '', '', '', '', '', '#', '#', '#'],
            ['#', '#', 'G', '', 'G', '', '', '', '', '', '', '', '', '', '', '', '', '#', '#'],
            ['#', 'G', '', '', '', 'G', '', 'G', '', '', '', '', '', '', '', '', '', '', '#'],
            ['G', '', 'G', '', 'G', '', '', '', 'G', '', '', '', '', '', '', '', '', '', ''],
            ['#', '#', '#', '#', '#', '#', '#', '', '', '', '', '', '#', '#', '#', '#', '#', '#', '#'],
            ['#', '#', '#', '#', '#', '#', '#', '#', '', '', '', '#', '#', '#', '#', '#', '#', '#', '#'],
            ['#', '#', '#', '#', '#', '#', '#', '#', '#', '', '#', '#', '#', '#', '#', '#', '#', '#', '#']], 2, 2, 0);
        expect(angular.equals(move[2].set.value, { rowS: 5, colS: 10, rowE: 1, colE: 10, playerNo: 2 })).toBe(true);
    });
    /*
      it("X finds a winning move that will lead to winning in 2 steps", function() {
        var move = aiService.createComputerMove(
            [['X', '', ''],
             ['O', 'X', ''],
             ['', '', 'O']], 0, {maxDepth: 3});
        expect(angular.equals(move[2].set.value, {row: 0, col: 1})).toBe(true);
      });
    
      it("O finds a winning move that will lead to winning in 2 steps", function() {
        var move = aiService.createComputerMove(
            [['', 'X', ''],
             ['X', 'X', 'O'],
             ['', 'O', '']], 1, {maxDepth: 3});
        expect(angular.equals(move[2].set.value, {row: 2, col: 2})).toBe(true);
      });
    
      it("O finds a cool winning move that will lead to winning in 2 steps", function() {
        var move = aiService.createComputerMove(
            [['X', 'O', 'X'],
             ['X', '', ''],
             ['O', '', '']], 1, {maxDepth: 3});
        expect(angular.equals(move[2].set.value, {row: 2, col: 1})).toBe(true);
      });
    
      it("O finds the wrong move due to small depth", function() {
        var move = aiService.createComputerMove(
            [['X', '', ''],
             ['', '', ''],
             ['', '', '']], 1, {maxDepth: 3});
        expect(angular.equals(move[2].set.value, {row: 0, col: 1})).toBe(true);
      });
    
      it("O finds the correct move when depth is big enough", function() {
        var move = aiService.createComputerMove(
            [['X', '', ''],
             ['', '', ''],
             ['', '', '']], 1, {maxDepth: 6});
        expect(angular.equals(move[2].set.value, {row: 1, col: 1})).toBe(true);
      });
    
      it("X finds a winning move that will lead to winning in 2 steps", function() {
        var move = aiService.createComputerMove(
            [['', '', ''],
             ['O', 'X', ''],
             ['', '', '']], 0, {maxDepth: 5});
        expect(angular.equals(move[2].set.value, {row: 0, col: 0})).toBe(true);
      });
    */
});
